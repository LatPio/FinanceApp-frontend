import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import Chart from "chart.js/auto";
import {StatsService} from "../../service/stats.service";




@Component({
  selector: 'app-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.css']
})


export class IncomeChartComponent implements OnInit, OnChanges{

  @Input() months: string[] =[];

  @Input() selectedYear: number;
  labels:string[]=[];
  // incomesArrayByMonth:number[][] = [];
  incomesArrayByMonth:any[] = [];
  expenseArrayByMonth:any[] = [];
  chartMonthlyByTagsIncome: any;


  constructor(private statsService: StatsService) {


  }
updateChart(){
  // this.chartMonthlyByTagsIncome.update()
  this.addDataToChart()
}
  ngOnInit(): void {
    this.createChartIncomeExpense()


  }
   ngOnChanges({selectedYear: change}: SimpleChanges): void {
    // this.createChartIncomeExpense()
    this.labels.length = 0;
    this.incomesArrayByMonth.length = 0;
    this.expenseArrayByMonth.length = 0;
    this.getDetailedInfoIncome(change)
    this.getDetailedInfoExpense(change)

    // this.addDataToChart()
    this.updateChart()
    // this.chartMonthlyByTagsIncome.update()
    // console.log(this.labels)
    // console.log(this.incomesArrayByMonth)
    // console.log(this.expenseArrayByMonth)
  }

  // getDetailedInfoIncome(change: SimpleChange){
  //   this.statsService.getDetailedInfoIncome(change.currentValue).subscribe(value => {
  //     // this.incomesMap = new Map<string,number[]>(Object.entries(value))
  //     Object.entries(value).forEach(([k,v])=>{
  //       this.labels.push(k);
  //       this.incomesArrayByMonth.push(v)
  //     })
  //   })
  //
  // }
  // async getDetailedInfoIncome(change: SimpleChange){
  //   await this.statsService.getDetailedInfoIncome(change.currentValue).toPromise().then(value => {
  //     Object.entries(value).forEach(([k,v])=>{
  //             this.labels.push(k);
  //             this.incomesArrayByMonth.push(v)
  //           })
  //     this.addDataToChart()
  //   })
  //
  //
  // }

  async getDetailedInfoIncome(change: SimpleChange){
    await this.statsService.getDetailedInfoIncome(change.currentValue).forEach(value => {
      Object.entries(value).forEach(([k,v])=>{
        this.labels.push(k);
        this.incomesArrayByMonth.push(v)
      })
      this.addDataToChart()
    })


  }

  async getDetailedInfoExpense(change: SimpleChange) {
    await this.statsService.getDetailedInfoExpense(change.currentValue).forEach(value => {
      Object.entries(value).forEach(([k, v]) => {
          this.expenseArrayByMonth.push(v);
      })
      this.addDataToChart()
    })


  }
  addDataToChart() {
    this.chartMonthlyByTagsIncome.destroy();
    this.chartMonthlyByTagsIncome = new Chart('IncomeChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: []
      },
      options: {
        aspectRatio:4.0
      }
    } )

    for (let i = 0; i < this.labels.length; i++) {
      let data: DatasetForm = {
        label: this.labels[i],

        data: this.incomesArrayByMonth[i],
      }

      this.chartMonthlyByTagsIncome.data.datasets.push(data)
    }

    this.chartMonthlyByTagsIncome.update()
  }
  // addDataToChart(){
  //   // this.chartMonthlyByTagsIncome.data.datasets.push(this.newDataset)
  //   this.chartMonthlyByTagsIncome.data.datasets.push(this.newDataset2)
  //   let data: DatasetForm = {
  //     label: 'testeeeowy',
  //     backgroundColor: 'green',
  //     data: [24,55]
  //   }
  //   this.chartMonthlyByTagsIncome.data.datasets.push(data)
  //   this.chartMonthlyByTagsIncome.data.datasets[0].label = this.labels[1]
  //   // this.chartMonthlyByTagsIncome.update() ;
  //   this.chartMonthlyByTagsIncome.data.datasets[0].data.push([9]);
  //   // this.chartMonthlyByTagsIncome.data.datasets[0].data.push([3,9])
  //   let data1: DatasetForm = {
  //     label: 'ddasdf',
  //     backgroundColor: 'yellow',
  //     data: [8]
  //   }
  //   this.chartMonthlyByTagsIncome.data.datasets.push(data1)
  //   this.chartMonthlyByTagsIncome?.update()
  // }
  createChartIncomeExpense() {

    this.chartMonthlyByTagsIncome = new Chart('IncomeChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: []
      },
      options: {
        aspectRatio:4.0
      }
    } )

  }
}
export interface DatasetForm {
  label: string;

  data: any[];
}

