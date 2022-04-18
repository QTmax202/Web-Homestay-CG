import {Component, Inject, OnInit} from '@angular/core';
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MyHomestayDto} from "../../models/my-homestay-dto";
import {Homestay2} from "../../models/homestay2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-homestay',
  templateUrl: './edit-homestay.component.html',
  styleUrls: ['./edit-homestay.component.css']
})
export class EditHomestayComponent implements OnInit {

  public loading = false;
  imgs: any[] = [];
  fb : any;
  selectedImages: any[] = [];

  homestay!: Homestay2;
  idHomestay!: number;
  formStatus: FormGroup = new FormGroup({});

  constructor(private storage: AngularFireStorage,
              private homestayService: Homestay2Service,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.idHomestay = this.data;
    this.getHomestayById()
    this.formStatus = this.formBuilder.group({
      status: ['', [Validators.required]],
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
    }
    console.log(statusHomestay)
    this.homestayService.createHomestay(statusHomestay).subscribe(() => {
      this.dialog.closeAll();
    })
  }

  getHomestayById() {
    this.homestayService.getHomestayById(this.idHomestay).subscribe((data) => {
      this.homestay = data;
      console.log(this.homestay)
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
        ).subscribe(() => {
        });
      }
    }

  }


}
