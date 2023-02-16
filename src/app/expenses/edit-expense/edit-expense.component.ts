import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpenseService} from "../../service/expense.service";
import {ExpenseModel} from "../../service/models/expense-model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit{

  expenseForm: FormGroup ;
  expenseId: string;
  expenseModel: ExpenseModel = new ExpenseModel();

  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private expenseService: ExpenseService) {

  }

  ngOnInit(): void {
    this.expenseModel.id = this.route.snapshot.params['expenseID'];
    this.expenseId = this.route.snapshot.params['expenseID'];

    this.expenseForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        currency: ['', Validators.required],
        // tags: new FormControl('', Validators.required),
        amount: ['', Validators.required]
      }
    )
    this.getExpenseById();
  }


  private getExpenseById() {
    this.expenseService.getExpense(this.expenseId)
      .pipe(first())
      .subscribe(x => this.expenseForm.patchValue(x) )
  }

  updateExpense(){
    this.expenseModel.name = this.expenseForm.get('name')?.value;
    this.expenseModel.currency = this.expenseForm.get('currency')?.value;
    // this.expensePayload.tags = this.createExpenseForm.get('tags')?.value;
    this.expenseModel.amount = this.expenseForm.get('amount')?.value;

    // this.expenseService.updateExpense(this.expenseModel).subscribe((data)=>{
    //         this.router.navigateByUrl('expenses');
    // })
    this.expenseService.updateExpense(this.expenseModel).subscribe({
      next: () => {
        this.toastr.success('Updated Successful')
        this.router.navigateByUrl('expenses')
      },
      error: err => {
        this.toastr.error("something gone wrong")
      }

    });
    }




  discardExpense(){
    this.router.navigateByUrl('expenses')
  }

}
