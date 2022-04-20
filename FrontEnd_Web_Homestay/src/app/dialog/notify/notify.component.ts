import {Component, OnInit, ViewChild} from '@angular/core';
import {RateCommentComponent} from "../rate-comment/rate-comment.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../confirm/confirm.component";
import {ConfirmBookComponent} from "../confirm-book/confirm-book.component";
import {NotifyService} from "../../service/notify/notify.service";
import {Notify} from "../../models/notify";
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  idAcc = parseInt(<string>localStorage.getItem('ACCOUNT_ID'))
  notifies!: Notify[];
  input: any;

  displayedColumns: string[] = ['id'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,
              private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.getNotifyByAccountDesc();
  }

  getNotifyByAccountDesc() {
    this.notifyService.getNotifyByAccountDesc(this.idAcc).subscribe((data) => {
      this.notifies = data;
      console.log(this.notifies)
      this.dataSource = new MatTableDataSource<any>(data)
      this.dataSource.paginator = this.paginator;
    })
  }

  editNotify(id: any) {
    this.notifyService.editNotify(id).subscribe((data) => {
      this.getNotifyByAccountDesc();
      console.log(data);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
