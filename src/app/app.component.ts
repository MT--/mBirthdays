import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import Auth0Cordova from '@auth0/cordova';

import { HomePage } from '../pages/home/home.page';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class BirthdayApp {
  public rootPage: any = HomePage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // Auth0 callback handler
      // HACK: timeout suggested in Github issue
      (<any>window).handleOpenURL = (url) => {
        setTimeout(() => {
          console.log(url);
          Auth0Cordova.onRedirectUri(url);
        }, 10);
      };
    });
  }
}

