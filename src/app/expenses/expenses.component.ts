import {AfterViewInit, Component, Input, OnInit, Type, ViewChild} from '@angular/core';
import {ExpenseModel} from "../service/models/expense-model";
import {ExpenseService} from "../service/expense.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgModalConfirm} from "../shared/NgModalConfiirm";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ExportXlsxComponent} from "../shared/export-xlsx/export-xlsx.component";
import {UserOptionsService} from "../service/user-options.service";
import {UserOptionsModel} from "../service/models/userOptions-model";
import {SearchCriteria} from "../shared/search-bar/search-bar.component";

const MODALS: {[name: string]: Type<any>} = { deleteModal: NgModalConfirm,};

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id','date', 'name', 'amount', 'currency', 'tags', 'option'];
  dataSource = new MatTableDataSource<ExpenseModel>();
  expenses: Array<ExpenseModel> = [];
  jsonArray:any=[];
  data = JSON.stringify(this.jsonArray)
  pagination: number[] = [];
  providedName: string = "Expense";
  options: UserOptionsModel = new UserOptionsModel();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(ExportXlsxComponent) child:ExportXlsxComponent;

  constructor(private expenseService: ExpenseService,
              private router:Router,
              private modalService : NgbModal,
              private toastr: ToastrService,
              private userOptionsService: UserOptionsService) {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      return JSON.stringify(data).toLocaleLowerCase().includes(filter)

    }

  }

  ngOnInit(): void {
    this.getOptions();
        }

  getOptions(){
      this.userOptionsService.getUserOptions()
        .forEach(value => this.options = value)
        .then(r => {
          let strArray = this.options.userPagination.split(",")
          this.pagination = strArray.map(value => Number(value))
          this.getAllExpensesWithSpec()
        })
  }
  getAllExpenses(){
    this.expenseService.getAllExpenses().subscribe(expense => {
      this.dataSource.data = expense;
    });
  }
  async getAllExpensesWithSpec(){
    if(this.jsonArray.length == 0){
      let array:any = [];
      let startDateMonth = new Date(new Date().getFullYear(), new Date().getMonth()-this.options.getLastNumberOfMonthsData, 1)

      let searchCriteriaDateStart: SearchCriteria = {
        key: 'date',
        value: startDateMonth.toISOString(),
        operation: 'DATE_GREATER_THAN_EQUAL'
      }
      array.push(searchCriteriaDateStart)


      await this.expenseService.getAllExpensesWithSpec(JSON.stringify(array)).forEach(expense => {
        this.expenses = expense;
        this.dataSource.data = expense;
      });
    } else {
      await this.expenseService.getAllExpensesWithSpec(JSON.stringify(this.jsonArray)).forEach(expense => {
        this.expenses = expense;
        this.dataSource.data = expense;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  createExpense(){
    this.router.navigate(['add/expenses']);
  }

  deleteExpenseConfirmation(expense: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteExpense(expense);
      },
      (reason) => {});
  }

  deleteExpense(expense: ExpenseModel) {
    this.expenseService
      .deleteExpense(expense)
      .subscribe(
        (data: any) => {
          this.toastr.success("Expense Entry Deleted");
          this.getAllExpensesWithSpec();
        }
      )
  }

  addFilterData(newItem: any) {
    this.jsonArray = newItem;

    this.getAllExpensesWithSpec();

    console.log(this.jsonArray);
    console.log(this.dataSource.data)
  }

  resetSearch($event: any) {
    this.jsonArray=[];
    this.getAllExpensesWithSpec();

  }

  export() {
    this.child.exporter()
  }
}
