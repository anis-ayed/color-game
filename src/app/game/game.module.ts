import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { CaseComponent } from './case/case.component';
import {GameRoutingModule} from "./game-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NewComponent,
    CaseComponent
  ],
    imports: [
        CommonModule,
        GameRoutingModule,
        ReactiveFormsModule
    ]
})
export class GameModule { }
