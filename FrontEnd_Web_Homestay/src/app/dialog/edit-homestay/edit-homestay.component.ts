import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MyHomestayDto} from "../../models/my-homestay-dto";
import {Homestay2} from "../../models/homestay2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-edit-homestay',
  templateUrl: './edit-homestay.component.html',
  styleUrls: ['./edit-homestay.component.css']
})
export class EditHomestayComponent implements OnInit {

  selectedImages: any[] = [];
  homestay!: Homestay2;
  idHomestay!: number;
  formStatus: FormGroup = new FormGroup({});

  constructor(private storage: AngularFireStorage,
              private homestayService: Homestay2Service,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast: NgToastService) { }

  ngOnInit(): void {
    this.idHomestay = this.data;
    this.getHomestayById()
    this.formStatus = this.formBuilder.group({
      status: ['', [Validators.required]],
      imageOfHomestays:'',
    })

  }

  editStatusHomestay() {
    const statusHomestay = {
      id: this.homestay.id,
      name: this.homestay.name,
      address: this.homestay.address,
      bed_room: this.homestay.bed_room,
      bath_room: this.homestay.bath_room,
      price: this.homestay.price,
      status: this.formStatus.value.status,
      description: this.homestay.description,
      homestay_type: {
        id: this.homestay.homestay_type.id,
      },
      account: {
        id:  this.homestay.account.id,
      },
      city: {
        id: this.homestay.city.id
      },
      imageOfHomestays: this.selectedImages,
    }
    console.log(statusHomestay)
    this.homestayService.createHomestay(statusHomestay).subscribe(() => {
      this.toast.success({detail:'SuccessMessage', summary:'Cập nhật thành công', duration: 5000})
      this.dialog.closeAll();
    })
  }

  getHomestayById() {
    this.homestayService.getHomestayById(this.idHomestay).subscribe((data) => {
      this.homestay = data;
      console.log(this.homestay)
    })
  }
}
