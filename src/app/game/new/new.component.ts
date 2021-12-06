import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {concatAll, map, mergeAll, of, startWith} from "rxjs";
import {skip, tap} from "rxjs/operators";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  gameForm: FormGroup;
  table: any;
  row: number = 3;
  col: number = 6;
  constructor() {
    this.gameForm = new FormGroup({
      rows: new FormControl(3, [Validators.min(1)]),
      cols: new FormControl(6, [Validators.min(1)])
    })

  }

  ngOnInit(): void {
    this.drawGrid(this.row, this.col);
    const rowsControl = this.gameForm.get('rows');
    rowsControl?.valueChanges.pipe(startWith(3)).subscribe(val => {
      this.row = val
      this.changeRows(this.row, this.col);
    })
    const colsControl = this.gameForm.get('cols');
    colsControl?.valueChanges.pipe(startWith(6)).subscribe(val => {
      this.col = val
      this.changeCols(this.col)
    })
  }

  drawGrid(row: number, col: number):void {
    const table = [];
    for(let i =0; i < row; i++) {
      const cols = [...new Array(col)].map(() => 'blanc');
      table.push(cols);
    }
    this.table = table;
  }

  changeCols (col: number){
    if(col > this.table[0].length) {
      this.table.map((item: any[]) => item.push(...new Array(col - item.length)))
    } else if (col < this.table[0].length) {
      this.table.map((item: any[]) => item.splice(col - item.length))
    }
  }

  changeRows(row: number, col: number){
    if(row > this.table.length) {
      this.table.push(new Array(col))
    } else if (row < this.table.length){
      this.table.splice( row - this.table.length )
    }
  }

  changeColor(row: number, col: number):void {
    this.table[row][col] = prompt('insert color');
  }
}
