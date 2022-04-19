import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Homestay2} from "../../models/homestay2";
import {HomestayComponent} from "../../component/homestay/homestay.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../service/account/account.service";
import {AuthenticationService} from "../../service/authentication.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute} from "@angular/router";
import {City} from "../../models/city";
import {HomestayType} from "../../models/homestay-type";
import {HomestayService} from "../../service/homestay.service";

@Component({
  selector: 'app-create-homestay',
  templateUrl: './create-homestay.component.html',
  styleUrls: ['./create-homestay.component.css']
})
export class CreateHomestayComponent implements OnInit {

  public loading = false;
  fb: any;
  selectedImages: any[] = [];
  idAcc = parseInt(<string>localStorage.getItem('ACCOUNT_ID'))
  formHome!: FormGroup;
  myItem: File[] = [];
  homestayTypes!: HomestayType[];
  homestay_type!: HomestayType;
  cities!: City[];
  city!: City;
  home!: Homestay2;
  actionBtn: string = "tạo"


  constructor(private homestayService: HomestayService,
              private route: ActivatedRoute,
              private toast: NgToastService,
              private authenticationService: AuthenticationService,
              private formGroup: FormBuilder,
              private accountService: AccountService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<HomestayComponent>) {}




  ngOnInit(): void {
    this.getHomestayByAccId()
    this.getAllHomestayType()
    this.getAllCity()
    this.formHome = this.formGroup.group({
      name:['',[Validators.required]],
      address:['',[Validators.required]],
      bed_room:['',[Validators.required]],
      bath_room:['',[Validators.required]],
      price:['',[Validators.required]],
      status:['',[Validators.required]],
      description:['',[Validators.required]],
      homestay_type:['',[Validators.required]],
      city:['',[Validators.required]],
      imageOfHomestay:'',
    })
  }

  getAllHomestayType(){
    this.homestayService.getAllType().subscribe(data => {
      this.homestayTypes = data;
    })
  }
  getAllCity() {
    this.homestayService.getAllCity().subscribe(data => {
      this.cities = data
    })
  }

  createHome() {
    const home = {
      name: this.formHome.value.name,
      address: this.formHome.value.address,
      bed_room: this.formHome.value.bed_room,
      bath_room: this.formHome.value.bath_room,
      price: this.formHome.value.price,
      description: this.formHome.value.description,
      homestay_type: {
        id: this.formHome.value.homestay_type
      },
      city: {
        id: this.formHome.value.city
      },
      imageOfHomestays: this.selectedImages
    }
    this.homestayService.createHome(this.idAcc, home).subscribe(() => {
      this.toast.success({detail: "Success Message!", summary: "Tạo thành công!!", duration: 5000})
      this.formHome.reset()
      this.dialogRef.close()
    }, error => {
      console.log(error.summary)
      this.toast.error({detail: "Error Message!", summary: 'Create Failed, Please Try again', duration: 5000})
    })
  }
  getHomestayByAccId() {
    this.homestayService.getHomestayByAccountId(this.idAcc).subscribe((data) => {
      this.home = data;
      console.log(this.home)
    })
  }
}
