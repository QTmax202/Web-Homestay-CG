import { Component, OnInit } from '@angular/core';
import {City} from "../../models/city";
import {CityService} from "../../service/city/city.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities!: City[];

  constructor( private cityService: CityService) { }

  ngOnInit(): void {
    this.getAllCity()
  }
  getAllCity(){
    this.cityService.getAll().subscribe((database)=>{
      this.cities = database;
      console.log(this.cities)
    })
  }

}
