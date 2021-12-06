import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnDestroy,
  QueryList
} from '@angular/core';
import {FormFieldInputDirective} from "../directives/form-field-input.directive";
import {startWith, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {
  title: string = '';
  id: string = '';
  type: string = 'text';
  get icon() {
    switch (this.type) {
      case 'password':
        return  'lock'
      case 'email':
        return 'at'
      case 'date':
        return  'calendar'
      case 'number':
        return 'sort-numeric-asc'
      default:
        return 'text'
    }
  }
  messageError: any[] =[];
  private _isDead$ = new Subject();
  @ContentChildren(FormFieldInputDirective) contentChildren : QueryList<FormFieldInputDirective> | undefined;
  constructor() {

  }

  ngAfterContentInit(): void {
    // @ts-ignore
    const {id, type, title} = this.contentChildren?.get(0).ref.nativeElement;
    this.title = title;
    this.id = id;
    this.type = type;
    // @ts-ignore
    this.contentChildren?.get(0)?.changeStatus.pipe(
      startWith({status: 'VALID', errors: null}),
      takeUntil(this._isDead$)
    ).subscribe(stat => {
        if (stat.errors) {
          this.messageError = Object.entries(stat.errors).map(error => `${error[0]} : ${JSON.stringify(error[1])}`);
        }
        // @ts-ignore
        (stat.status === 'INVALID') ? this.contentChildren?.get(0).ref.nativeElement.className = 'form-control is-invalid' : this.contentChildren?.get(0).ref.nativeElement.className = 'form-control is-valid';
      }
    );
  }
  ngOnDestroy() {
    // @ts-ignore
    this._isDead$.next();
  }

}
