import {Component, OnInit} from '@angular/core';
import {finalize, Subscription} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HomestayService} from "../../service/homestay.service";
import {HomestayType} from "../../models/homestay-type";
import {City} from "../../models/city";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay} from "../../models/homestay";
import {Homestay2} from "../../models/homestay2";
import {MatDialogRef} from "@angular/material/dialog";
import {HomestayComponent} from "../../component/homestay/homestay.component";

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
  id?: number;
  formHome: FormGroup = new FormGroup({});
  sub!: Subscription;
  home: Homestay2 = {};

  constructor(private storage: AngularFireStorage,
              private homestayService: Homestay2Service,
              private toast: NgToastService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<HomestayComponent>) {
    this.sub = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      this.homestayService.getHomestayById(this.id).subscribe(data => {
        console.log(data);
        this.home.id = data.id;
        this.home.name = data.name;
        this.home.address = data.address;
        this.home.bed_room = data.bed_room;
        this.home.bath_room = data.bath_room;
        this.home.description = data.description;
        this.home.homestay_type = data.homestay_type.id;
        this.home.city = data.city.id;
        this.home.imageOfHomestays = data.imageOfHomestays.id
      })
    })
  }

  ngOnInit(): void {

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

  ngSubmit() {
    this.homestayService.editHome(this.home.id, this.home).subscribe(data1 => {
      console.log(data1)
      this.toast.success({detail: 'Success Message', summary: "Update Successfully!", duration: 5000});
      this.dialogRef.close();
    })
  }
}
