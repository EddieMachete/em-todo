/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the MIT license found at https://github.com/EddieMachete/em-todo/blob/master/LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

export class Todo {
    public static get is(): string {
        return 'em-todo-core-domain.Todo';
    }

    public dateCreated: Date;
    public description: string;
    public done: boolean = false;
    public dueDate: Date;
}
