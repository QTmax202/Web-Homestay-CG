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

@Component({
  selector: 'app-homestay-detail',
  templateUrl: './homestay-detail.component.html',
  styleUrls: ['./homestay-detail.component.css']
})
export class HomestayDetailComponent implements OnInit {

  idH!: number;
  homestays!: Homestay2[];
  homestay!: Homestay2;

  formComment: FormGroup = new FormGroup({});
  comments?: any;

  displayedColumns: string[] = ['image'];
  dataSource!: MatTableDataSource<any>;

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
    this.getAllComment();
    this.getAllHomestay();
    console.log(localStorage.getItem('ACCOUNT_ID'))
  }

  getHomestayById() {
    this.idH = this.route.snapshot.params['id'];
    this.homestayService.getHomestayById(this.idH).subscribe((data) => {
      this.homestay = data;
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

  openBookHouse() {
    this.dialog.closeAll()
    this.dialog.open(BookHomestayComponent, {
      width: '50%',
    });
  }
}
