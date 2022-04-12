import { Component, OnInit } from '@angular/core';
import {SignInComponent} from "../sign-in/sign-in.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../confirm/confirm.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openSignIn() {
    this.dialog.closeAll()
    this.dialog.open(SignInComponent, {
      width: '30%',
    });
  }

  openConfirm() {
    this.dialog.closeAll()
    this.dialog.open(ConfirmComponent, {
      width: '30%',
    });
  }
}
