/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the license found at LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

import { Injectable } from '@angular/core';
import { ActionWithPayload } from './';
import { Todo } from 'em-todo-core/domain';
import { iTodosStateModel } from '../app-store';

@Injectable()
export class UIStateActions {

    static ADD_TODO = 'UI_STATE_ADD_TODO';
    addTodo(todo?:Todo):ActionWithPayload<Todo> {
        return {
            type:UIStateActions.ADD_TODO,
            payload: todo
        };
    }

    static LAST_ERROR_MESSAGE = 'UI_STATE_LAST_ERROR_MESSAGE';
    logError(message?:string):ActionWithPayload<string> {
        return {
            type: UIStateActions.LAST_ERROR_MESSAGE,
            payload: message
        }
    }

    static SET_TODOS = 'UI_STATE_SET_TODOS';
    setTodos(todos:Todo[], filter:string, sortingMechanism:string, sortAscending:boolean):ActionWithPayload<iTodosStateModel> {
        return {
          type: UIStateActions.SET_TODOS,
          payload: {
            todos:todos,
            filter:filter,
            sortingMechanism:sortingMechanism,
            sortAscending:sortAscending
          }
        }
    }

    static STATUS = 'UI_STATE_STATUS';
    updateStatus(status?:string):ActionWithPayload<string> {
        return {
            type: UIStateActions.STATUS,
            payload: status
        }
    }
}