import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";
import {BookHomestayComponent} from "../../dialog/book-homestay/book-homestay.component";
import {MatDialog} from "@angular/material/dialog";
import {ChangePassComponent} from "../../dialog/change-pass/change-pass.component";
import {Account} from "../../models/account";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../service/account/account.service";
import {updateProfile} from "@angular/fire/auth";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // idUser = parseInt(<string>localStorage.getItem("ACCOUNT_ID"))
  profile: Account | undefined;
  account: Account[] | undefined;

  editProfile = new FormGroup({
    name: new FormControl(''),
    gmail: new FormControl(''),
    phone_number: new FormControl(''),
    date_birth: new FormControl(''),
    address: new FormControl('')
  });

  selectedFile?: File ;
  fb : any;
  downloadURL?: Observable<string>;
  constructor(private storage: AngularFireStorage,
              private dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private toast: NgToastService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(paramap => {
      const id = localStorage.getItem('ACCOUNT_ID');
      this.accountService.findById(id).subscribe(value => {
        this.profile = value
        console.log(this.profile);
      }, error => {
        console.log(error);
      })
    })
  }

  updateProfile() {
    this.activeRoute.paramMap.subscribe(paramap => {
      const updateProfile = {
        name: this.editProfile.value.name,
        phone_number: this.editProfile.value.phone_number,
        gmail: this.editProfile.value.gmail,
        address: this.editProfile.value.address
      }
      console.log(this.updateProfile);
      this.accountService.updateProfile(updateProfile, localStorage.getItem('ACCOUNT_ID')).subscribe(() => {
        this.toast.success({detail: 'SuccessMes', summary: 'Cập nhật thành công!!', duration: 5000})
        this.editProfile.reset();
      })
    })
  }

  onFileSelected(event : any) {
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
