import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StatsService} from "../service/stats.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterContentInit{
  longText: any = "teasdfasdfasdfasdf asdfasdfa";

  incomeSum: number;
  expenseSum: number;
  startDate: string;
  endDate:string;
  labelsArray: string[] = [];
  incomesArray: number[] = [];
  test: any = new Map<string, number>;

  constructor(private statsService: StatsService) {
    this.actualYearDate();
    this.getSumIncomeAmount(this.startDate, this.endDate);
    this.constructDataIncome()
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {


  }
  ngAfterContentInit(): void {


  }


  actualYearDate(){
    this.startDate = new Date(new Date().getFullYear(), 0, 1).toISOString()
    this.endDate = new Date(new Date().getFullYear(), 11, 32).toISOString()
  }

  getSumIncomeAmount(startDate: string, endDate: string){
    this.statsService.getAmount(startDate, endDate).subscribe(
      value => {this.incomeSum = value}
    ) }


    constructDataIncome(){
      this.statsService.getAmountByMonths(12).subscribe(value => {
        this.test = new Map<string, number>(Object.entries((value)))


      }
    )}

  subtractMonths(date: Date, months: number){
    const dateCopy = new Date(date);
    dateCopy.setMonth(dateCopy.getMonth()-months);
    return dateCopy;
  }



}
