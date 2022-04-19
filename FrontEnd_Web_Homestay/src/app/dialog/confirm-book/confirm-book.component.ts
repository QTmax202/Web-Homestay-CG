import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {BillService} from "../../service/bill/bill.service";
import {Bill} from "../../models/bill";
import {first} from "rxjs";

@Component({
  selector: 'app-confirm-book',
  templateUrl: './confirm-book.component.html',
  styleUrls: ['./confirm-book.component.css']
})
export class ConfirmBookComponent implements OnInit {
  myBill!:Bill;
  number_date!: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private billService: BillService) { }

  ngOnInit(): void {
    this.getBillById(this.data.id);
  }

  getBillById(id : any){
    this.billService.findBillById(id).subscribe(data =>{
      this.myBill = data;
      this.number_date = Math.ceil(((new Date(data.end_date).getTime() - new Date(data.start_date).getTime()) / (24*60*60*1000)) + 1);
      console.log(this.number_date);
    })
  }

  cancellingInvoiceClient(id : any){
    this.billService.cancellingInvoiceClient(id).pipe(first())
      .subscribe(
        data => {
          if (data.status == 202){
            // @ts-ignore
            document.getElementById("error-registration-confirmation").innerHTML="Lỗi hủy (chỉ được hủy trước 1 ngày)!"
          } else {
            console.log(data);
            window.location.reload();
            this.dialog.closeAll();
          }
        },
        error => {
          // @ts-ignore
          document.getElementById("error-registration-confirmation").innerHTML="Lỗi hủy (chỉ được hủy trước 1 ngày)!"
        });
  }

  cancellingInvoiceHost(id : any){
    this.billService.cancellingInvoiceHost(id).pipe(first())
      .subscribe(
        data => {
          if (data.status == 202){
            // @ts-ignore
            document.getElementById("error-registration-confirmation").innerHTML="Lỗi hủy (chỉ được hủy trước 1 ngày)!"
          } else {
            console.log(data);
            window.location.reload();
            // @ts-ignore
            document.getElementById("my-homestay").style.display = 'none';
            // @ts-ignore
            document.getElementById("my-bill").style.display = 'block';
            // @ts-ignore
            document.getElementById("my-turn-over").style.display = 'none';
            this.dialog.closeAll();
          }
        }, error => {
          // @ts-ignore
          document.getElementById("error-registration-confirmation").innerHTML="Lỗi hủy (chỉ được hủy trước 1 ngày)!"
        });
  }

  HomestayCheckIn(id :any){
    this.billService.HomestayCheckIn(id).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
          this.dialog.closeAll();
        },error => {
          console.log(error);
        }
      )
  }

  HomestayCheckOut(id :any){
    this.billService.HomestayCheckOut(id).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
          this.dialog.closeAll();
        },error => {
          console.log(error);
        }
      )
  }

  HomestayConfirmHost(id :any){
    this.billService.registrationConfirmation(id).pipe(first())
      .subscribe(
        data => {
          console.log(data);
          window.location.reload();
          // @ts-ignore
          document.getElementById("my-homestay").style.display = 'none';
          // @ts-ignore
          document.getElementById("my-bill").style.display = 'block';
          // @ts-ignore
          document.getElementById("my-turn-over").style.display = 'none';
          this.dialog.closeAll();
        },error => {
          console.log(error);
        }
      )
  }

}
