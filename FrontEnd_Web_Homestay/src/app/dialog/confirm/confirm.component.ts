import { Component, OnInit } from '@angular/core';
import {SignUpComponent} from "../sign-up/sign-up.component";
import {MatDialog} from "@angular/material/dialog";
import {SignInComponent} from "../sign-in/sign-in.component";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSignIn() {
    this.dialog.closeAll();
    this.dialog.open(SignInComponent, {
      width: '30%',
    });
  }
}
