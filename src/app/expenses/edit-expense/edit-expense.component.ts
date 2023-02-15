import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpenseService} from "../../service/expense.service";
import {ExpenseModel} from "../../service/expense-model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit{

  editExpenseForm: FormGroup;
  expenseModel: ExpenseModel;

  constructor(private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              private expenseService: ExpenseService) {
    this.expenseModel = {
      id: 0,
      name: '',
      amount: 0,
      // tags: '',
      currency: ''
    }
  }

  ngOnInit(): void {
    this.expenseModel.id = this.route.snapshot.params['expenseID'];
    this.editExpenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      // tags: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
    this.getExpenseById();
    // console.log(this.editExpenseForm)
  }

  private getExpenseById() {
    this.expenseService.getExpense(this.expenseModel).subscribe((data)=>{
      if(data != null){
        var resultData = data;
        if(resultData){
          this.editExpenseForm = new FormGroup({
            name: new FormControl(resultData.name, Validators.required),
            currency: new FormControl(resultData.currency, Validators.required),
            // tags: new FormControl('', Validators.required),
            amount: new FormControl(resultData.amount, Validators.required)
          })

        }
      }
    })
  };

  updateExpense(){
    this.expenseModel.name = this.editExpenseForm.get('name')?.value;
    this.expenseModel.currency = this.editExpenseForm.get('currency')?.value;
    // this.expensePayload.tags = this.createExpenseForm.get('tags')?.value;
    this.expenseModel.amount = this.editExpenseForm.get('amount')?.value;

    this.expenseService.updateExpense(this.expenseModel).subscribe((data)=>{
      this.router.navigateByUrl('expenses');
    })
  }

  discardExpense(){
    this.router.navigateByUrl('expenses')
  }

}
