import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SignInComponent} from "../../dialog/sign-in/sign-in.component";
import {NotifyComponent} from "../../dialog/notify/notify.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account/account.service";
import {Account} from "../../models/account";
import {NotifyService} from "../../service/notify/notify.service";
import {MatTableDataSource} from "@angular/material/table";
import {Notify} from "../../models/notify";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  pathUrl?: string;
  idAcc = localStorage.getItem('ACCOUNT_ID')
  account!: Account;
  notifies!: Notify[];

  constructor(public dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private notifyService: NotifyService) { }

  ngOnInit(): void {
    if (this.idAcc != null) {
      this.getInformationAccount();
    }
    const {returnUrl: returnUrl} = this.activatedRoute.snapshot.queryParams;
    this.pathUrl = returnUrl || 'home';
  }

  check1Notify() {
    this.notifyService.check1Notify(this.idAcc).subscribe((data) => {
      this.notifies = data;
      console.log(this.notifies)
    }, error => {
      this.notifies = []
      console.log(this.notifies)
    })
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
    }).afterClosed().subscribe(() => {
      this.check1Notify();
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
    window.location.reload();
    this.router.navigate(['/home']).then();
  }
}
