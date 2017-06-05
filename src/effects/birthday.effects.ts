import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from "@ngrx/store";
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { BirthdayActions } from '../actions/birthday.actions';
import { BirthdayService } from '../services/birthday.service';


@Injectable()
export class BirthdayEffects {
  private allBirthdays$: Observable<any>;
  private changedBirthdays$: Observable<any>;

  constructor(
    public actions$: Actions,
    public birthdaySvc: BirthdayService
  ) {
    this.allBirthdays$ = this.birthdaySvc.getAll()
      .map(birthdays => BirthdayActions.loadBirthdaysSuccess(birthdays));

    this.changedBirthdays$ = this.birthdaySvc.getChanges()
      .map(change => {
        if ( change._deleted ) {
          return BirthdayActions.deleteBirthdaySuccess(change._id);
        } else {
          return BirthdayActions.addUpdateBirthdaySuccess(change)
        } // end if
      });
  }

  @Effect() addBirthday$(): Observable<Action> {
    return this.actions$
      .ofType(BirthdayActions.ADD_BIRTHDAY)
      .map((action: Action) => toPayload(action))
      .mergeMap(birthday => this.birthdaySvc.add(birthday));
  }

  @Effect() updateBirthday$(): Observable<Action> {
    return this.actions$
      .ofType(BirthdayActions.UPDATE_BIRTHDAY)
      .map((action: Action) => toPayload(action))
      .mergeMap(birthday => this.birthdaySvc.update(birthday));
  }

  @Effect() deleteBirthday$(): Observable<Action> {
    return this.actions$
      .ofType(BirthdayActions.DELETE_BIRTHDAY)
      .map((action: Action) => toPayload(action))
      .mergeMap(birthday => this.birthdaySvc.delete(birthday));
  }

  @Effect() getBirthdays$(): Observable<any> {
      return Observable.concat(
        this.allBirthdays$,
        this.changedBirthdays$
      );
  }

}
