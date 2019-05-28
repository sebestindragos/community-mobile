import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule  } from "nativescript-angular/forms";
import { HomePageComponent } from "./home/home.component";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { SignupPageComponent } from "./user-auth/signup.component";
import { SharedModule } from "../shared.module";
import { LoginPageComponent } from "./user-auth/login.component";
import { UserSearchPageComponent } from "./search/page.component";
import { UserProfilePageComponent } from "./profile/page.component";
import { NotificationsPageComponent } from "./notifications/page.component";
import { CoreModule } from "../core/core.module";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "signup", component: SignupPageComponent },
    { path: "login", component: LoginPageComponent },
    { path: "search", component: UserSearchPageComponent },
    { path: "u/:id", component: UserProfilePageComponent },
    { path: "notifications", component: NotificationsPageComponent }
];

@NgModule({
    imports: [
      NativeScriptModule,
      NativeScriptFormsModule,
      NativeScriptRouterModule.forRoot(routes),
      NativeScriptUISideDrawerModule,

      SharedModule,
      CoreModule
    ],
    exports: [NativeScriptRouterModule],
    declarations: [
      HomePageComponent,
      SignupPageComponent,
      LoginPageComponent,
      UserSearchPageComponent,
      UserProfilePageComponent,
      NotificationsPageComponent
    ],
    entryComponents: [
    ]
})
export class AppRoutingModule { }
