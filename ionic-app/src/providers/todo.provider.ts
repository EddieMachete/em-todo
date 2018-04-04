/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the license found at LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { iTodoProvider } from 'em-todo-core/boundaries';
import { Todo } from 'em-todo-core/domain';

@Injectable()
export class TodoProvider implements iTodoProvider {
    static get is() {
        return 'em-todo-ionic-app.TodoProvider';
    }

    //private http:iHttp;
    private todoList:Todo[];
    
    public constructor(private http:Http) {
        this.todoList = [
            // Object.assign(
            //     new Todo(),
            //     {
            //         "dateCreated": Date.now,
            //         "description": "Sample todo",
            //         "done": false,
            //         "dueDate": null
            //     }
            // )
        ];
    }

    public addTodo(todo:Todo):Promise<Todo> {
        return Promise.resolve(todo);
    }

    public getTodoList():Promise<Todo[]> {
        return Promise.resolve(this.todoList.splice(0));
    }

    updateTodo(todo:Todo):Promise<Todo> {
        return Promise.resolve(todo);
    }
}