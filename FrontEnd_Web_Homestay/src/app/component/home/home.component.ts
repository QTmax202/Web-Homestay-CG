import { Component, OnInit } from '@angular/core';
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homestays!: Homestay2[];
  idAcc = localStorage.getItem('ACCOUNT_ID')

  constructor(private homestayService: Homestay2Service,
              ) { }

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
      console.log(this.homestays)
    })
  }

  getAllHomestaySignIn() {
    this.homestayService.getAllHomestaySignIn(this.idAcc).subscribe((data) => {
      this.homestays = data;
      console.log(this.homestays)
    })
  }
}
