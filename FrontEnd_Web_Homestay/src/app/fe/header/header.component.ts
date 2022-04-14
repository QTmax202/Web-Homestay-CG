import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SignInComponent} from "../../dialog/sign-in/sign-in.component";
import {NotifyComponent} from "../../dialog/notify/notify.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account/account.service";
import {Account} from "../../models/account";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pathUrl?: string;
  idAcc = localStorage.getItem('ACCOUNT_ID')
  account!: Account;

  constructor(public dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService) { }

  ngOnInit(): void {
    if (this.idAcc != null) {
      this.getInformationAccount();
    }
    const {returnUrl: returnUrl} = this.activatedRoute.snapshot.queryParams;
    this.pathUrl = returnUrl || '/home';
  }

  getInformationAccount() {
    this.accountService.getInformationAccount(this.idAcc).subscribe((data) => {
      this.account = data;
    })
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

  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ACCOUNT_ID');
    localStorage.removeItem('currentAccount');
    this.router.navigate([this.pathUrl]).then();
    window.location.reload();
  }
}
