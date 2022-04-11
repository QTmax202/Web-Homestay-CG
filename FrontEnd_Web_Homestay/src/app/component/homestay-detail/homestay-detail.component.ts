import {Component, OnInit, ViewChild} from '@angular/core';
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CommentService} from "../../service/comment/comment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formComment = this.fb.group({
      id: [""],
      comment: ["", [Validators.required]],
      time_stamp: [""],
      homestay: [""],
      account: {
        id: [""],
      }
    })
    this.getHomestayById();
    this.getAllComment();
    this.getAllHomestay();
    console.log(JSON.parse(<any>localStorage.getItem("currentAccount")).id)
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
      id: 8,
      comment: this.formComment.value.comment,
      time_stamp: new Date(),
      homestay: this.idH,
      account: {
        id: JSON.parse(<any>localStorage.getItem("currentAccount")).id
      }
    };
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
}
