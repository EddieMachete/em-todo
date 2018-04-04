/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the MIT license found at https://github.com/EddieMachete/em-todo/blob/master/LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

///<reference path="../../../node_modules/@types/jasmine/index.d.ts"/>

'use strict';

import { Promise } from 'es6-promise'; // Polyfill promise as PhantomJS is still missing it [2017-06-14]
import { IDataStoreProvider, ITodoProvider } from '../../boundaries';
import { Todo } from '../../domain';
import { ToggleTodoUseCase } from '../../usecases';

describe('View todo list usecase', () => {
    // The promise polyfill works in the spec files but not inside the actual app files.
    // Double polyfill.
    window['Promise'] = Promise;

    // --------------------------------------------------
    // --- CAN TOGGLE A TODO FROM PENDING TO DONE -------
    // --------------------------------------------------
    it('can toggle a todo from pending to done', (done): void => {
        // Arrange
        const statusCalled: string[] = [];
        let updatedTodo: Todo = null;
        const todoToBeToggled: Todo = Object.assign(new Todo(), {
            dateCreated: new Date(2017, 11, 5),
            description: 'Add complications web component :: AD',
            done: false,
            dueDate: new Date(2017, 11, 12)
        });

        // #region iDataStoreProvider
        const dataStoreProvider = jasmine.createSpyObj('iDataStoreProvider', ['logError', 'setStatusTo', 'updateTodo']);

        dataStoreProvider.setStatusTo.and.callFake(
            (status: string) => {
                statusCalled.push(status);

                if (status === 'ready') {
                    runAsserts();
                }

                return Promise.resolve();
            });

        dataStoreProvider.updateTodo.and.callFake((todo: Todo): Promise<void> => {
            updatedTodo = todo;
            return Promise.resolve();
        });

        // #endregion

        // #region iTodoProvider
        const todoProvider = jasmine.createSpyObj('iTodoProvider', ['updateTodo']);
        todoProvider.updateTodo.and.callFake((todo: Todo) => {
            return Promise.resolve(todo);
        });
        // #endregion

        const useCase: ToggleTodoUseCase = new ToggleTodoUseCase(dataStoreProvider, todoProvider);

        // Act
        useCase.execute(todoToBeToggled);

        // Assert
        function runAsserts() {
            expect(statusCalled.length).toBe(2);
            expect(statusCalled[0]).toBe('toggling-todo');
            expect(statusCalled[1]).toBe('ready');

            expect(updatedTodo.description).toBe('Add complications web component :: AD');
            expect(updatedTodo.done).toBe(true);
            expect(todoProvider.updateTodo).toHaveBeenCalled();

            done();
        }
    });
});
