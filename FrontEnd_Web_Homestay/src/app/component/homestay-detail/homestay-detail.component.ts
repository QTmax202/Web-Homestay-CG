import {Component, OnInit, ViewChild} from '@angular/core';
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CommentService} from "../../service/comment/comment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotifyComponent} from "../../dialog/notify/notify.component";
import {MatDialog} from "@angular/material/dialog";
import {BookHomestayComponent} from "../../dialog/book-homestay/book-homestay.component";
import {ImageOfHomestay} from "../../models/image-of-homestay";

@Component({
  selector: 'app-homestay-detail',
  templateUrl: './homestay-detail.component.html',
  styleUrls: ['./homestay-detail.component.css']
})
export class HomestayDetailComponent implements OnInit {

  idH!: number;
  homestays!: Homestay2[];
  homestay!: Homestay2;
  google_api! :string;
  images!: ImageOfHomestay[];

  formComment: FormGroup = new FormGroup({});
  comments?: any;

  displayedColumns: string[] = ['image'];
  dataSource!: MatTableDataSource<any>;

  idAcc = localStorage.getItem('ACCOUNT_ID')

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private homestayService: Homestay2Service,
              private commentService: CommentService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.formComment = this.fb.group({
      id: [""],
      comment: ["", [Validators.required]],
      time_stamp: [""],
      homestay: [""],
      account: {
        id: localStorage.getItem('ACCOUNT_ID')
      }
    })
    this.getHomestayById();
    this.getAllImage();
    this.getAllComment();
    if (this.idAcc == null) {
      this.getAllHomestay();
    } else {
      this.getAllHomestaySignIn();
    }
    console.log(localStorage.getItem('ACCOUNT_ID'))
  }

  getHomestayById() {
    this.idH = this.route.snapshot.params['id'];
    this.homestayService.getHomestayById(this.idH).subscribe((data) => {
      this.homestay = data;
      this.google_api = this.homestay.address +", "+ this.homestay.city.name;
      this.google_api = this.google_api?.split(" ").join("+");
      console.log(this.google_api);
      // @ts-ignore
      document.getElementById('google-api-maps').innerHTML = this.getGoogleApi(this.google_api);
    })
  }

  getAllImage() {
    this.idH = this.route.snapshot.params['id'];
    this.homestayService.findImageOfHomestaysByHomestay_Id(this.idH).subscribe((data) => {
      this.images = data;
      console.log(data);
    })
  }

  getAllComment() {
    this.idH = this.route.snapshot.params['id'];
    this.commentService.getCommentsByHomestayId(this.idH).subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.comments = data;
      this.dataSource.paginator = this.paginator;
      console.log(data)
      console.log("-----------")
      console.log(this.comments)
    })
  }

  createComment() {
    const comment = {
      id: this.formComment.value.id,
      comment: this.formComment.value.comment,
      time_stamp: new Date(),
      homestay: {
        id: this.idH
      },
      account: {
        id: localStorage.getItem('ACCOUNT_ID')
      }
    };
    console.log(comment);
    this.commentService.createComment(comment).subscribe(() => {
      console.log(comment);
      alert(comment);
      this.formComment.reset();
      this.getAllComment();
    })
  }

  getAllHomestay() {
    this.homestayService.getAllHomestay().subscribe((data) => {
      this.homestays = data;
    })
  }

  getAllHomestaySignIn() {
    this.homestayService.getAllHomestaySignIn(this.idAcc).subscribe((data) => {
      this.homestays = data;
    })
  }

  openBookHouse(homestay : any) {
    this.dialog.closeAll()
    this.dialog.open(BookHomestayComponent,{
      width: '45%',
      data : homestay
    });
  }

  getGoogleApi(address:any){
    console.log(address);
    return '<iframe\n' +
      '                  width="100%"\n' +
      '                  height="450"\n' +
      '                  frameborder="0" style="border:0"\n' +
      '                  referrerpolicy="no-referrer-when-downgrade"\n' +
      '                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDRgsm4D8UcW479Mj4malJdf92cl_sTLAI&q='+address+'&maptype=satellite&zoom=15"\n' +
      '                  allowfullscreen>\n' +
      '                </iframe>'
  }
}
