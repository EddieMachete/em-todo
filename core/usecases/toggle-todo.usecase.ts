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
 * 'ToggleTodoUseCase' contains the business logic to load and display a list of todo items.
 * Steps:
 * 1. Our busy developer selects a todo be toggled.
 * 2. The system sets the application status to 'toggling-todo'.
 * 3. The system switches the todo's `done` flag.
 * 4. The system persists the change to the data storage.
 * 5. The system updates the application state.
 * 6. The system sets the application status to 'ready'.
 */

export class ToggleTodoUseCase {
    static get is() { return 'em-todo-core.ToggleTodoUseCase'; }

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
     * @param {Todo} todo
     */
    // 1. Our busy developer selects a todo be toggled.
    public execute(todo: Todo): void {
        // 2. The system sets the application status to 'toggling-todo'.
        this.dataStoreProvider.setStatusTo('toggling-todo')
        .then(() => {
            // 3. The system switches the todo's `done` flag.
            todo.done = !todo.done;

            // 4. The system persists the change to the data storage.
            return this.todoProvider.updateTodo(todo);
        })
        .then((t: Todo) =>
            // 5. The system updates the application state.)
            this.dataStoreProvider.updateTodo(t)
        )
        .catch((reason) => {
            this.dataStoreProvider.logError(ToggleTodoUseCase.is + ' :: ' + reason);
        })
        // .finally(() => does not seem to be available yet
        .then(() =>
            // 6. The system sets the application status to 'ready'.
            this.dataStoreProvider.setStatusTo('ready')
        );
    }
}