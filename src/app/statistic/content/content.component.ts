import {Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {StatsService} from "../../service/stats.service";
import Chart from "chart.js/auto";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnChanges{

  @Input() months: string[] =[];
  @Input() selectedYear: number;
  @ViewChild('contentForPDF', {static:false}) contentForPDF: ElementRef;

  labels: string[]=[];
  incomesArrayByMonth: any[] = [];
  expenseArrayByMonth: any[] = [];
  chartMonthlyByTagsIncome: any;
  chartMonthlyByTagsExpense: any;

  constructor(private statsService: StatsService) {
  }
  ngOnInit(): void {
    this.createChartIncome()
    this.createChartExpense()
  }

  ngOnChanges({selectedYear: change}: SimpleChanges): void {
    this.labels.length = 0;
    this.incomesArrayByMonth.length = 0;
    this.expenseArrayByMonth.length = 0;
    this.getDetailedInfoIncome(change).then(() => this.addDataToCharts())
    this.getDetailedInfoExpense(change).then(() => this.addDataToCharts())
  }

  async getDetailedInfoIncome(change: SimpleChange){
    await this.statsService.getDetailedInfoIncome(change.currentValue).forEach(value => {
      Object.entries(value).forEach(([k,v])=>{
        this.labels.push(k);
        this.incomesArrayByMonth.push(v)
      })
    })
  }
  async getDetailedInfoExpense(change: SimpleChange) {
    await this.statsService.getDetailedInfoExpense(change.currentValue).forEach(value => {
      Object.entries(value).forEach(([k, v]) => {
        this.expenseArrayByMonth.push(v);
      })
    })
  }

  addDataToCharts() {
    this.chartMonthlyByTagsIncome.destroy();
    this.chartMonthlyByTagsExpense.destroy();
    this.createChartIncome();
    this.createChartExpense()

    for (let i = 0; i < this.labels.length; i++) {
      let dataIncome: DatasetForm = {
        label: this.labels[i],
        data: this.incomesArrayByMonth[i],
      }
      let dataExpense: DatasetForm = {
        label: this.labels[i],
        data: this.expenseArrayByMonth[i],
      }

      this.chartMonthlyByTagsIncome.data.datasets.push(dataIncome)
      this.chartMonthlyByTagsExpense.data.datasets.push(dataExpense)
    }
    this.chartMonthlyByTagsExpense.update()
    this.chartMonthlyByTagsIncome.update()
  }

  createChartIncome() {
    this.chartMonthlyByTagsIncome = new Chart('IncomeChart1', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: []
      },
      options: {
        aspectRatio:3.0
      }
    } )
  }

  createChartExpense() {
      this.chartMonthlyByTagsExpense = new Chart('ExpenseChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: []
      },
      options: {
        aspectRatio:3.0
      }
    } )
  }

  public generatePDF(){
    let contentForPDF = this.contentForPDF.nativeElement
    html2canvas(contentForPDF, { allowTaint: true }).then(canvas => {
      let HTML_Width = canvas.width;
      let HTML_Height = canvas.height;
      let top_left_margin = 15;
      let PDF_Width = HTML_Width + (top_left_margin * 2);
      let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      let canvas_image_width = HTML_Width;
      let canvas_image_height = HTML_Height;
      canvas.getContext('2d');
      let imgData = canvas.toDataURL("image/jpeg", 1.0);
      let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.text("Report for: " + this.selectedYear,50,50, )

      pdf.addImage(imgData,
        'JPG',
        top_left_margin,
        top_left_margin + 100,
        canvas_image_width,
        canvas_image_height);

      pdf.save("Report_" + new Date().toDateString()+ ".pdf");
    });

  }
}

export interface DatasetForm {
  label: string;
  data: any[];
}


