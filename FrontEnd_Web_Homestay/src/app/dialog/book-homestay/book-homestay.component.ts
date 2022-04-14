import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-book-homestay',
  templateUrl: './book-homestay.component.html',
  styleUrls: ['./book-homestay.component.css']
})
export class BookHomestayComponent implements OnInit {
  homestay!: Homestay2;
  number_date!: number;
  price_homestay!: number;

  calender_today: FormGroup = new FormGroup({})
  calender_day_bill: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private homestayService: Homestay2Service,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<BookHomestayComponent>) {

    const today = new Date();

    this.calender_day_bill = new FormGroup({
      start: new FormControl(new Date(today.getFullYear(), today.getMonth(), today.getDate())),
      end: new FormControl(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
    });

    // this.calender_today = new FormGroup({
    //   end: new FormControl(new Date(year, month, today.getDate())),
    // });
  }

  ngOnInit(): void {
    this.homestay = this.data;
    this.start_end_date();
  }

  start_end_date(){
    this.number_date = Math.ceil((this.calender_day_bill.value.end.getTime() - this.calender_day_bill.value.start.getTime()) / (24*60*60*1000));
    this.price_homestay = this.number_date * this.data.price;
  }

}
