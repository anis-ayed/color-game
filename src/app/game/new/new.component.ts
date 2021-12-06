import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  gameForm: FormGroup;
  table: any;
  constructor() {
    this.gameForm = new FormGroup({
      rows: new FormControl(3, [Validators.min(1)]),
      cols: new FormControl(6, [Validators.min(1)])
    })

  }

  ngOnInit(): void {
    this.drawGrid(this.gameForm.get('rows')?.value, this.gameForm.get('cols')?.value);
  }

  drawGrid(row: number, col: number):void {
    const table = [];
    for(let i =0; i < row; i++) {
      const cols = [...new Array(col)].map(() => 'blanc');
      table.push(cols);
    }
    this.table = table;
  }

  changeColor(row: number, col: number):void {
    this.table[row][col] = prompt('insert color');
  }
}
