import {Component, OnInit} from '@angular/core';
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {ActivatedRoute, Router} from "@angular/router";
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
  topHomestayDTOS!: MyHomestayDto[];
  homestayDTOS!: MyHomestayDto[];
  idAcc = localStorage.getItem('ACCOUNT_ID')
  city1!: CityDto[];
  city2!: CityDto[];
  city3!: CityDto[];


  constructor(private homestayService: Homestay2Service,
              private router: Router,
              private cityService: CityService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCity1()
    this.getCity2()
    this.getCity3()
    this.getTop5Homestay()
    if (this.idAcc == null) {
      this.getAllHomestayRate();
    } else {
      this.getAllYourHomestayRate();
    }
  }

  getTop5Homestay() {
    this.homestayService.getTop5Homestay().subscribe((data) => {
      this.topHomestayDTOS = data;
    })
  }

  getAllHomestayRate() {
    this.homestayService.getAllHomestayRate().subscribe((data) => {
      this.homestayDTOS = data;
    })
  }

  getAllYourHomestayRate() {
    this.homestayService.getAllYourHomestayRate(this.idAcc).subscribe((data) => {
      this.homestayDTOS = data;
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



  redirectByCityId(id: any) {
    this.router.navigateByUrl('/homestay', {state: {id}})
  }

  redirectByHomestay(id: any) {
    this.router.navigateByUrl('/homestay-detail/' + id, {state: {id}})
  }
}
