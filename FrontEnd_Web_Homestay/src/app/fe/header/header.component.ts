import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SignInComponent} from "../../dialog/sign-in/sign-in.component";
import {NotifyComponent} from "../../dialog/notify/notify.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pathUrl?: string;

  constructor(public dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const {returnUrl: returnUrl} = this.activatedRoute.snapshot.queryParams;
    this.pathUrl = returnUrl || '/home';
  }

  openNotify() {
    this.dialog.closeAll()
    this.dialog.open(NotifyComponent, {
      width: '50%',
    });
  }

  openSignIn() {
    this.dialog.closeAll()
    this.dialog.open(SignInComponent, {
      width: '30%',
    });
  }

  logout() {
    localStorage.removeItem('currentAccount');
    localStorage.removeItem('ACCESS_TOKEN');
    this.router.navigate([this.pathUrl]).then();
  }
}
