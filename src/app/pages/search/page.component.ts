import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { Observable, fromEvent, combineLatest, Subject } from 'rxjs';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { UsersApiService } from '../../core/users/usersAPI.service';
import { SessionService } from '../../core/users/session.service';

/**
 * Component used for displaying the 404 page.
 *
 * @author Dragos Sebestin
 */
@Component({
  moduleId: module.id,
  templateUrl: 'page.component.html',
  styleUrls: [
    'page.component.css'
  ]
})
export class UserSearchPageComponent implements AfterViewInit {
  private _term$ = new Subject<string>();
  public results$!: Observable<any[]>;

  /**
   * Class constructor.
   */
  constructor (
    private _usersApi: UsersApiService,
    private _session: SessionService
  ) {

  }

  ngAfterViewInit () {
    const input$ = this._term$
      .pipe(debounceTime(500));

    this.results$ = combineLatest(input$, this._session.jwt$)
      .pipe(switchMap(res => {
        const term = res[0];
        const token = res[1];
        return this._usersApi.search(term, token || '');
      }));
  }

  pushTerm (text: string) {
    console.log(text);
    this._term$.next(text);
  }
}
