import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { ProfileActions } from '../actions/profile.actions';
import { ProfileService } from '../services/profile.service';


@Injectable()
export class ProfileEffects {
  private currentUser$: Observable<any>;
  private changedUser$: Observable<any>;

  constructor(
    public actions$: Actions,
    public profileSvc: ProfileService
  ) {
    this.currentUser$ = this.profileSvc.getAll()
      .map(users => ProfileActions.loadUserSuccess(users[ users.length - 1 ]));

    this.changedUser$ = this.profileSvc.getChanges()
      .map(user => ProfileActions.updateUserSuccess(user));
  }

  @Effect() updateUser$(): Observable<Action> {
    return this.actions$
      .ofType(ProfileActions.UPDATE_USER)
      .map(toPayload)
      .mergeMap(user => this.profileSvc.updateUser(user));
  }

  @Effect() getUser$(): Observable<any> {
    return Observable.concat(
      this.currentUser$,
      this.changedUser$
    );
  }

}
