import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Bill} from "../../models/bill";
import {BillService} from "../../service/bill/bill.service";
import {first} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-book-homestay',
  templateUrl: './book-homestay.component.html',
  styleUrls: ['./book-homestay.component.css']
})
export class BookHomestayComponent implements OnInit {

  bill!: Bill;
  homestay!: Homestay2;
  number_date!: number;
  price_homestay!: number;
  date_today!: any;

  calender_error: FormGroup = new FormGroup({});
  calender_day_bill: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private homestayService: Homestay2Service,
              private billService: BillService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<BookHomestayComponent>) {}

  ngOnInit(): void {
    this.homestay = this.data;

    this.get_bill_homestay_status();

    const today = new Date();

    this.date_today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    this.calender_day_bill = new FormGroup({
      start: new FormControl(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
      end: new FormControl(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
    });

    this.calender_error = new FormGroup({
      start: new FormControl(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
      end: new FormControl(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1))
    })

    this.start_end_date();
  }

  start_end_date(){
    this.number_date = Math.ceil(((this.calender_day_bill.value.end.getTime() - this.calender_day_bill.value.start.getTime()) / (24*60*60*1000)) + 1);
    this.price_homestay = this.number_date * this.data.price;
  }

  get_bill_homestay_status(){
    this.billService.bill_homestay_status(this.homestay.id).subscribe((data:Bill) => {
      this.bill = data;
    },error => {
      console.log('error_status_homestay');
    })
  }

  intercept_bill(){

  }

  book_homestay(){
    const bill_new = {
      account : {
       id : localStorage.getItem('ACCOUNT_ID'),
      },
      homestay : {
       id : this.homestay.id,
      },
      price : this.price_homestay,
      start_date : this.calender_day_bill.value.start,
      end_date : this.calender_day_bill.value.end
    }
    console.log(bill_new);
    this.billService.book_homsstay(bill_new).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.dialog.closeAll();
        },
        error => {
          console.log('error_book_homestay');
        });
  }


}
