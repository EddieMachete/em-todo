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
import { AddTodoUseCase } from '../../usecases';

describe('Add todo usecase', () => {
    // The promise polyfill works in the spec files but not inside the actual app files.
    // Double polyfill.
    window['Promise'] = Promise;

    // ------------------------------
    // --- CAN ADD A NEW TODO -------
    // ------------------------------
    it('can add a new todo', (done) => {
        // Arrange
        const statusCalled: string[] = [];
        let newTodo: Todo = null;

        // #region iDataStoreProvider
        const dataStoreProvider = jasmine.createSpyObj('iDataStoreProvider', ['logError', 'setStatusTo', 'addTodo']);

        dataStoreProvider.setStatusTo.and.callFake(
            (status: string) => {
                statusCalled.push(status);

                if (status === 'ready') {
                    runAsserts();
                }

                return Promise.resolve();
            });

        dataStoreProvider.addTodo.and.callFake((todo: Todo) => {
            newTodo = todo;
            return Promise.resolve();
        });

        // #endregion

        // #region iTodoProvider
        const todoProvider = jasmine.createSpyObj('iTodoProvider', ['addTodo']);
        todoProvider.addTodo.and.callFake((todo: Todo) => {
            return Promise.resolve(todo);
        });
        // #endregion

        const useCase: AddTodoUseCase = new AddTodoUseCase(dataStoreProvider, todoProvider);

        // Act
        useCase.execute('New todo');

        // Assert
        function runAsserts() {
            expect(statusCalled.length).toBe(2);
            expect(statusCalled[0]).toBe('adding-todo');
            expect(statusCalled[1]).toBe('ready');

            expect(newTodo.dateCreated).toBeTruthy();
            expect(newTodo.description).toBe('New todo');
            expect(newTodo.done).toBe(false);
            expect(newTodo.dueDate).toBeNull();
            expect(todoProvider.addTodo).toHaveBeenCalled();

            done();
        }
    });
});
