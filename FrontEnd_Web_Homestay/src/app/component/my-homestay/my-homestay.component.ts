import { Component, OnInit } from '@angular/core';
import {SignInComponent} from "../../dialog/sign-in/sign-in.component";
import {CreateHomestayComponent} from "../../dialog/create-homestay/create-homestay.component";
import {MatDialog} from "@angular/material/dialog";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {MyHomestayDto} from "../../models/my-homestay-dto";

@Component({
  selector: 'app-my-homestay',
  templateUrl: './my-homestay.component.html',
  styleUrls: ['./my-homestay.component.css']
})
export class MyHomestayComponent implements OnInit {

  idAcc = localStorage.getItem('ACCOUNT_ID')
  homestays!: MyHomestayDto[];

  constructor(private dialog: MatDialog,
              private homestayService: Homestay2Service) { }

  ngOnInit(): void {
    this.getHomestayByAccountId()
  }

  getHomestayByAccountId() {
    this.homestayService.getHomestayByAccountId(this.idAcc).subscribe((data) => {
      this.homestays = data;
    })
  }

  openCreateHome() {
    this.dialog.closeAll();
    this.dialog.open(CreateHomestayComponent, {
      width: '50%',
    });
  }

  openMyHomestay() {
    // @ts-ignore
    document.getElementById("my-homestay").style.display = 'block';
    // @ts-ignore
    document.getElementById("my-bill").style.display = 'none';
  }

  openMyBill() {
    // @ts-ignore
    document.getElementById("my-homestay").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-bill").style.display = 'block';
  }
}
