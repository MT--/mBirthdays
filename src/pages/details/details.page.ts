import { Component } from '@angular/core';
import { AlertController, NavParams, ViewController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { AppState } from '../../services/app-state.service';
import { BirthdayActions } from '../../actions/birthday.actions';


@Component({
  selector: 'page-details',
  templateUrl: 'details.page.html',
})
export class DetailsPage {
  public birthday: any = {};
  public isNewBirthday: boolean = true;
  public action: string = 'Add';
  public isoDate: string = '';

  constructor(
    public alertCtrl: AlertController,
    public store: Store<AppState>,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {}

  ionViewWillEnter(): void {
    let editBirthday = this.navParams.get('birthday');
    if ( editBirthday ) {
      this.birthday = editBirthday;
      this.isNewBirthday = false;
      this.action = 'Edit';
      this.isoDate = this.birthday.date.toISOString().slice(0, 10);
    } // end if
  }

  /**
   * create new or update entry
   *
   */
  public saveBirthday(): void {
    this.birthday.date = new Date(this.isoDate);
    if ( this.isNewBirthday ) {
      this.store.dispatch(BirthdayActions.addBirthday(this.birthday));
    } else {
      this.store.dispatch(BirthdayActions.updateBirthday(this.birthday));
    } // end if
    this.viewCtrl.dismiss(this.birthday);
  }

  /**
   * confirm deletion with user
   *
   */
  public confirmDeleteBirthday(): void {
    let confirm = this.alertCtrl.create({
      title: 'DELETE BIRTHDAY',
      message: 'Are you sure that you would like to delete this birthday?',
      buttons: [
        {
          text: 'Delete',
          handler: () => this.deleteBirthday()
        },
        {
          text: 'Cancel',
          role: 'dismiss'
        }
      ]
    });
    confirm.present();
  }

  /**
   * delete entry from store
   *
   */
  private deleteBirthday(): void {
    this.store.dispatch(BirthdayActions.deleteBirthday(this.birthday));
    this.viewCtrl.dismiss(this.birthday);
  }

}
