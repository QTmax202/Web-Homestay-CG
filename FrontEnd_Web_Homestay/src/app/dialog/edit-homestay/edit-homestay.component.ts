import {Component, Inject, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Homestay2} from "../../models/homestay2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {NgToastService} from "ng-angular-popup";
import {HomestayType} from "../../models/homestay-type";
import {City} from "../../models/city";

@Component({
  selector: 'app-edit-homestay',
  templateUrl: './edit-homestay.component.html',
  styleUrls: ['./edit-homestay.component.css']
})
export class EditHomestayComponent implements OnInit {

  public loading = false;
  imgs: any[] = [];
  fb: any;
  selectedImages: any[] = [];
  homestayTypes!: HomestayType[];
  cities!: City[];
  homestay!: Homestay2;
  idHomestay!: number;
  formHome: FormGroup = new FormGroup({
    name: new FormControl(),
        address: new FormControl(),
        bed_room: new FormControl(),
        bath_room: new FormControl(),
        price: new FormControl(),
        status: new FormControl(),
        description: new FormControl(),
        homestay_type: new FormControl(),
        account: new FormControl(),
        city: new FormControl()
  });

  constructor(private storage: AngularFireStorage,
              private homestayService: Homestay2Service,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast: NgToastService
  ) {
  }

  ngOnInit(): void {
    this.idHomestay = this.data;
    this.getHomestayById()
    this.getAllHomestayType()
    this.getAllCity()
    this.formHome = this.formBuilder.group({
      id:'',
      name:'',
      address: '',
      bed_room:'',
      bath_room:'',
      price:'',
      status: ['', [Validators.required]],
      description:'',
      homestay_type:'',
      city:'',
      imageOfHomestay:''
    })
  }
  getHomestay(idHomestay: number){
    this.homestayService.getHomestayById(idHomestay).subscribe(data =>{
      this.formHome = new FormGroup({
        name: new FormControl(data.name),
        address: new FormControl(data.address),
        bed_room: new FormControl(data.bed_room),
        bath_room: new FormControl(data.bath_room),
        price: new FormControl(data.price),
        status: new FormControl(data.status),
        description: new FormControl(data.description),
        homestay_type: new FormControl(data.homestay_type.id),
        account: new FormControl(data.account.id),
        city: new FormControl(data.city.id)
      })
    })
  }
  editStatusHomestay(idHomestay: number) {
    const statusHomestay = this.formHome.value
    this.homestayService.editHome(idHomestay, statusHomestay).subscribe(()=> {
      this.toast.success({detail:'SuccessMessage', summary:'Cập nhật thành công!', duration: 5000})
    })
      // id: this.homestay.id,
      // name: this.homestay.name,
      // address: this.homestay.address,
      // bed_room: this.homestay.bed_room,
      // bath_room: this.homestay.bath_room,
      // price: this.homestay.price,
      // status: this.formHome.value.status,
      // description: this.homestay.description,
      // homestay_type: {
      //   id: this.homestay.homestay_type.id,
      // },
      // account: {
      //   id: this.homestay.account.id,
      // },
      // city: {
      //   id: this.homestay.city.id,
      //
      // },



  }

  getHomestayById() {
    this.homestayService.getHomestayById(this.idHomestay).subscribe((data) => {
      this.homestay = data;
      console.log(this.homestay)
    })
  }

  getAllHomestayType() {
    this.homestayService.getAllType().subscribe(data => {
      this.homestayTypes = data;
    })
  }

  getAllCity() {
    this.homestayService.getAllCity().subscribe(data => {
      this.cities = data
    })
  }

  showPreview(event: any) {
    this.loading = true;
    let newSelectedImages = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      newSelectedImages = event.target.files;
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedImages.push(event.target.files[i]);
      }
    } else {
      this.selectedImages = [];
    }
    if (newSelectedImages.length !== 0) {
      for (let i = 0; i < newSelectedImages.length; i++) {
        let selectedImage = newSelectedImages[i];
        var n = Date.now();
        const filePath = `Homestay_Images/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgs.push(url);
              if (this.imgs.length == newSelectedImages.length) {
                this.loading = false;
              }
            });
          })
        ).
        subscribe(url => {
          if (url) {
            console.log(url)
          }
        });
      }
    }

  }

}
