import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Account} from "../../models/account";
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../../service/account/account.service";
import {ChangePassword} from "../../models/change-password";



@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  changePasswordForm!: ChangePassword;
  formPassword: FormGroup = new FormGroup({});
  idAcc = localStorage.getItem('ACCOUNT_ID')
  hide = true;

  constructor(private dialog: MatDialog,
              private accountService: AccountService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formPassword = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  changePassword() {
    const changePass = {
      currentPassword: this.formPassword.value.currentPassword,
      newPassword: this.formPassword.value.newPassword,
      confirmPassword: this.formPassword.value.confirmPassword,
    }
    console.log(changePass)
    this.accountService.changePassword(changePass, this.idAcc).subscribe((data) => {
      this.dialog.closeAll();
    }, error => {
      // @ts-ignore
      document.getElementById("error-form-change-password").innerText = "Sai mật khẩu cũ hoặc mật khẩu xác nhân không đúng"
    })
  }
}
