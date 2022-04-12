import { Component, OnInit } from '@angular/core';
import {RateCommentComponent} from "../rate-comment/rate-comment.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../confirm/confirm.component";
import {ConfirmBookComponent} from "../confirm-book/confirm-book.component";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openConfirm() {
    this.dialog.open(ConfirmBookComponent, {
      width: '50%',
    });
  }
}
