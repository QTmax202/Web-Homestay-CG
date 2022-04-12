import { Component, OnInit } from '@angular/core';
import {ChangePassComponent} from "../../dialog/change-pass/change-pass.component";
import {MatDialog} from "@angular/material/dialog";
import {RateCommentComponent} from "../../dialog/rate-comment/rate-comment.component";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openRate() {
    this.dialog.closeAll()
    this.dialog.open(RateCommentComponent, {
      width: '50%',
    });
  }
}
