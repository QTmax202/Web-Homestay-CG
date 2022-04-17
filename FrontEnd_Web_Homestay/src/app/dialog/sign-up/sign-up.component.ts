import {Component, OnInit} from '@angular/core';
import {SignInComponent} from "../sign-in/sign-in.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../confirm/confirm.component";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Account} from "../../models/account";
import {AccountService} from "../../service/account/account.service";
import {NgToastService} from "ng-angular-popup";

export function forbidden(c: AbstractControl): ValidationErrors | null {
  const v = c.value;
  return (v.password === v.rePassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp: FormGroup = new FormGroup({});
  account!: Account;
  hide = true;

  constructor(private dialog: MatDialog,
              private accountService: AccountService,
              private fb: FormBuilder,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.formSignUp = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      date_birth: [''],
      address: [''],
      gmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rePassword: ['', Validators.required],
    }, {validators: this.checkIfMatchingPasswords('password', 'rePassword')})
  }

  public checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[passwordKey];
      const matchingControl = formGroup.controls[passwordConfirmationKey];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  createAccount() {
    const account = {
      id: this.formSignUp.value.id,
      name: this.formSignUp.value.name,
      phone_number: this.formSignUp.value.phone_number,
      date_birth: this.formSignUp.value.date_birth,
      address: this.formSignUp.value.address,
      gmail: this.formSignUp.value.gmail,
      password: this.formSignUp.value.password,
    }
    console.log("account" + account);
    this.accountService.createAccount(account).subscribe(() => {
      this.toast.success({detail:'SuccessMessage', summary:'Tạo tài khoản thành công'})
      this.formSignUp.reset();
      // this.openConfirm();
    }, error => {
      // @ts-ignore
      document.getElementById("error-form-sign-up").innerText = "Tài khoản email đã tồn tại!"
    })
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
