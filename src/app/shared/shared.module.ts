import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field/form-field.component';
import { LoadingComponent } from './loading/loading.component';
import { IfNoUserDirectiveDirective } from './directives/if-no-user-directive.directive';
import {IfUserDirectiveDirective} from "./directives/if-user-directive.directive";



@NgModule({
  declarations: [
    FormFieldComponent,
    LoadingComponent,
    IfUserDirectiveDirective,
    IfNoUserDirectiveDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    IfUserDirectiveDirective,
    IfNoUserDirectiveDirective,
  ]
})
export class SharedModule { }
