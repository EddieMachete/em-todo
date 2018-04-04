/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the MIT license found at https://github.com/EddieMachete/em-todo/blob/master/LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

import { IDataStoreProvider, ITodoProvider } from '../boundaries';
import { Todo } from '../domain';

/**
 * 'AddTodoUsecase' contains the business logic to load and display a list of todo items.
 * Steps:
 * 1. Our busy developer provides a description and initiates the process of creating a new todo with it.
 * 2. The system sets the application status to 'adding-todo'.
 * 3. The system creates a new todo:
 *    {"dateCreated":Date.now,"description":description,"done":false,"dueDate":null}
 * 4. The system adds the new todo to the data storage.
 * 5. The system updates the application state.
 * 6. The system sets the application status to 'ready'.
 */

export class AddTodoUseCase {
    static get is() { return 'em-todo-core.AddTodoUsecase'; }

    /**
     * @param {IDataStoreProvider} dataStoreProvider
     * @param {ITodoProvider} todoProvider
     */
    public constructor(
        private dataStoreProvider: IDataStoreProvider,
        private todoProvider: ITodoProvider
    ) {}

    /**
     * Executes the logic to add and display a new todo.
     * @param {string} description
     */
    // 1. Our busy developer provides a description and initiates the process of creating a new todo with it.
    public execute(description: string): void {
        // 2. The system sets the application status to 'adding-todo'.
        this.dataStoreProvider.setStatusTo('adding-todo')
        .then(() =>
            // 3. The system creates a new todo:
            //    {"dateCreated":Date.now,"description":description,"done":false,"dueDate":null}
            Object.assign(
                new Todo(),
                {
                    dateCreated: Date.now,
                    description,
                    done: false,
                    dueDate: null
                }
            )
        )
        .then((todo) =>
            // 4. The system adds the new todo to the data storage.
            this.todoProvider.addTodo(todo)
        )
        .then((todo: Todo) => {
            // 5. The system updates the application state.
            this.dataStoreProvider.addTodo(todo);
        })
        .catch((reason) => {
            this.dataStoreProvider.logError(AddTodoUseCase.is + ' :: ' + reason);
        })
        // .finally(() => does not seem to be available yet
        .then(() =>
            // 6. The system sets the application status to 'ready'.
            this.dataStoreProvider.setStatusTo('ready')
        );
    }
}
