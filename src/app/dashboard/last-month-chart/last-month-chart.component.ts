import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import Chart from "chart.js/auto";
import {StatsService} from "../../service/stats.service";

@Component({
  selector: 'app-last-month-chart',
  templateUrl: './last-month-chart.component.html',
  styleUrls: ['./last-month-chart.component.css']
})
export class LastMonthChartComponent implements OnChanges, OnInit{

  @Input() startDateMonth: string;
  @Input() endDateMonth: string;

  labelsArray: string[] = [];
  incomesArray: number[] =[];
  expenseArray: number[] = [];

  chartMonthlyIncomeExpense: any;



  constructor(private statsService: StatsService) {
    // this.lastMonthDate();
    // this.constructDataIncome(this.startDateMonth, this.endDateMonth);
    // this.createChartIncomeExpense();
  }
  ngOnInit(): void {
    this.createChartIncomeExpense();

  }
  ngOnChanges({startDateMonth: dateStart, endDateMonth: endDate }: SimpleChanges): void {
    this.labelsArray.length = 0;
    this.expenseArray.length = 0;
    this.incomesArray.length = 0;
    this.constructDataExpense(dateStart, endDate);
    this.constructDataIncome(dateStart, endDate);
    this.createChartIncomeExpense();
  }

  // lastMonthDate() {
  //   this.startDateMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString()
  //   this.endDateMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 32).toISOString()
  // }

  constructDataIncome(dateStart: SimpleChange, endDate: SimpleChange){
    this.statsService.getAmountsByTagsByIncome(dateStart.currentValue, endDate.currentValue).subscribe(value => {
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

  constructDataExpense(dateStart: SimpleChange, endDate: SimpleChange){
    this.statsService.getAmountsByTagsByExpense(dateStart.currentValue, endDate.currentValue).subscribe(value => {
        Object.entries(value).forEach(([k,v]) => {
          // this.labelsArray.push(k);
          if (typeof v === "number") {
            this.expenseArray.push(v);
          }
        })
        this.chartMonthlyIncomeExpense.update();
      }
    )
  }



  createChartIncomeExpense(){

    this.chartMonthlyIncomeExpense = new Chart("MonthChart", {
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



}
