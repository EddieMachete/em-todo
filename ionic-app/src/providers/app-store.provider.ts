/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the license found at LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

import { Injectable } from '@angular/core';
import { IDataStoreProvider } from 'em-todo-core/boundaries';
import { Todo } from 'em-todo-core/domain';
import { Store } from '@ngrx/store';
import { UIStateActions } from '../store/actions';
import { AppStore } from '../store/app-store';

@Injectable()
export class AppStoreProvider implements IDataStoreProvider {
    constructor(
        private appStore: Store<AppStore>,
        private uiStateActions: UIStateActions
    ) {}

    public addTodo(todo:Todo):Promise<void> {
        this.appStore.dispatch(this.uiStateActions.addTodo(todo));
        return Promise.resolve();
    }

    public getStore():Promise<any> {
        return Promise.resolve(this.appStore);
    }

    public logError(message:string):Promise<void> {
        console.log(message);
        this.appStore.dispatch(this.uiStateActions.logError(message));
        return Promise.resolve();
    }

    public setStatusTo(status:string):Promise<void> {
        return Promise.resolve();
    }

    public updateTodo(todo:Todo):Promise<void> {
        return Promise.resolve();
    }
    
    public updateTodoList(todos:Todo[], filter:string, sortingMechanism:string, sortAscending:boolean):Promise<void> {
        this.appStore.dispatch(this.uiStateActions.setTodos(todos, filter, sortingMechanism, sortAscending));
        return Promise.resolve();
    }
}