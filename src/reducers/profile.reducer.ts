import { Action, ActionReducer } from '@ngrx/store';

import { User } from '../models/user';
import { ProfileActions } from '../actions/profile.actions';

export const ProfileReducer: ActionReducer<User> = (
  state: User = {},
  action: Action
) => {
  switch ( action.type ) {
    case ProfileActions.LOAD_USER_SUCCESS:
      return action.payload;

    case ProfileActions.UPDATE_USER_SUCCESS:
      return action.payload;

    default:
      return state;
  } // end switch
};
