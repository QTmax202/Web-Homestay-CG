import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MyBillDto} from "../../models/my-bill-dto";
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
    // this.myBill = this.data;
    // console.log(new Date(this.data.endDate).getTime());
    // console.log(new Date(this.data.startDate).getTime());
    // this.number_date = Math.ceil(((new Date(this.data.end_date).getTime() - new Date(this.data.startDate).getTime()) / (24*60*60*1000)) + 1);
    // console.log(this.number_date);
  }

  getBillById(id : any){
    this.billService.findBillById(id).subscribe(data =>{
      this.myBill = data;
      console.log(data.end_date);
      console.log(new Date(data.start_date).getTime());
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
            this.dialog.closeAll();
          }
        },
        error => {
          // @ts-ignore
          document.getElementById("error-registration-confirmation").innerHTML="Lỗi hủy (chỉ được hủy trước 1 ngày)!"
        });
  }

}
