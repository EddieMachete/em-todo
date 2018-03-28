/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the MIT license found at https://github.com/EddieMachete/em-todo/blob/master/LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

///<reference path="../../../node_modules/@types/jasmine/index.d.ts"/>

'use strict';

import { iDataStoreProvider, iTodoProvider } from '../../boundaries';
import { ViewTodoListUseCase } from '../../usecases';
import { Todo } from '../../domain';
import { Promise } from 'es6-promise'; // Polyfill promise as PhantomJS is still missing it [2017-06-14]

describe('View todo list usecase', function () {
    // The promise polyfill works in the spec files but not inside the actual app files.
    // Double polyfill.
    window['Promise'] = Promise;

    let todoCache:Todo[];

    beforeEach(() => {
        todoCache = [
            Object.assign(new Todo(), {
                "dateCreated": new Date(2017, 11, 5),
                "description": "Add complications web component :: AD",
                "done": true,
                "dueDate": new Date(2017, 11, 12)
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 1, 6),
                "description": "Retrieve lost data :: CQ",
                "done": false,
                "dueDate": new Date(2018, 2, 18)
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 1, 6),
                "description": "Write release materials :: AD",
                "done": true,
                "dueDate": new Date(2018, 1, 6)
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 1, 14),
                "description": "Change title in common causes :: AD",
                "done": false,
                "dueDate": null
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 2, 3),
                "description": "Register app with US government because of HTTPS :: AD",
                "done": false,
                "dueDate": null
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 2, 1),
                "description": "Update Poster :: ISNCSCI",
                "done": false,
                "dueDate": null
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 2, 6),
                "description": "Create new build :: AD",
                "done": false,
                "dueDate": null
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 2, 2),
                "description": "Satisfaction survey :: AD",
                "done": false,
                "dueDate": null
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 2, 5),
                "description": "Create font size requirements :: AD",
                "done": false,
                "dueDate": new Date(2018, 2, 6)
            }),
            Object.assign(new Todo(), {
                "dateCreated": new Date(2018, 2, 19),
                "description": "Enroll with Apple Developer Program",
                "done": false,
                "dueDate": null
            })
        ];
    });
    
    // -------------------------------------------------------------------------------------
    // --- CAN RETRIEVE AND PRESENT PENDING TODOS SORTED BY DATE CREATED, DESCENDING -------
    // -------------------------------------------------------------------------------------
    it('can retrieve and present pending todos sorted by date created, descending', function (done) {
        // Arrange
        const statusCalled:string[] = [];
        let todos:Todo[];

        // #region iDataStoreProvider
        const dataStoreProvider = jasmine.createSpyObj('iDataStoreProvider', ['logError', 'setStatusTo', 'updateTodoList']);
        
        dataStoreProvider.setStatusTo.and.callFake(
            (status:string) => {
                statusCalled.push(status);
                
                if (status === 'ready')
                    runAsserts();
                
                return Promise.resolve();
            });
        
        dataStoreProvider.updateTodoList.and.callFake((ts:Todo[]) => {
            todos = ts;
            return Promise.resolve();
        });

        // #endregion

        // #region iTodoProvider
        const todoProvider = jasmine.createSpyObj('iTodoProvider', ['getTodoList']);
        todoProvider.getTodoList.and.returnValue(Promise.resolve(todoCache));
        // #endregion

        const useCase:ViewTodoListUseCase = new ViewTodoListUseCase(dataStoreProvider, todoProvider);

        // Act
        useCase.execute('pending', 'date-created', false);
        
        // Assert
        function runAsserts() {
            expect(statusCalled.length).toBe(3);
            expect(statusCalled[0]).toBe('loading-todos-from-storage');
            expect(statusCalled[1]).toBe('applying-filters-to-todo-list');
            expect(statusCalled[2]).toBe('ready');

            expect(todos.length).toBe(8);
            expect(todos[0].description).toBe('Enroll with Apple Developer Program');
            expect(todos[1].description).toBe('Create new build :: AD');
            expect(todos[2].description).toBe('Create font size requirements :: AD');
            expect(todos[3].description).toBe('Register app with US government because of HTTPS :: AD');
            expect(todos[4].description).toBe('Satisfaction survey :: AD');
            expect(todos[5].description).toBe('Update Poster :: ISNCSCI');
            expect(todos[6].description).toBe('Change title in common causes :: AD');
            expect(todos[7].description).toBe('Retrieve lost data :: CQ');

            done();
        }
    });
    
    // -------------------------------------------------------------------------------------
    // --- CAN RETRIEVE AND PRESENT PENDING TODOS SORTED BY DATE CREATED, ASCENDING --------
    // -------------------------------------------------------------------------------------
    it('can retrieve and present pending todos sorted by date created, ascending', function (done) {
        // Arrange
        const statusCalled:string[] = [];
        let todos:Todo[];

        // #region iDataStoreProvider
        const dataStoreProvider = jasmine.createSpyObj('iDataStoreProvider', ['logError', 'setStatusTo', 'updateTodoList']);
        
        dataStoreProvider.setStatusTo.and.callFake(
            (status:string) => {
                statusCalled.push(status);
                
                if (status === 'ready')
                    runAsserts();
                
                return Promise.resolve();
            });
        
        dataStoreProvider.updateTodoList.and.callFake((ts:Todo[]) => {
            todos = ts;
            return Promise.resolve();
        });

        // #endregion

        // #region iTodoProvider
        const todoProvider = jasmine.createSpyObj('iTodoProvider', ['getTodoList']);
        todoProvider.getTodoList.and.returnValue(Promise.resolve(todoCache));
        // #endregion

        const useCase:ViewTodoListUseCase = new ViewTodoListUseCase(dataStoreProvider, todoProvider);

        // Act
        useCase.execute('pending', 'date-created', true);
        
        // Assert
        function runAsserts() {
            expect(statusCalled.length).toBe(3);
            expect(statusCalled[0]).toBe('loading-todos-from-storage');
            expect(statusCalled[1]).toBe('applying-filters-to-todo-list');
            expect(statusCalled[2]).toBe('ready');

            expect(todos.length).toBe(8);
            expect(todos[0].description).toBe('Retrieve lost data :: CQ');
            expect(todos[1].description).toBe('Change title in common causes :: AD');
            expect(todos[2].description).toBe('Update Poster :: ISNCSCI');
            expect(todos[3].description).toBe('Satisfaction survey :: AD');
            expect(todos[4].description).toBe('Register app with US government because of HTTPS :: AD');
            expect(todos[5].description).toBe('Create font size requirements :: AD');
            expect(todos[6].description).toBe('Create new build :: AD');
            expect(todos[7].description).toBe('Enroll with Apple Developer Program');

            done();
        }
    });
    
    // -------------------------------------------------------------------------------------
    // --- CAN RETRIEVE AND PRESENT TODOS DONE SORTED BY DATE CREATED, DESCENDING ----------
    // -------------------------------------------------------------------------------------
    it('can retrieve and present todos done sorted by date created, descending', function (done) {
        // Arrange
        const statusCalled:string[] = [];
        let todos:Todo[];

        // #region iDataStoreProvider
        const dataStoreProvider = jasmine.createSpyObj('iDataStoreProvider', ['logError', 'setStatusTo', 'updateTodoList']);
        
        dataStoreProvider.setStatusTo.and.callFake(
            (status:string) => {
                statusCalled.push(status);
                
                if (status === 'ready')
                    runAsserts();
                
                return Promise.resolve();
            });
        
        dataStoreProvider.updateTodoList.and.callFake((ts:Todo[]) => {
            todos = ts;
            return Promise.resolve();
        });

        // #endregion

        // #region iTodoProvider
        const todoProvider = jasmine.createSpyObj('iTodoProvider', ['getTodoList']);
        todoProvider.getTodoList.and.returnValue(Promise.resolve(todoCache));
        // #endregion

        const useCase:ViewTodoListUseCase = new ViewTodoListUseCase(dataStoreProvider, todoProvider);

        // Act
        useCase.execute('done', 'date-created', false);
        
        // Assert
        function runAsserts() {
            expect(statusCalled.length).toBe(3);
            expect(statusCalled[0]).toBe('loading-todos-from-storage');
            expect(statusCalled[1]).toBe('applying-filters-to-todo-list');
            expect(statusCalled[2]).toBe('ready');

            expect(todos.length).toBe(2);
            expect(todos[0].description).toBe('Write release materials :: AD');
            expect(todos[1].description).toBe('Add complications web component :: AD');

            done();
        }
    });
    
    // -------------------------------------------------------------------------------------
    // --- CAN RETRIEVE AND PRESENT TODOS DONE SORTED BY DATE CREATED, ASCENDING -----------
    // -------------------------------------------------------------------------------------
    it('can retrieve and present todos done sorted by date created, ascending', function (done) {
        // Arrange
        const statusCalled:string[] = [];
        let todos:Todo[];

        // #region iDataStoreProvider
        const dataStoreProvider = jasmine.createSpyObj('iDataStoreProvider', ['logError', 'setStatusTo', 'updateTodoList']);
        
        dataStoreProvider.setStatusTo.and.callFake(
            (status:string) => {
                statusCalled.push(status);
                
                if (status === 'ready')
                    runAsserts();
                
                return Promise.resolve();
            });
        
        dataStoreProvider.updateTodoList.and.callFake((ts:Todo[]) => {
            todos = ts;
            return Promise.resolve();
        });

        // #endregion

        // #region iTodoProvider
        const todoProvider = jasmine.createSpyObj('iTodoProvider', ['getTodoList']);
        todoProvider.getTodoList.and.returnValue(Promise.resolve(todoCache));
        // #endregion

        const useCase:ViewTodoListUseCase = new ViewTodoListUseCase(dataStoreProvider, todoProvider);

        // Act
        useCase.execute('done', 'date-created', true);
        
        // Assert
        function runAsserts() {
            expect(statusCalled.length).toBe(3);
            expect(statusCalled[0]).toBe('loading-todos-from-storage');
            expect(statusCalled[1]).toBe('applying-filters-to-todo-list');
            expect(statusCalled[2]).toBe('ready');

            expect(todos.length).toBe(2);
            expect(todos[0].description).toBe('Add complications web component :: AD');
            expect(todos[1].description).toBe('Write release materials :: AD');

            done();
        }
    });
    
    // ---------------------------------------------------------------------------------
    // --- CAN RETRIEVE AND PRESENT PENDING TODOS SORTED BY DUE DATE, DESCENDING -------
    // ---------------------------------------------------------------------------------
    it('can retrieve and present pending todos sorted by due date, descending', function (done) {
        // Arrange
        const statusCalled:string[] = [];
        let todos:Todo[];

        // #region iDataStoreProvider
        const dataStoreProvider = jasmine.createSpyObj('iDataStoreProvider', ['logError', 'setStatusTo', 'updateTodoList']);
        
        dataStoreProvider.setStatusTo.and.callFake(
            (status:string) => {
                statusCalled.push(status);
                
                if (status === 'ready')
                    runAsserts();
                
                return Promise.resolve();
            });
        
        dataStoreProvider.updateTodoList.and.callFake((ts:Todo[]) => {
            todos = ts;
            return Promise.resolve();
        });

        // #endregion

        // #region iTodoProvider
        const todoProvider = jasmine.createSpyObj('iTodoProvider', ['getTodoList']);
        todoProvider.getTodoList.and.returnValue(Promise.resolve(todoCache));
        // #endregion

        const useCase:ViewTodoListUseCase = new ViewTodoListUseCase(dataStoreProvider, todoProvider);

        // Act
        useCase.execute('pending', 'due-date', false);
        
        // Assert
        function runAsserts() {
            expect(statusCalled.length).toBe(3);
            expect(statusCalled[0]).toBe('loading-todos-from-storage');
            expect(statusCalled[1]).toBe('applying-filters-to-todo-list');
            expect(statusCalled[2]).toBe('ready');

            expect(todos.length).toBe(8);
            expect(todos[0].description).toBe('Retrieve lost data :: CQ');
            expect(todos[1].description).toBe('Create font size requirements :: AD');

            done();
        }
    });
    
    // ---------------------------------------------------------------------------------
    // --- CAN RETRIEVE AND PRESENT PENDING TODOS SORTED BY DUE DATE, ASCENDING --------
    // ---------------------------------------------------------------------------------
    it('can retrieve and present pending todos sorted by due date, ascending', function (done) {
        // Arrange
        const statusCalled:string[] = [];
        let todos:Todo[];

        // #region iDataStoreProvider
        const dataStoreProvider = jasmine.createSpyObj('iDataStoreProvider', ['logError', 'setStatusTo', 'updateTodoList']);
        
        dataStoreProvider.setStatusTo.and.callFake(
            (status:string) => {
                statusCalled.push(status);
                
                if (status === 'ready')
                    runAsserts();
                
                return Promise.resolve();
            });
        
        dataStoreProvider.updateTodoList.and.callFake((ts:Todo[]) => {
            todos = ts;
            return Promise.resolve();
        });

        // #endregion

        // #region iTodoProvider
        const todoProvider = jasmine.createSpyObj('iTodoProvider', ['getTodoList']);
        todoProvider.getTodoList.and.returnValue(Promise.resolve(todoCache));
        // #endregion

        const useCase:ViewTodoListUseCase = new ViewTodoListUseCase(dataStoreProvider, todoProvider);

        // Act
        useCase.execute('pending', 'due-date', true);
        
        // Assert
        function runAsserts() {
            expect(statusCalled.length).toBe(3);
            expect(statusCalled[0]).toBe('loading-todos-from-storage');
            expect(statusCalled[1]).toBe('applying-filters-to-todo-list');
            expect(statusCalled[2]).toBe('ready');

            expect(todos.length).toBe(8);
            expect(todos[6].description).toBe('Create font size requirements :: AD');
            expect(todos[7].description).toBe('Retrieve lost data :: CQ');

            done();
        }
    });
});