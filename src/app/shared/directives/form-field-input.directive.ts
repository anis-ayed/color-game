import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output
} from '@angular/core';
import {FormGroupDirective, ValidationErrors} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
export interface Status {
  status: string;
  errors: ValidationErrors | null;
}

@Directive({
  selector: '[app-form-field-input]'
})
export class FormFieldInputDirective implements OnInit, AfterContentInit, OnDestroy{
  @Output() changeStatus = new EventEmitter<Status>();
  @Input() formControlName: string = '';
  private _isDead$ = new Subject();
  constructor(private ref: ElementRef<HTMLInputElement>, @Optional() private formGroupDirective: FormGroupDirective) {
  }

  ngOnInit(): void {
    this.ref.nativeElement.className = 'form-control rounded-right' ;
  }

  ngAfterContentInit(): void {
    const control = this.formGroupDirective.form.controls[this.formControlName]
    control.statusChanges?.pipe(takeUntil(this._isDead$)).subscribe(status => {
      this.changeStatus.emit({status, errors: control.errors});
    });
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this._isDead$.next();
  }
}
