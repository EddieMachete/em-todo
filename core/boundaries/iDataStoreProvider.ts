/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the MIT license found at https://github.com/EddieMachete/em-todo/blob/master/LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

import { Todo } from '../domain';

export interface iDataStoreProvider {
    addTodo(todo:Todo):Promise<void>
    getStore():Promise<any>;
    logError(message:string):Promise<void>
    setStatusTo(status:string):Promise<void>
    updateTodo(todo:Todo):Promise<void>
    updateTodoList(todos:Todo[], filter:string, sortingMechanism:string, sortAscending:boolean):Promise<void>
}