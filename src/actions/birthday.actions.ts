import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Birthday } from '../models/birthday';


@Injectable()
export class BirthdayActions {

  public static ADD_BIRTHDAY: string = 'ADD_BIRTHDAY';
  public static UPDATE_BIRTHDAY: string = 'UPDATE_BIRTHDAY';
  public static DELETE_BIRTHDAY: string = 'DELETE_BIRTHDAY';
  public static LOAD_BIRTHDAYS_SUCCESS: string = 'LOAD_BIRTHDAYS_SUCCESS';
  public static ADD_UPDATE_BIRTHDAY_SUCCESS: string = 'ADD_UPDATE_BIRTHDAY_SUCCESS';
  public static DELETE_BIRTHDAY_SUCCESS: string = 'DELETE_BIRTHDAY_SUCCESS';

  public static addBirthday(birthday: Birthday): Action {
    return {
      type: BirthdayActions.ADD_BIRTHDAY,
      payload: birthday
    }
  }

  public static updateBirthday(birthday: Birthday): Action {
    return {
      type: BirthdayActions.UPDATE_BIRTHDAY,
      payload: birthday
    }
  }

  public static deleteBirthday(birthdayId: string): Action {
    return {
      type: BirthdayActions.DELETE_BIRTHDAY,
      payload: birthdayId
    }
  }

  public static loadBirthdaysSuccess(birthday: Birthday): Action {
    return {
      type: BirthdayActions.LOAD_BIRTHDAYS_SUCCESS,
      payload: birthday
    }
  }

  public static addUpdateBirthdaySuccess(birthday: Birthday): Action {
    return {
      type: BirthdayActions.ADD_UPDATE_BIRTHDAY_SUCCESS,
      payload: birthday
    }
  }

  public static deleteBirthdaySuccess(birthday: Birthday): Action {
    return {
      type: BirthdayActions.DELETE_BIRTHDAY_SUCCESS,
      payload: birthday
    }
  }
}
