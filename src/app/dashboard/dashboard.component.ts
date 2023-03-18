import {AfterContentInit, Component, OnInit} from '@angular/core';
import {StatsService} from "../service/stats.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showLastMonths: number = 12;
  incomeSum: number;
  expenseSum: number;
  lastYearProfit: number;
  startDateYear: string;
  endDateYear:string;
  startDateMonth: string;
  endDateMonth:string;
  labelsArray: string[] = [];
  incomesArray: number[] = [];
  expenseArray: number[] = [];
  incomesMap: any = new Map<string, number>;
  expensesMap: any = new Map<string, number>;
  public chartMonthlyIncomeExpense: any;
  public chartMonth: any;
  lastMonthProfit: any;
  firstEntry:number;
  yearsArray: any[] = [];
  months:number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  actualYear:any;
  constructor(private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.actualYearDate();
    this.lastMonthDate(0);
    this.getAmountsYear(this.startDateYear, this.endDateYear);
    this.getAmountsMonth(this.startDateMonth, this.endDateMonth);
    this.constructDataIncome(this.showLastMonths);
    this.constructDataExpense(this.showLastMonths);
    this.firstEntryDate();
    this.generateYearsArray();
    this.actualYear = new Date().getFullYear()
  }

  firstEntryDate(){
    this.statsService.getFirstEntryDate().subscribe(
      value => this.firstEntry = value.toString().slice(0,4)
    )
  }

  generateYearsArray(){
    this.statsService.getYears().subscribe( years =>{
      this.yearsArray.push(years)
    })
  }
  activeYearDate(year: number){
    this.actualYear = year;
  }
  actualYearDate(){
    this.startDateYear = new Date(new Date().getFullYear(), 0, 1).toISOString()
    this.endDateYear = new Date(new Date().getFullYear(), 11, 32).toISOString()
  }
  lastMonthDate(minusMonths: number){
    this.startDateMonth = new Date(new Date().getFullYear(), new Date().getMonth()-minusMonths, 1).toISOString()
    this.endDateMonth = new Date(new Date().getFullYear(), new Date().getMonth()-minusMonths, 32).toISOString()
  }
  generateDate(year:number, month: number){
    this.startDateMonth = new Date(year, month-1, 1).toISOString()
    this.endDateMonth = new Date(year, month-1, 32).toISOString()
  }

  getAmountsYear(startDate: string, endDate: string){
    this.statsService.getAmountIncome(startDate, endDate).subscribe(
      value => {
        this.incomeSum = value;
        this.lastYearProfit = value;
      }
    );
    this.statsService.getAmountExpense(startDate, endDate).subscribe(
      value => {this.expenseSum = value
      this.lastYearProfit = this.lastYearProfit - value}
    )
  }

  getAmountsMonth(startDate: string, endDate: string){
    this.statsService.getAmountIncome(startDate, endDate).subscribe(
      value => {
        this.lastMonthProfit = value;
      }
    );
    this.statsService.getAmountExpense(startDate, endDate).subscribe(
      value => {
        this.lastMonthProfit = this.lastMonthProfit - value;
      }
    )
  }

  constructDataIncome(number: number){
      this.statsService.getAmountByMonthsIncome(number).subscribe(value => {
        this.incomesMap = new Map<string, number>(Object.entries((value)))
        Object.entries(value).forEach(([k,v]) => {
          this.labelsArray.push(k);
          if (typeof v === "number") {
            this.incomesArray.push(v);
          }
        })
        this.chartMonthlyIncomeExpense.update();
      }
      )
    }
  constructDataExpense(number: number){
    this.statsService.getAmountByMonthsExpense(number).subscribe(value => {
        this.expensesMap = new Map<string, number>(Object.entries((value)))
        Object.entries(value).forEach(([k,v]) => {

          if (typeof v === "number") {
            this.expenseArray.push(v);
          }
        })
      this.chartMonthlyIncomeExpense.update();
      }
    )
  }

  changeNumberOfMonth(numbProvided: number) {
    this.showLastMonths = numbProvided;
  }


}
