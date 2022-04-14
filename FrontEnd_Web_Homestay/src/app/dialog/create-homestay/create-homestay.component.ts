import {Component, Inject, OnInit} from '@angular/core';
import {Homestay} from "../../models/homestay";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomestayService} from "../../service/homestay.service";
import {ActivatedRoute} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {AuthenticationService} from "../../service/authentication.service";
import {Account} from "../../models/account";
import {HomestayType} from "../../models/homestay-type";
import {log} from "util";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {City} from "../../models/city";
import {HomestayComponent} from "../../component/homestay/homestay.component";

@Component({
  selector: 'app-create-homestay',
  templateUrl: './create-homestay.component.html',
  styleUrls: ['./create-homestay.component.css']
})
export class CreateHomestayComponent implements OnInit {
  formHome: FormGroup = new FormGroup({})
  currentUser?: Account;
  myItem: File[] = [];
  hasRoleUser = false;
  hasRoleAdmin = false;
  homestayTypes!: HomestayType[];
  cities!: City[];
  idUser: any;
  idHost?: string;
  home!: Homestay;
  actionBtn: string = "tạo"


  constructor(private homestayService: HomestayService,
              private route: ActivatedRoute,
              private toast: NgToastService,
              private authenticationService: AuthenticationService,
              private formGroup: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<HomestayComponent>) {}




  ngOnInit(): void {
    this.getAllHomestayType()
    this.getAllCity()
    this.formHome = this.formGroup.group({
      name:['', [Validators.required]],
      address:['',[Validators.required]],
      bed_room:'',
      bath_room:'',
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      homestay_type: '',
      city: ''
    })
    console.log(this.formHome)
    if (this.editData) {
      this.actionBtn = "Cập nhật";
      this.formHome.controls['name'].setValue(this.editData.name);
      this.formHome.controls['address'].setValue(this.editData.address);
      this.formHome.controls['bed_room'].setValue(this.editData.bed_room);
      this.formHome.controls['bath_room'].setValue(this.editData.bath_room);
      this.formHome.controls['price'].setValue(this.editData.bath_room);
      this.formHome.controls['homestay_type'].setValue(this.editData.homestay_type_id.id);
      this.formHome.controls['city'].setValue(this.editData.city_id.id);
    }
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
    }
    console.log(home)
    this.homestayService.createHome(home).subscribe(() => {
      this.toast.success({detail:"Success Message!", summary:"Create Successfully!", duration: 5000})
      this.formHome.reset()
      this.dialogRef.close()
    }, error => {
      console.log(error.summary)
      this.toast.error({detail: "Error Message!", summary:'Create Failed, Please Try again', duration: 5000})
    })
  }
}
