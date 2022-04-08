import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SignUpComponent} from "../sign-up/sign-up.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSignUp() {
    this.dialog.closeAll();
    this.dialog.open(SignUpComponent, {
      width: '30%',
    });
  }
}
