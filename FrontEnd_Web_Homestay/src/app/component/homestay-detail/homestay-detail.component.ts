import {Component, OnInit, ViewChild} from '@angular/core';
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CommentService} from "../../service/comment/comment.service";

@Component({
  selector: 'app-homestay-detail',
  templateUrl: './homestay-detail.component.html',
  styleUrls: ['./homestay-detail.component.css']
})
export class HomestayDetailComponent implements OnInit {

  idH!: number;
  homestays!: Homestay2[];
  homestay!: Homestay2;
  comments!: any;

  displayedColumns: string[] = ['image'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private homestayService: Homestay2Service,
              private commentService: CommentService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.idH = this.route.snapshot.params['id'];
    this.homestayService.getHomestayById(this.idH).subscribe((data) => {
      this.homestay = data;
    })
    this.commentService.getCommentsByHomestayId(this.idH).subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.comments = data;
      this.dataSource.paginator = this.paginator;
      console.log(data)
      console.log("-----------")
      console.log(this.comments)
    })
    this.getAllHomestay();
  }

  getAllHomestay() {
    this.homestayService.getAllHomestay().subscribe((data) => {
      this.homestays = data;
    })
  }
}
