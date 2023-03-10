import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StatsService} from "../service/stats.service";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit{
  labels: string[] = [];
  incomesArrayByMonth: any[]=[];
  expenseArrayByMonth: any[]=[];

  yearsArray: number[] = [];
  selectedYear: any;
  actualYear: number;
  // incomesMap: any ;

  // expenseMap: any;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  constructor(private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.generateYearsArray()
    this.selectedYear = new Date().getFullYear();
    this.getDetailedInfoIncome(this.selectedYear)
    this.getDetailedInfoExpense(this.selectedYear)
  }
  generateYearsArray(){
    this.statsService.getYears().subscribe( years =>{
      this.yearsArray= Object.assign([], years);

      // const myClonedArray  = Object.assign([], this.yearsArray);
    })

  }
  activeYearDate(year: number){
    this.actualYear = year;

  }
  getDetailedInfoIncome(year: number){
    this.statsService.getDetailedInfoIncome(year).subscribe(value => {
      // this.incomesMap = new Map<string,number[]>(Object.entries(value))
      Object.entries(value).forEach(([k,v])=>{
        this.labels.push(k);
        this.incomesArrayByMonth.push(v)
      })
    })

  }

  getDetailedInfoExpense(year: number){
    this.statsService.getDetailedInfoExpense(year).subscribe(value => {
      // this.expenseMap = new Map<string,number[]>(Object.entries(value))
      Object.entries(value).forEach(([k,v])=>{
        this.expenseArrayByMonth.push(v)
      })
    })
    // console.log(this.expenseArrayByMonth)
  }


}
