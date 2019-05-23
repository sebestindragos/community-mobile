import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule  } from "nativescript-angular/forms";
import { HomePageComponent } from "./home/home.component";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NoteDetailsPageComponent } from "./note-details/page.component";
import { AddNoteModalComponent } from "./home/add-note-modal.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "notes/:id", component: NoteDetailsPageComponent }
];

@NgModule({
    imports: [
      NativeScriptModule,
      NativeScriptFormsModule,
      NativeScriptRouterModule.forRoot(routes)
    ],
    exports: [NativeScriptRouterModule],
    declarations: [
      HomePageComponent,
      NoteDetailsPageComponent,
      AddNoteModalComponent
    ],
    entryComponents: [
      AddNoteModalComponent
    ]
})
export class AppRoutingModule { }
