import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/**
 * Module used for encapsulating needed core modules
 * and exporting them.
 */
@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  ]
})
export class SharedModule {}
