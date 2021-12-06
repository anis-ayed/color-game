import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent {
  colorValue : string = '';

  @Output()
  colorChange = new EventEmitter<string>();

  @Input()
  get color(){
    return this.colorValue;
  }

  set color(val) {
    this.colorValue = val;
    this.colorChange.emit(this.colorValue);
  }
}
