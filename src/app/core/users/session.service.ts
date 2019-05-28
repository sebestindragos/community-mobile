import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as applicationSettings from "tns-core-modules/application-settings";

const JWT_KEY = '@jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public jwt$ = new BehaviorSubject<string | undefined>(undefined);
  public profile$ = new BehaviorSubject<any>(undefined);

  /**
   * Class constructor.
   */
  constructor () {
    // load jwt if it exists
    const token = applicationSettings.getString(JWT_KEY);
    if (token)
      this.jwt$.next(token);
  }

  /**
   * Set jwt token.
   */
  setJwt (value: string) {
    this.jwt$.next(value);
    applicationSettings.setString(JWT_KEY, value);
  }

  /**
   * Check if a user is logged in.
   */
  isLoggedIn () {
    return applicationSettings.getString(JWT_KEY) !== undefined;
  }

  /**
   * Terminate user session.
   */
  logout () {
    applicationSettings.remove(JWT_KEY);
    this.jwt$.next(undefined);
  }

  /**
   * Set user profile.
   */
  setProfile (user: any) {
    this.profile$.next(user);
  }
}
