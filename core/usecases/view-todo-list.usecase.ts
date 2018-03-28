/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the MIT license found at https://github.com/EddieMachete/em-todo/blob/master/LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

import { iDataStoreProvider, iTodoProvider } from '../boundaries'
import { Todo } from '../domain';

/**
* 'ViewTodoListUseCase' contains the business logic to load and display a list of todo items.
* Steps:
* 1. The busy developer chooses to load and view his current todo list.
* 2. The system updates the application status to 'loading-todos-from-storage'.
* 3. The system requests from the todo provider all of the todo items the user has ever created.
* 4. The system updates the application status to 'applying-filters-to-todo-list'.
* 5. The system applies the filters and sorting rules last specified by the developer.
* 6. The system updates the application state with the curated todo list.
* 7. The system sets the application status to 'ready'.
*/

export class ViewTodoListUseCase {
    static get is() { return 'em-todo-core.ViewTodoListUseCase'; }

    /**
     * @param {iDataStoreProvider} dataStoreProvider
     * @param {iTodoProvider} todoProvider
     */
    public constructor(
        private dataStoreProvider:iDataStoreProvider,
        private todoProvider:iTodoProvider
    ) {}

    /**
     * Retrieves the todo items from storage and displays them using the specified filters and parameters.
     * @param {string} filter
     * @param {string} sortingMechanism
     * @param {boolean} sortAscending
     */
    // 1. The busy developer chooses to load and view his current todo list.
    public execute(filter:string, sortingMechanism:string, sortAscending:boolean):void {
        // 2. The system updates the application status to 'loading-todos-from-storage'.
        this.dataStoreProvider.setStatusTo('loading-todos-from-storage')
        .then(() =>
            // 3. The system requests from the todo provider all of the todo items the user has ever created.
            this.todoProvider.getTodoList()
        )
        .then((todos:Todo[]) => {
            // 4. The system updates the application status to 'applying-filters-to-todo-list'.
            this.dataStoreProvider.setStatusTo('applying-filters-to-todo-list');
            return todos;
        })
        .then((todos:Todo[]) => {
            // 5. The system applies the filters and sorting rules last specified by the developer.
            const sortedTodos:Todo[] = 
                ViewTodoListUseCase.filterAndSortTodoList(todos, filter, sortingMechanism, sortAscending);

            // 6. The system updates the application state with the curated todo list.
            return this.dataStoreProvider.updateTodoList(sortedTodos);
        })
        .catch(reason => {
            this.dataStoreProvider.logError(ViewTodoListUseCase.is + ' :: ' + reason);
        })
        // .finally(() => does not seem to be available yet
        .then(() =>
            // 7. The system sets the application status to 'ready'.
            this.dataStoreProvider.setStatusTo('ready')
        );
    }

    private static filterAndSortTodoList(todoList:Todo[], filter:string, sortingMechanism:string, sortAscending:boolean):Todo[] {
        // Apply the filter
        // For this example I'm not aming for efficiency.
        // We iterate through the entire list and
        //  remove pending items when the filter is set to 'done'
        //  remove done items when the filter is set to 'pending'
        //  let anything else pass
        const filteredList:Todo[] = todoList.filter((todo:Todo) => {
            if (filter === 'pending' && todo.done)
                return false;

            if (filter === 'done' && !todo.done)
                return false;
                
            return true;
        });

        return ViewTodoListUseCase.sortTodoListBy(filteredList, sortingMechanism, sortAscending);
    }

    private static sortTodoListBy(todoList:Todo[], mechanism:string, ascending:boolean):Todo[] {
        // We only sort for 'date-created' and 'due-created'
        // Very simple sorting, we do not do anything special for dates set to null
        switch(mechanism.toLowerCase()) {
            case 'date-created':
                return todoList.sort((a:Todo, b:Todo):number => {
                    const aIsLessThanB:number = a.dateCreated < b.dateCreated ? -1 : 1;
                    return ascending ? aIsLessThanB : -1 * aIsLessThanB;
                });
            case 'due-date':
                return todoList.sort((a:Todo, b:Todo):number => {
                    const aIsLessThanB:number = a.dueDate < b.dueDate ? -1 : 1;
                    return ascending ? aIsLessThanB : -1 * aIsLessThanB;
                });
            default:
                return todoList;
        }
    }
}