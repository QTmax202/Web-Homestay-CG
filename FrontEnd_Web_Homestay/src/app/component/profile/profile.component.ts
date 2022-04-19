import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {BookHomestayComponent} from "../../dialog/book-homestay/book-homestay.component";
import {MatDialog} from "@angular/material/dialog";
import {ChangePassComponent} from "../../dialog/change-pass/change-pass.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {newArray} from "@angular/compiler/src/util";
import {AccountService} from "../../service/account/account.service";
import {Account} from "../../models/account";
import {ProfileDto} from "../../models/profile-dto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  selectedFile?: File;
  fb: any;
  downloadURL?: Observable<string>;
  account!: Account;
  profile!: ProfileDto;
  avataUrl!:string;
  formProfile: FormGroup = new FormGroup({});
  idAcc = localStorage.getItem('ACCOUNT_ID')

  constructor(private storage: AngularFireStorage,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getInformationAccount();
    this.formProfile = this.formBuilder.group({
      name: ['',[Validators.required]],
      gmail:['',[Validators.required]],
      phone_number:['',[Validators.required]],
      address:['',[Validators.required]],
    })
  }

  getInformationAccount() {
    this.accountService.getInformationAccount(this.idAcc).subscribe((data) => {
      this.account = data;
      this.avataUrl = data.avatar_url;
      this.formProfile.controls['name'].setValue(this.account.name),
      this.formProfile.controls['gmail'].setValue(this.account.gmail),
      this.formProfile.controls['phone_number'].setValue(this.account.phone_number),
      this.formProfile.controls['address'].setValue(this.account.address)
    })
  }


  updateProfile() {
    const information = {
      name: this.formProfile.value.name,
      gmail: this.formProfile.value.gmail,
      phone_number: this.formProfile.value.phone_number,
      address: this.formProfile.value.address,
      avatar_url: this.avataUrl,
    }
    console.log(information)
    this.accountService.updateProfile(information, this.idAcc).subscribe((data) => {
      console.log(information)
      window.location.reload();
    })
  }

  onFileSelected(event: any) {
    let date = Date.now();
    const file = event.target.files[0];
    const filePath = `Avatar_Images/${date}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Avatar_Images/${date}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.avataUrl = url;
            }
            console.log(this.avataUrl);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  openChangePass() {
    this.dialog.closeAll()
    this.dialog.open(ChangePassComponent, {
      width: '50%',
    });
  }

}
