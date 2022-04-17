import {Component, OnInit} from '@angular/core';
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {Router} from "@angular/router";
import {CityService} from "../../service/city/city.service";
import {CityDto} from "../../models/city-dto";
import {MyHomestayDto} from "../../models/my-homestay-dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homestays!: Homestay2[];
  homestayDTOS!: MyHomestayDto[];
  idAcc = localStorage.getItem('ACCOUNT_ID')
  city1!: CityDto[];
  city2!: CityDto[];
  city3!: CityDto[];

  constructor(private homestayService: Homestay2Service,
              private router: Router,
              private cityService: CityService) {
  }

  ngOnInit(): void {
    this.getCity1()
    this.getCity2()
    this.getCity3()
    this.getTop5Homestay()
    if (this.idAcc == null) {
      this.getAllHomestay();
    } else {
      this.getAllHomestaySignIn();
    }
  }

  getTop5Homestay() {
    this.homestayService.getTop5Homestay().subscribe((data) => {
      this.homestayDTOS = data;
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

  getCity1() {
    this.cityService.getCityTop1().subscribe((data) => {
      this.city1 = data;
    })
  }

  getCity2() {
    this.cityService.getCityTop2().subscribe((data) => {
      this.city2 = data;
    })
  }

  getCity3() {
    this.cityService.getCityTop3().subscribe((data) => {
      this.city3 = data;
    })
  }
}
