import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";
import {ImageOfHomestay} from "../../models/image-of-homestay";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-homestay',
  templateUrl: './homestay.component.html',
  styleUrls: ['./homestay.component.css']
})
export class HomestayComponent implements OnInit {
  displayedColumns: string[] = ['homestay1', 'homestay2', 'homestay3'];
  dataSource!: MatTableDataSource<any>;
  idH!: number;
  images!: ImageOfHomestay[];
  image!: ImageOfHomestay[];
  idAcc = localStorage.getItem('ACCOUNT_ID')
  formSearch: FormGroup = new FormGroup({});
  name!: string;
  idCity!: number;
  price1 !: number;
  price2 !: number;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  homestays!: Homestay2[];

  constructor(private fb: FormBuilder,
              private homestayService: Homestay2Service,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.price1 = 200000
    this.price2 = 15000000
    if (this.idAcc == null) {
      this.getAllHomestay();
    } else {
      this.getAllHomestaySignIn();
    }
    this.formSearch = this.fb.group({
      name: [''],
      idCity: ['', [Validators.required]],
      price1: [''],
      price2: ['']
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



  fetch1(value: any) {
    this.price1 = value;
  }

  fetch2(value: any) {
    this.price2 = value;
  }


  searchHomestay() {
    this.name = this.formSearch.value.name;
    this.idCity = this.formSearch.value.idCity
    if (this.price1 > this.price2) {
      if (this.idAcc == null) {
        this.homestayService.findHomestayByNameAndCityAndPrice(this.name, this.idCity, this.price2, this.price1).subscribe((data) => {
          this.homestays = data;
        }, error => {
          this.homestays = [];
        });
      } else if (this.idAcc != null) {
        this.homestayService.findHomestayByNameAndCityAndPriceSignIn(this.idAcc, this.name, this.idCity, this.price2, this.price1).subscribe((data) => {
          this.homestays = data;
        }, error => {
          this.homestays = [];
        });
      }
    } else if (this.price1 < this.price2) {
      if (this.idAcc == null) {
        this.homestayService.findHomestayByNameAndCityAndPrice(this.name, this.idCity, this.price1, this.price2).subscribe((data) => {
          this.homestays = data;
        }, error => {
          this.homestays = [];
        });
      } else if (this.idAcc != null) {
        this.homestayService.findHomestayByNameAndCityAndPriceSignIn(this.idAcc, this.name, this.idCity, this.price1, this.price2).subscribe((data) => {
          this.homestays = data;
        }, error => {
          this.homestays = [];
        });
      }
    }
  }
}
