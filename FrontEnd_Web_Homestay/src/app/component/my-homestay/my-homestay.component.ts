import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInComponent} from "../../dialog/sign-in/sign-in.component";
import {CreateHomestayComponent} from "../../dialog/create-homestay/create-homestay.component";
import {MatDialog} from "@angular/material/dialog";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {Homestay2} from "../../models/homestay2";
import {MyHomestayDto} from "../../models/my-homestay-dto";
import {YourBillDto} from "../../models/your-bill-dto";
import {EditHomestayComponent} from "../../dialog/edit-homestay/edit-homestay.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {newArray} from "@angular/compiler/src/util";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {BillService} from "../../service/bill/bill.service";
import {TurnOver} from "../../models/turn-over";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-my-homestay',
  templateUrl: './my-homestay.component.html',
  styleUrls: ['./my-homestay.component.css']
})
export class MyHomestayComponent implements OnInit {

  displayedColumns: string[] = ['name', 'countPrice', 'sumPrice'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formTurnOver: FormGroup = new FormGroup({});

  idAcc = localStorage.getItem('ACCOUNT_ID')
  homestays!: MyHomestayDto[];
  yourBill!: YourBillDto[];
  input: any;
  startDate1!: string;
  startDate2!: string;
  turnOver!: TurnOver[];
  totalTurnOver = 0;

  constructor(private dialog: MatDialog,
              private homestayService: Homestay2Service,
              private billService: BillService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getHomestayByAccountId()
    this.getBillByAccountId()
    this.formTurnOver = this.fb.group({
      startDate1: [''],
      startDate2: [''],
    })
    this.findTurnOverByAccountAndStartDate();
  }

  findTurnOverByAccountAndStartDate() {
    if (this.startDate1 == null) {
      this.startDate1 = "2000-01-01"
    } else {
      this.startDate1 = this.formTurnOver.value.startDate1
    }
    if (this.startDate2 == null) {
      this.startDate2 = "2050-01-01"
    } else {
      this.startDate2 = this.formTurnOver.value.startDate2
    }
    this.billService.findTurnOverByAccountAndStartDate(this.idAcc,this.startDate1, this.startDate2).subscribe((data) => {
      this.turnOver = data;
      this.totalTurnOver = 0;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      for (let i = 0; i < this.turnOver.length; i++) {
        this.totalTurnOver += this.turnOver[i].sumPrice;
      }
    })
  }

  getHomestayByAccountId() {
    this.homestayService.getHomestayByAccountId(this.idAcc).subscribe((data) => {
      this.homestays = data;
    })
  }

  getBillByAccountId() {
    this.homestayService.getYourBillByAccountId(this.idAcc).subscribe((data) => {
      this.yourBill = data;
    })
  }

  openCreateHome() {
    this.dialog.closeAll();
    this.dialog.open(CreateHomestayComponent, {
      width: '50%',
    });
  }

  openMyHomestay() {
    // @ts-ignore
    document.getElementById("my-homestay").style.display = 'block';
    // @ts-ignore
    document.getElementById("my-bill").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-turn-over").style.display = 'none';
  }

  openMyBill() {
    // @ts-ignore
    document.getElementById("my-homestay").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-bill").style.display = 'block';
    // @ts-ignore
    document.getElementById("my-turn-over").style.display = 'none';
  }

  openTurnOver() {
    // @ts-ignore
    document.getElementById("my-homestay").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-bill").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-turn-over").style.display = 'block';
  }

  openEditStatus(idHomestayDetail: any) {
    this.dialog.closeAll();
    this.dialog.open(EditHomestayComponent, {
      width: '50%',
      data: idHomestayDetail
    });
  }


}
