import {AfterViewInit, Component, Input, OnInit, Type, ViewChild} from '@angular/core';
import {NgModalConfirm} from "../shared/NgModalConfiirm";
import {IncomeModel} from "../service/models/income-model";
import {IncomeService} from "../service/income.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ExportXlsxComponent} from "../shared/export-xlsx/export-xlsx.component";
import {UserOptionsModel} from "../service/models/userOptions-model";
import {UserOptionsService} from "../service/user-options.service";
import {SearchCriteria} from "../shared/search-bar/search-bar.component";

const MODALS: {[name: string]: Type<any>}= {deleteModal: NgModalConfirm};

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id','date', 'name', 'amount', 'currency', 'tags', 'option'];
  dataSource = new MatTableDataSource<IncomeModel>();
  jsonArray:any=[];
  data = JSON.stringify(this.jsonArray);
  pagination: number[] = [];
  options: UserOptionsModel = new UserOptionsModel();
  incomes: Array<IncomeModel> = [];
  providedName: string = "Income";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ExportXlsxComponent) child:ExportXlsxComponent;

  constructor(private incomeService: IncomeService,
              private router: Router,
              private modalService: NgbModal,
              private  toastr: ToastrService,
              private userOptionsService: UserOptionsService) {
  }

  ngOnInit(): void {
    this.getOptions();

  }

  ngAfterViewInit(): void {
    this.getAllIncomesWithSpec();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      return JSON.stringify(data).toLocaleLowerCase().includes(filter)

    }
  }
  getOptions(){
    this.userOptionsService.getUserOptions()
      .forEach(value => this.options = value)
      .then(r => {
        let strArray = this.options.userPagination.split(",")
        this.pagination = strArray.map(value => Number(value))
        this.getAllIncomesWithSpec();

      })
  }
  getAllIncomes() {
    this.incomeService.getAllIncomes().subscribe(income => this.dataSource.data = income);
  }
  async getAllIncomesWithSpec(){
    if(this.jsonArray.length == 0){
      let array:any = [];
      let startDateMonth = new Date(new Date().getFullYear(), new Date().getMonth()-this.options.getLastNumberOfMonthsData, 1)

      let searchCriteriaDateStart: SearchCriteria = {
        key: 'date',
        value: startDateMonth.toISOString(),
        operation: 'DATE_GREATER_THAN_EQUAL'
      }
      array.push(searchCriteriaDateStart)

      await this.incomeService.getAllIncomesWithSpec(JSON.stringify(array)).forEach(
        incomes => {
          this.dataSource.data = incomes;
          this.incomes = incomes;
        }

      );
    }else{
      await this.incomeService.getAllIncomesWithSpec(JSON.stringify(this.jsonArray)).forEach(
        incomes => {
          this.dataSource.data = incomes;
          this.incomes = incomes;
        }

      );
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createIncome(){
    this.router.navigate(['add/incomes']);
  }
  deleteIncomeConfirmation(income: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteIncome(income);
      },
      (reason) => {});
  }

  deleteIncome(income: IncomeModel) {
    this.incomeService
      .deleteIncome(income)
      .subscribe(
        (data: any) => {
          this.toastr.success("Expense Entry Deleted");
          this.getAllIncomes();
        }
      )
  }
  addFilterData(newItem: any) {
    this.jsonArray = newItem;

    this.getAllIncomesWithSpec();

    console.log(this.jsonArray);
    console.log(this.dataSource.data)
  }

  resetSearch($event: any) {
    this.jsonArray=[];
    this.getAllIncomesWithSpec();

  }

  export() {
    this.child.exporter()
  }
}
