import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";
import {ImageOfHomestay} from "../../models/image-of-homestay";

@Component({
  selector: 'app-homestay',
  templateUrl: './homestay.component.html',
  styleUrls: ['./homestay.component.css']
})
export class HomestayComponent implements OnInit {
  displayedColumns: string[] = ['homestay1','homestay2','homestay3'];
  dataSource!: MatTableDataSource<any>;
  idH!: number;
  images!: ImageOfHomestay[];
  image!: ImageOfHomestay[];
  idAcc = localStorage.getItem('ACCOUNT_ID')



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  homestays!: Homestay2[];

  constructor(private fb: FormBuilder,
              private homestayService: Homestay2Service,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    if (this.idAcc == null) {
      this.getAllHomestay();
    } else {
      this.getAllHomestaySignIn();
    }
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
}
