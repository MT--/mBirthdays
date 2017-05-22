import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../../services/app-state.service';
import { Birthday } from '../../models/birthday';

import { DetailsPage } from '../details/details.page';
import { ProfilePage } from '../profile/profile.page';


@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

  public birthdays: Observable<Birthday[]>;

  constructor(
    public modalCtrl: ModalController,
    public store: Store<AppState>
  ) {
    this.birthdays = this.store.select(state => state.birthdays);
  }

  public showProfileModal(): void {
    let modal = this.modalCtrl.create(ProfilePage);
    modal.present();
  }

  public showEditModal(birthday: Birthday): void {
    let modal = this.modalCtrl.create(DetailsPage, { birthday });
    modal.present();
  }

}
