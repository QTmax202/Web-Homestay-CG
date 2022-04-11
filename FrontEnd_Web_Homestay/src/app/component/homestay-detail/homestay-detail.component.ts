import { Component, OnInit } from '@angular/core';
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-homestay-detail',
  templateUrl: './homestay-detail.component.html',
  styleUrls: ['./homestay-detail.component.css']
})
export class HomestayDetailComponent implements OnInit {

  idH!: number;
  homestays!: Homestay2[];
  homestay!: Homestay2;

  displayedColumns: string[] = ['image', 'content'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private homestayService: Homestay2Service,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.idH = this.route.snapshot.params['id'];
    this.homestayService.getHomestayById(this.idH).subscribe((data) => {
      this.homestay = data;
      console.log(data);
      console.log("------------")
      console.log(this.homestay)
    })
    this.getAllHomestay();
  }

  getAllHomestay() {
    this.homestayService.getAllHomestay().subscribe((data) => {
      this.homestays = data;
      console.log(data);
      console.log("--------------");
      console.log(this.homestays);
    })
  }
}
