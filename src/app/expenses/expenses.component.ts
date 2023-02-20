import {AfterViewInit, Component, OnInit, Type, ViewChild} from '@angular/core';
import {ExpenseModel} from "../service/models/expense-model";
import {ExpenseService} from "../service/expense.service";
import {NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgModalConfirm} from "../shared/NgModalConfiirm";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {filter} from "rxjs";




const MODALS: {[name: string]: Type<any>} = { deleteModal: NgModalConfirm,};

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'amount', 'currency', 'tags', 'option'];
  dataSource = new MatTableDataSource<ExpenseModel>();
  expenses: Array<ExpenseModel> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private expenseService: ExpenseService,
              private router:Router,
              private modalService : NgbModal,
              private toastr: ToastrService) {

  }

  ngAfterViewInit(): void {
    this.getAllExpenses();
    this.getAllExpenses2();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      return JSON.stringify(data).toLocaleLowerCase().includes(filter)

    }
  }

  ngOnInit(): void {
    this.getAllExpenses2();
    // this.getAllExpenses();
     }

  getAllExpenses(){
    this.expenseService.getAllExpenses().subscribe(expense => this.expenses = expense);
  }
  getAllExpenses2(){
    this.expenseService.getAllExpenses().subscribe(expense => {
      this.dataSource.data = expense;
      // this.dataSource.paginator= this.paginator;
      // this.dataSource.sort = this.sort;

    });
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
          this.getAllExpenses();
        }
      )
  }
}
