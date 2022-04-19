import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentService} from "../../service/comment/comment.service";

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
    'Bạn đã làm tan nát trái tim tôi! :(',
    'Thật sao? :|',
    'Chúng tôi sẽ làm tốt hơn vào lần tới. :3',
    'Hạnh phúc vì bạn thích nó! :)',
    'Cảm ơn bạn rất nhiều! <3'
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private homestayService: Homestay2Service,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private commentService: CommentService,
              private dialog: MatDialog) {
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
    this.commentService.createComment(comment).subscribe(() => {
    })
    this.commentService.createRate(rate).subscribe(() => {
      this.formRateComment.reset();
      this.dialog.closeAll();

    })
  }

  getHomestayById() {
    this.homestayService.getHomestayById(this.idHomestay).subscribe((data) => {
      this.homestay = data;
    })
  }
}
