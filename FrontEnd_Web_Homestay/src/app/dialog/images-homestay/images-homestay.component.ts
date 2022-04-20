import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {finalize, first} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Homestay2} from "../../models/homestay2";
import {ImageOfHomestay} from "../../models/image-of-homestay";
import {ImagesHomestayService} from "../../service/images/images-homestay.service";

@Component({
  selector: 'app-images-homestay',
  templateUrl: './images-homestay.component.html',
  styleUrls: ['./images-homestay.component.css']
})
export class ImagesHomestayComponent implements OnInit {

  public loading = false;
  fb: any;
  selectedImages: any[] = [];
  imgs: any[] = [];
  @ViewChild('uploadFile', {static: true}) public imageDom: ElementRef | undefined
  homestay!: Homestay2;
  images_homestay!: ImageOfHomestay[];

  hidden = true;

  constructor(private storage: AngularFireStorage,
              private homestayService: Homestay2Service,
              private imagesHomestay: ImagesHomestayService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.getHomestayById(this.data);
    this.getImagesOfHomestay(this.data);
  }

  getHomestayById(id: any) {
    this.homestayService.getHomestayById(id).subscribe((data) => {
      this.homestay = data;
    })
  }

  getImagesOfHomestay(id: any) {
    this.imagesHomestay.get_images_of_homestay(id).subscribe((data) => {
      this.images_homestay = data;
    })
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
      console.log(this.selectedImages);
    } else {
      this.selectedImages = [];
    }
    this.uploadImageFirebase();
  }

  uploadImageFirebase() {
    if (this.selectedImages.length !== 0) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        let selectedImage = this.selectedImages[i];
        var n = this.selectedImages[i].name;
        const filePath = `Homestay_Images/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgs.push(url)
              console.log(this.imgs);
            });
          })
        ).subscribe(url => {
          if (url) {
            console.log(url)
          }
        });
      }
    }
  }

  uploadImagesHomestay(id: any) {
    for (let i of this.imgs) {
      const images = {
        images: i,
        homestay: this.homestay,
      }
      this.imagesHomestay.save_image(images).pipe(first())
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log('error_images_homestay');
          });
    }
    window.location.reload();
    this.dialog.closeAll();
  }

  clickDeleteImage(id : any){
    this.imagesHomestay.deleteImageHomestay(id).subscribe((data) =>{
      console.log("data");
      this.imagesHomestay.get_images_of_homestay(this.data).subscribe((data) => {
        this.images_homestay = data;
      })
      },error => {
      console.log("error delete!")
    })
  }
}
