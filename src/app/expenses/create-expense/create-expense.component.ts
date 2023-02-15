import {Component, OnInit} from '@angular/core';
import {ExpenseRequestPayload} from "./expense.request.payload";
import {Router} from "@angular/router";
import {ExpenseService} from "../../service/expense.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit{

  createExpenseForm:  FormGroup;
  expensePayload: ExpenseRequestPayload;


  constructor(private router: Router,
              private expenseService: ExpenseService,
              // private modalService : NgbModal,   // to add adding expense in modal form
              private toastr: ToastrService ) {
    this.expensePayload = {
      name: '',
      currency: '',
      // tags: '',
      amount: 0
    }
  }
  ngOnInit(): void {
    this.createExpenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      // tags: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }


  createExpense(){
    this.expensePayload.name = this.createExpenseForm.get('name')?.value;
    this.expensePayload.currency = this.createExpenseForm.get('currency')?.value;
    // this.expensePayload.tags = this.createExpenseForm.get('tags')?.value;
    this.expensePayload.amount = this.createExpenseForm.get('amount')?.value;

    this.expenseService.createExpense(this.expensePayload).subscribe((data)=>{
      this.router.navigateByUrl('expenses');
    }, error => {
      throw error('error');
    })
  }

  discardExpense(){
    this.router.navigateByUrl('expenses')
  }
}
