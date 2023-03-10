import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import Chart from "chart.js/auto";
import {StatsService} from "../../service/stats.service";

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent implements OnChanges{

  @Input() showLastMonths: number;

  public chartMonthlyIncomeExpense: any;
  labelsArray: string[] = [];
  incomesArray: number[] =[];
  expenseArray: number[] = [];

  constructor(private statsService: StatsService) {
  }
  ngOnChanges({showLastMonths: showLastMonths1}: SimpleChanges): void {
    this.labelsArray.length = 0;
    this.expenseArray.length = 0;
    this.incomesArray.length = 0;
    this.constructDataExpense(showLastMonths1);
    this.constructDataIncome(showLastMonths1);
    this.createChartIncomeExpense();
    // console.log(this.labelsArray)
  }

  constructDataIncome(number: SimpleChange){
    this.statsService.getAmountByMonthsIncome(number.currentValue).subscribe(value => {
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

  constructDataExpense(number: SimpleChange){
    this.statsService.getAmountByMonthsExpense(number.currentValue).subscribe(value => {
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

    this.chartMonthlyIncomeExpense = new Chart("MonthlyChart", {
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
