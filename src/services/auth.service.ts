import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

import Auth0 from 'auth0-js';
import Auth0Cordova from '@auth0/cordova';

import { ProfileActions } from '../actions/profile.actions';


@Injectable()
export class AuthService {
  private jwtHelper: JwtHelper;
  private zoneImpl: NgZone;
  private refreshSub: any;

  private authConfig: any;
  private accessToken: string;
  private idToken: string;

  private authObj: Auth0.WebAuth;
  private authUser: any;

  constructor(private zone: NgZone) {
    this.zoneImpl = zone;
    this.jwtHelper = new JwtHelper();

    this.authConfig = {
      // needed for Auth0
      clientID: '4RaNJqHfSDeAyPJrtnLbFAMxiyjRJR3s',
      // needed for Auth0cordova
      clientId: '4RaNJqHfSDeAyPJrtnLbFAMxiyjRJR3s',
      domain: 'mtwebz.auth0.com',
      callbackURL: location.href,
      packageIdentifier: 'com.mt.mbirthdays'
    };
    // JavaScript Auth0 client for fetching user info
    this.authObj = new Auth0.WebAuth(this.authConfig);
  }

  /**
   * spawn Auth0 login
   *
   */
  public login(): void {
    const options = { scope: 'openid profile offline_access' };
    // native Auth0 client for authentication
    const client = new Auth0Cordova(this.authConfig);

    console.log(client);

    client.authorize(options,
      (err, authResult) => {
        if ( err ) throw err;
        console.info(authResult);

        const expiresAt = JSON.stringify(
          (authResult.expiresIn * 1000) + new Date().getTime()
        );
        this.setStorageItem('expires_at', expiresAt);

        this.setIdToken(authResult.idToken);
        this.setAccessToken(authResult.accessToken);

        this.authObj.client.userInfo(this.accessToken,
          (err, userData) => {
            if ( err ) throw err;
            this.zoneImpl.run(() => {
              this.authUser = userData;
              ProfileActions.updateUser(userData);
            });
          }
        );
      }
    );
  }

  /**
   * clear memory and storage of tokens and data
   *
   */
  public logout(): void {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('expires_at');
    this.idToken = null;
    this.accessToken = null;
    this.authUser = null;
  }

  /**
   * check to see if current token has expired
   * @return {boolean}
   */
  public isAuthenticated(): boolean {
    return this.tokenNotExpired();
  }

  public getNewJwt(): void {

  }

  /**
   * start interval for token updates
   *
   */
  private scheduleTokenRefresh(): void {
    let source = Observable.of(this.idToken)
      .flatMap((token: any) => {
        let jwtIat: number = this.jwtHelper.decodeToken(token).iat;
        let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
        let iat: Date = new Date(0);
        let exp: Date = new Date(0);
        let delay: number
          = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
        return Observable.interval(delay);
      });

    this.refreshSub = source.subscribe(() => this.getNewJwt());
  }

  /**
   * stop interval for token updates
   *
   */
  private unscheduleTokenRefresh(): void {
    if ( this.refreshSub ) this.refreshSub.unsubscribe();
  }

  /**
   * initialize process of self-refreshing token updates
   *
   */
  private initTokenRefresh(): void {
    if ( !this.isAuthenticated() ) return;

    let source = Observable.of(this.idToken)
      .flatMap((token: any) => {
        let now: number = new Date().valueOf();
        let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
        let exp: Date = new Date(0);
        exp.setUTCSeconds(jwtExp);
        let delay: number = exp.valueOf() - now;
        return Observable.timer(delay);
      });

    source.subscribe(() => {
      this.getNewJwt();
      this.scheduleTokenRefresh();
    });
  }

  /**
   * check if auth token has expired or is valid
   * @return {boolean}
   */
  private tokenNotExpired(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  /**
   * update token in memory and storage
   * @param {string} token
   */
  private setIdToken(token: string): void {
    this.idToken = token;
    this.setStorageItem('id_token', token);
  }

  /**
   * update token in memory and storage
   * @param {string} token
   */
  private setAccessToken(token: string): void {
    this.accessToken = token;
    this.setStorageItem('access_token', token);
  }

  /**
   * fetch item from local storage
   * @param {string} key
   * @return {any}
   */
  private getStorageItem(key: string): string {
    return JSON.parse(window.localStorage.getItem(key));
  }

  /**
   * add item to local storage
   * @param {string} key
   * @param {any} data
   */
  private setStorageItem(key: string, data: any): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

}
