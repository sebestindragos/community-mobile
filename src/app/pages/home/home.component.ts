import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { UsersApiService } from "~/app/core/users/usersAPI.service";
import { SessionService } from "~/app/core/users/session.service";
import { Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { SocialService } from "~/app/core/social/social.service";

@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: [
    "./home.component.css"
  ]
})
export class HomePageComponent implements OnInit {
  private drawer: any;
  private _cursor = ''; // id of the last anoucement
  private _canLoadMore = true;
  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  public profile$: any;
  public isLoggedIn$: Observable<boolean>;
  public newPostText = '';
  public wallPosts: any[] = [];

  /**
   * Class constructor.
   */
  constructor (
    private _changeDetectionRef: ChangeDetectorRef,
    private _session: SessionService,
    private _usersApi: UsersApiService,
    private _socialService: SocialService
  ) {
    this.profile$ = this._session.profile$;
    this.isLoggedIn$ = this._session.jwt$.pipe(map(jwt => !!jwt));
  }

  async ngOnInit() {
    await this.loadMore();
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this._changeDetectionRef.detectChanges();
  }

  public openDrawer() {
    this.drawer.showDrawer();
  }

  public onCloseDrawerTap() {
      this.drawer.closeDrawer();
  }

  /**
   * Check if any user is logged in
   */
  hasSession () {
    return this._session.isLoggedIn();
  }

  /**
   * Logout current user.
   */
  logout () {
    this._session.logout();
  }

  /**
   * Create a new post.
   */
  createPost () {
    this._session.jwt$.pipe(switchMap(
      token => this._socialService.createWallPost(this.newPostText, token || '')
    )).subscribe((newPost: any) => {
      this.newPostText = '';
      this.wallPosts.unshift(newPost);
    });
  }

  /**
   * Load next batch of polls.
   */
  async loadMore () {
    if (this._canLoadMore) {
      this._canLoadMore = false;
      let token = await this._session.jwt$.pipe(take(1)).toPromise();
      let batch = await this._socialService.getWallPosts({
        fromId: this._cursor,
        limit: 100
      }, token || '').toPromise();

      if (batch.length > 0) {
        console.log('batch size', batch.length);
        this._canLoadMore = true;
        this._cursor = batch[batch.length - 1]._id;
        this.wallPosts = this.wallPosts.concat(batch);
      }
    }
  }
}
