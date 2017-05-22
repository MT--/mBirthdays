import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { User } from '../models/user';


@Injectable()
export class ProfileActions {

  public static UPDATE_USER: string = 'UPDATE_USER';
  public static UPDATE_USER_SUCCESS: string = 'UPDATE_USER_SUCCESS';
  public static LOAD_USER_SUCCESS: string = 'LOAD_USER_SUCCESS';

  public static updateUser(user: User): Action {
    return {
      type: ProfileActions.UPDATE_USER,
      payload: user
    }
  }

  public static updateUserSuccess(user: User): Action {
    return {
      type: ProfileActions.UPDATE_USER_SUCCESS,
      payload: user
    }
  }

  public static loadUserSuccess(user: User): Action {
    return {
      type: ProfileActions.LOAD_USER_SUCCESS,
      payload: user
    }
  }

}
