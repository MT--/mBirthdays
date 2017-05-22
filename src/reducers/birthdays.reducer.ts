import { Action, ActionReducer } from '@ngrx/store';

import { Birthday } from '../models/birthday';

import { BirthdayActions } from '../actions/birthday.actions'


export const BirthdaysReducer: ActionReducer<Birthday[]> = (
  state: Birthday[] = [],
  action: Action
) => {
  switch ( action.type ) {
    case BirthdayActions.LOAD_BIRTHDAYS_SUCCESS:
      return action.payload;

    case BirthdayActions.ADD_UPDATE_BIRTHDAY_SUCCESS:
      if ( state.find(birthday => birthday._id === action.payload._id) ) {
        // update
        return state.map(birthday => {
          return birthday._id === action.payload._id
            ? Object.assign({}, birthday, action.payload)
            : birthday;
        });
      } else {
        // add
        return [ ...state, Object.assign({}, action.payload) ];
      } // end if

    case BirthdayActions.DELETE_BIRTHDAY_SUCCESS:
      return state.filter(birthday => birthday._id !== action.payload);

    default:
      return state;
  } // end switch
};
