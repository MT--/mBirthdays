import { Component } from '@angular/core';
import { ActionSheetController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../../services/app-state.service';
import { ProfileActions } from '../../actions/profile.actions';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.page.html',
})
export class ProfilePage {
  public currentUser: User;
  private currentUser$: Observable<User>;

  // TODO: use FormBuilder
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public authSvc: AuthService,
    public store: Store<AppState>,
    public viewCtrl: ViewController
  ) {
    // TODO: don't init to empty User
    this.currentUser = <User>{
      name: '',
      email: '',
      phone: '',
      notify: false,
      displayBirthYear: false
    };
    this.currentUser$ = this.store.select(state => state.currentUser);
    this.currentUser$.filter(user => !!user)
      .subscribe(user => this.currentUser = user);
  }

  public authLogin(): void {
    this.authSvc.login();
  }

  public saveProfile(): void {
    this.store.dispatch(ProfileActions.updateUser(this.currentUser));
    this.viewCtrl.dismiss();
  }

  /**
   * show options for avatar
   *
   */
  public confirmEditAvatar(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'EDIT AVATAR',
      buttons: [
        {
          text: 'Take Picture',
          handler: () => this.takePicture()
        },
        {
          text: 'Choose Picture',
          handler: () => this.choosePicture()
        },
        {
          text: 'Remove Current Picture',
          role: 'destructive',
          handler: () => this.removePicture()
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * use camera to take new picture
   *
   */
  private takePicture(): void {
    console.log('take picture');
  }

  /**
   * choose picture from media lib
   *
   */
  private choosePicture(): void {
    console.log('choose picture');
  }

  /**
   * reset to default photo
   *
   */
  private removePicture(): void {
    console.log('remove picture');
  }
}
