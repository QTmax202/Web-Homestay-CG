import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Bill} from "../../models/bill";
import {BillService} from "../../service/bill/bill.service";
import {first} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-book-homestay',
  templateUrl: './book-homestay.component.html',
  styleUrls: ['./book-homestay.component.css']
})
export class BookHomestayComponent implements OnInit {

  bill_error!: Bill[];
  homestay!: Homestay2;
  number_date!: number;
  price_homestay!: number;
  date_today!: any;
  date_error_min!: any;
  date_error_max!: any;

  calender_error: FormGroup = new FormGroup({});
  calender_day_bill: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private homestayService: Homestay2Service,
              private billService: BillService,
              private dialog: MatDialog,
              private toast: NgToastService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<BookHomestayComponent>) {
  }

  ngOnInit(): void {
    this.homestay = this.data;

    const today = new Date();

    this.date_today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    this.calender_day_bill = new FormGroup({
      start: new FormControl(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
      end: new FormControl(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
    });

    this.start_end_date();
  }

  start_end_date() {
    this.number_date = Math.ceil(((this.calender_day_bill.value.end.getTime() - this.calender_day_bill.value.start.getTime()) / (24 * 60 * 60 * 1000)) + 1);
    this.price_homestay = this.number_date * this.data.price;
  }

  book_homestay() {
    const bill_new = {
      account: {
        id: localStorage.getItem('ACCOUNT_ID'),
      },
      homestay: {
        id: this.homestay.id,
      },
      price: this.price_homestay,
      start_date: this.calender_day_bill.value.start,
      end_date: this.calender_day_bill.value.end
    }
    console.log(bill_new);
    let check_bill: boolean = true;
    this.billService.bill_homestay_status(this.homestay.id).subscribe((data) => {
      for (let i of data) {
        this.date_error_min = new Date(i.start_date);
        this.date_error_max = new Date(i.end_date);
        if (this.date_error_min >= bill_new.start_date && this.date_error_max <= bill_new.end_date) {
          check_bill = false;
          console.log(1);
          // @ts-ignore
          document.getElementById("error-date-bill").innerHTML = "Từ ngày " + this.date_error_min.toJSON().slice(0,10).split('-').reverse().join('/') + " đến " + this.date_error_max.toJSON().slice(0,10).split('-').reverse().join('/') + " đã có người đặt!";
        } else if (this.date_error_min <= bill_new.start_date && this.date_error_max >= bill_new.end_date){
          check_bill = false;
          console.log(2);
          // @ts-ignore
          document.getElementById("error-date-bill").innerHTML = "Từ ngày " + this.date_error_min.toJSON().slice(0,10).split('-').reverse().join('/') + " đến " + this.date_error_max.toJSON().slice(0,10).split('-').reverse().join('/') + " đã có người đặt!";
        } else if (this.date_error_min > bill_new.start_date && this.date_error_min < bill_new.end_date){
          check_bill = false;
          console.log(3);
          // @ts-ignore
          document.getElementById("error-date-bill").innerHTML = "Từ ngày " + this.date_error_min.toJSON().slice(0,10).split('-').reverse().join('/') + " đến " + this.date_error_max.toJSON().slice(0,10).split('-').reverse().join('/') + " đã có người đặt!";
        } else if (this.date_error_max > bill_new.start_date && this.date_error_max < bill_new.end_date){
          check_bill = false;
          console.log(4);
          // @ts-ignore
          document.getElementById("error-date-bill").innerHTML = "Từ ngày " + this.date_error_min.toJSON().slice(0,10).split('-').reverse().join('/') + " đến " + this.date_error_max.toJSON().slice(0,10).split('-').reverse().join('/') + " đã có người đặt!";
        }
      }
      console.log(check_bill);
      if (check_bill){
        this.billService.book_homsstay(bill_new).pipe(first())
          .subscribe(
            data => {
              this.toast.success({detail: "Thành công!", summary: "Đặt lịch thành công!", duration: 5000})
              this.dialog.closeAll();
            },
            error => {
              console.log('error_book_homestay');
            });
      }
    });
  }
}

