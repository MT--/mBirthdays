import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { BirthdayApp } from './app.component';
import { DetailsPage } from '../pages/details/details.page';
import { HomePage } from '../pages/home/home.page';
import { ProfilePage } from '../pages/profile/profile.page';

import { BirthdayActions } from '../actions/birthday.actions';
import { BirthdayEffects } from '../effects/birthday.effects';
import { BirthdaysReducer } from '../reducers/birthdays.reducer';
import { BirthdayService } from '../services/birthday.service';
import { ProfileService } from '../services/profile.service';
import { ProfileActions } from '../actions/profile.actions';
import { ProfileEffects } from '../effects/profile.effects';
import { ProfileReducer } from '../reducers/profile.reducer';

@NgModule({
  declarations: [
    BirthdayApp,
    HomePage,
    DetailsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(BirthdayApp, {}),
    StoreModule.provideStore({
        birthdays: BirthdaysReducer,
        currentUser: ProfileReducer
      },
      (<any>window).__REDUX_DEVTOOLS_EXTENSION__
      && (<any>window).__REDUX_DEVTOOLS_EXTENSION__()),
    EffectsModule.run(BirthdayEffects),
    EffectsModule.run(ProfileEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    BirthdayApp,
    HomePage,
    DetailsPage,
    ProfilePage
  ],
  providers: [
    BirthdayActions,
    BirthdayService,
    ProfileActions,
    ProfileService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
}
