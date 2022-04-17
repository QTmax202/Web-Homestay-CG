import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-rate-comment',
  templateUrl: './rate-comment.component.html',
  styleUrls: ['./rate-comment.component.css']
})
export class RateCommentComponent implements OnInit {
  idHomestay!: number;
  homestay!: Homestay2;
  formRateComment : FormGroup = new FormGroup({});

  rating = 5;
  starCount = 5;
  ratingArr: boolean[] = []; // true = solid star; false = empty star

  snackBarDuration = 1000;
  response = [
    'You broke my heart!',
    'Really?',
    'We will do better next time.',
    'Glad you like it!',
    'Thank you so much!'
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private homestayService: Homestay2Service,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.ratingArr = Array(this.starCount).fill(false);
  }

  ngOnInit(): void {
    this.idHomestay = this.data;
    this.getHomestayById();
    this.formRateComment = this.fb.group({
      comment: ['', [Validators.required]],
    })
  }

  returnStar(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(i: number) {
    this.rating = i + 1;
    this.snackBar.open(this.response[i], '', {
      duration: this.snackBarDuration,
      panelClass: ['snack-bar']
    });
  }

  createRateComment() {
    console.log("1")
    const comment = {
      id: this.formRateComment.value.id,
      comment: this.formRateComment.value.comment,
      time_stamp: new Date(),
      homestay: {
        id: this.idHomestay
      },
      account: {
        id: localStorage.getItem('ACCOUNT_ID')
      }
    };
    console.log(this.rating)
    const rate = {
      id: this.formRateComment.value.id,
      value_rate: this.rating,
      time_stamp: new Date(),
      homestay: {
        id: this.idHomestay
      },
      account: {
        id: localStorage.getItem('ACCOUNT_ID')
      }
    };
    console.log(comment)
    console.log(rate)
  }

  getHomestayById() {
    this.homestayService.getHomestayById(this.idHomestay).subscribe((data) => {
      this.homestay = data;
    })
  }
}
