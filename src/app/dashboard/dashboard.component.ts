import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StatsService} from "../service/stats.service";
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, AfterContentInit {

  showLastMonths: number = 12;
  incomeSum: number;
  expenseSum: number;
  lastYearProfit: number;
  startDate: string;
  endDate:string;
  labelsArray: string[] = [];
  incomesArray: number[] = [];
  expenseArray: number[] = [];
  incomesMap: any = new Map<string, number>;
  expensesMap: any = new Map<string, number>;
  public chartMonthlyIncomeExpense: any;
  public chartMonth: any;

  constructor(private statsService: StatsService) {

  }

  ngOnInit(): void {
    this.actualYearDate();
    this.geAmounts(this.startDate, this.endDate);
    // this.getSumExpenseAmount(this.startDate, this.endDate);
    this.constructDataIncome(this.showLastMonths);
    this.constructDataExpense(this.showLastMonths);
  }
  ngAfterViewInit(): void {
    this.createChartIncomeExpense();
    this.createChartIncomeExpenseMonthly()
  }

  ngAfterContentInit(): void {
  }

  actualYearDate(){
    this.startDate = new Date(new Date().getFullYear(), 0, 1).toISOString()
    this.endDate = new Date(new Date().getFullYear(), 11, 32).toISOString()
  }

  geAmounts(startDate: string, endDate: string){
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


  createChartIncomeExpense(){

    this.chartMonthlyIncomeExpense = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: this.labelsArray,
        datasets: [
          {
            label: "Income",
            data: this.incomesArray,
            backgroundColor: 'blue'
          },
          {
            label: "Expense",
            data: this.expenseArray,
            backgroundColor: 'red'
          },

        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  createChartIncomeExpenseMonthly(){

    this.chartMonth = new Chart("MyChart1", {
      type: 'bar',

      data: {
        labels: this.labelsArray,
        datasets: [
          {
            label: "Income",
            data: this.incomesArray,
            backgroundColor: 'blue'
          },
          {
            label: "Expense",
            data: this.expenseArray,
            backgroundColor: 'red'
          },

        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  subtractMonths(date: Date, months: number){
    const dateCopy = new Date(date);
    dateCopy.setMonth(dateCopy.getMonth()-months);
    return dateCopy;
  }



}
