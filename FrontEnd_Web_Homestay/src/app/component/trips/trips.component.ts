import { Component, OnInit } from '@angular/core';
import {ChangePassComponent} from "../../dialog/change-pass/change-pass.component";
import {MatDialog} from "@angular/material/dialog";
import {RateCommentComponent} from "../../dialog/rate-comment/rate-comment.component";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {YourBillDto} from "../../models/your-bill-dto";
import {MyHomestayDto} from "../../models/my-homestay-dto";
import {MyBillDto} from "../../models/my-bill-dto";
import {CommentService} from "../../service/comment/comment.service";
import {ConfirmBookComponent} from "../../dialog/confirm-book/confirm-book.component";
import {Bill} from "../../models/bill";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  idAcc = localStorage.getItem('ACCOUNT_ID')
  myBill!: MyBillDto[];

  constructor(private dialog: MatDialog,
              private homestayService: Homestay2Service,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.getBillByAccountId()
    this.existsCommentByAccount_IdAndHomestay_Id()
  }

  existsCommentByAccount_IdAndHomestay_Id() {
    console.log(this.myBill)
  }

  getBillByAccountId() {
    this.homestayService.getMyBillByAccountId(this.idAcc).subscribe((data) => {
      this.myBill = data;
      console.log(this.myBill)
      for (let i = 0; i < this.myBill.length; i++) {
        console.log(this.myBill[i].homeId)
        this.commentService.existsCommentByAccount_IdAndHomestay_Id(this.idAcc, this.myBill[i].homeId).subscribe((dataExist) => {
          this.myBill[i].exist = dataExist;
          console.log(this.myBill[i].exist)
        })
      }
    })
  }


  openRate(homeId: any) {
    this.dialog.closeAll()
    this.dialog.open(RateCommentComponent, {
      width: '50%',
      data : homeId
    });
  }

  openConfirm(myBill:MyBillDto) {
    this.dialog.open(ConfirmBookComponent, {
      width: '50%',
      data :  myBill
    });
  }
}
