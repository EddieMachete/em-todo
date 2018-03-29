/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the MIT license found at https://github.com/EddieMachete/em-todo/blob/master/LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

import { Todo } from '../domain';

export interface iTodoProvider {
    addTodo(todo:Todo):Promise<Todo>
    getTodoList():Promise<Todo[]>
    updateTodo(todo:Todo):Promise<Todo>
}