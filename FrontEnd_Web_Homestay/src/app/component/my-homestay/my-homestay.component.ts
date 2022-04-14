import { Component, OnInit } from '@angular/core';
import {SignInComponent} from "../../dialog/sign-in/sign-in.component";
import {CreateHomestayComponent} from "../../dialog/create-homestay/create-homestay.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-my-homestay',
  templateUrl: './my-homestay.component.html',
  styleUrls: ['./my-homestay.component.css']
})
export class MyHomestayComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateHome() {
    this.dialog.closeAll();
    this.dialog.open(CreateHomestayComponent, {
      width: '50%',
    });
  }
}
