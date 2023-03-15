import {Component, Input} from '@angular/core';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-export-xlsx',
  templateUrl: './export-xlsx.component.html',
  styleUrls: ['./export-xlsx.component.css']
})
export class ExportXlsxComponent {


  @Input() database: any = [];
  @Input() providedName: string = "";


  exporter(): void
  {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.providedName);

    XLSX.writeFile(wb, this.providedName + '_data_' +new Date().toLocaleString()+'.xlsx');
  }
}
