/*
@license
Copyright (c) 2018 Eduardo Echeverria. All rights reserved.
This code may only be used under the license found at LICENSE
Author: Eduardo Echeverria @eddiemachete
*/

'use strict';

import { ActionWithPayload } from '../actions';

import { UIStateActions } from '../actions/ui-state.actions';
import { iTodosStateModel } from '../app-store';

export const lastErrorMessage = (state:string = null, action:ActionWithPayload<string>):string => {
  switch (action.type) {
    case UIStateActions.LAST_ERROR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export const todos =
(state:iTodosStateModel = {todos:[], filter:'all', sortingMechanism:'date-created', sortAscending: true}, action:ActionWithPayload<any>):iTodosStateModel => {
  switch (action.type) {
    case UIStateActions.ADD_TODO:
      return Object.assign(
        {},
        {
          filter: '',
          sortingMechanism: 'date-created',
          sortAscending: true,
          todos: [].concat(action.payload, state.todos)
        }
      );
    case UIStateActions.SET_TODOS:
      return Object.assign(
        {},
        {
          todos: action.payload.todos,
          sortAscending: action.payload.sortAscending,
          sortingMechanism: action.payload.sortingMechanism,
          filter: action.payload.filter
        });
    //case UIStateActions.UPDATE_RECEIPT:
   //     return updateTicketsState(state, action.payload);
    default:
      return state;
  }
}

export const status = (state:string = null, action:ActionWithPayload<string>):string => {
  switch (action.type) {
    case UIStateActions.STATUS:
      return action.payload;
    default:
      return state;
  }
};