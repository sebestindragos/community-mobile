import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./pages/pages.module";
import { AppComponent } from "./app.component";

import {
  ENVIRONMENT_CONFIG, IEnvironmentConfig, IServerConfig
} from './environment.config';
import { CoreModule } from './core/core.module';

export function init (
  http: HttpClient,
  env: IEnvironmentConfig
) {
  return () => {
    env.api = {
      hostname: "http://192.168.88.102:8080",
      version: "v1.0"
    };
  };
}

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    {provide: ENVIRONMENT_CONFIG, useValue: {
      baseUrl: '/'
    }, multi: true},
    {provide: APP_INITIALIZER, useFactory: init, deps: [
      HttpClient, ENVIRONMENT_CONFIG
    ], multi: true}
  ],
})
export class AppModule { }
