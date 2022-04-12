import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SignInComponent} from "../../dialog/sign-in/sign-in.component";
import {NotifyComponent} from "../../dialog/notify/notify.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openNotify() {
    this.dialog.closeAll()
    this.dialog.open(NotifyComponent, {
      width: '40%',
    });
  }

  openSignIn() {
    this.dialog.closeAll()
    this.dialog.open(SignInComponent, {
      width: '30%',
    });
  }
}
