import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ChangePassComponent} from "../../dialog/change-pass/change-pass.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../service/account/account.service";
import {Account} from "../../models/account";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Account | undefined;
  account: Account[] | undefined;

  editProfile = new FormGroup({
    name: new FormControl(''),
    gmail: new FormControl(''),
    phone_number: new FormControl(''),
    date_birth: new FormControl(''),
    address: new FormControl('')
  });

  fb : any;
  downloadURL?: Observable<string>;
  componentsService: any;

  constructor(private storage: AngularFireStorage,
              private dialog: MatDialog,
              private accountService: AccountService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(paramap => {
      const id = localStorage.getItem('ACCOUNT_ID');
      this.accountService.findById(id).subscribe(data => {
        this.profile = data
        console.log(this.profile)
      }, error => {
        console.log(error)
      })
    })
    // this.accountService.findById(localStorage.getItem('ACCOUNT_ID')).subscribe(result => {
    //   this.profile = result;
    //   this.editProfile.controls[`id`].setValue(result.name);
    //   this.editProfile.controls[`phone_number`].setValue(result.phone_number);
    //   this.editProfile.controls[`gmail`].setValue(result.gmail);
    //   this.editProfile.controls[`address`].setValue(result.address);
    //   // this.id = Number(idSearch);
    //   console.log(result)
    // })
  }

  updateProfile() {
    this.activeRoute.paramMap.subscribe(paramap => {
      const form = this.editProfile.value;
      const profile = {
        name: form.name,
        phone_number: form.phone_number,
        gmail: form.gmail,
        address: form.address
      }
      console.log(this.profile);
      this.accountService.updateProfile(profile, localStorage.getItem('ACCOUNT_ID')).subscribe();
    });
  }

  onFileSelected(event : any) {
    localStorage.getItem('ACCOUNT_ID')
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
              this.fb = url;
            }
            console.log(this.fb);
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
