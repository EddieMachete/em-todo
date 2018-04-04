/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the license found at LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';


import * as Reducers from './reducers';

import { ActionReducerMap } from '@ngrx/store';
import { Todo } from 'em-todo-core/domain';

export interface iTodosStateModel {
  todos:Todo[];
  filter:string;
  sortingMechanism:string;
  sortAscending:boolean;
}

export interface AppStore {
    lastErrorMessage: string,
    todos:iTodosStateModel,
    status:string
}

export const reducers: ActionReducerMap<AppStore> = {
  lastErrorMessage: Reducers.lastErrorMessage,
  todos: Reducers.todos,
  status: Reducers.status
};