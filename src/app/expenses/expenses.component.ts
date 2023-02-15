import {Component, OnInit, Type} from '@angular/core';
import {ExpenseModel} from "../service/expense-model";
import {ExpenseService} from "../service/expense.service";
import {NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h3 class="modal-title" id="modal-title">Delete Confirmation</h3>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public  modal: NgbActiveModal) {
  }
}
const MODALS: {[name: string]: Type<any>} = { deleteModal: NgModalConfirm,};

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit{

  expenses: Array<ExpenseModel> = [];

  constructor(private expenseService: ExpenseService,
              private router:Router,
              private modalService : NgbModal,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getAllExpenses();
  }

  async getAllExpenses(){
    this.expenseService.getAllExpenses().subscribe(expense => this.expenses = expense);
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
