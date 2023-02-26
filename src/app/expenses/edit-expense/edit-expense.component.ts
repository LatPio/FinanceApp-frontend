import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpenseService} from "../../service/expense.service";
import {ExpenseModel} from "../../service/models/expense-model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {TagModel} from "../../service/models/tag-model";
import {TagsService} from "../../service/tags.service";
import {registerLocaleData} from "@angular/common";
import pl from '@angular/common/locales/pl';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit{

  expenseForm: FormGroup ;
  expenseId: string;
  expenseModel: ExpenseModel = new ExpenseModel();
  tagsList: Array<TagModel> = []

  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private expenseService: ExpenseService,
              private tagsService: TagsService) {

  }

  ngOnInit(): void {
    this.expenseModel.id = this.route.snapshot.params['expenseID'];
    this.expenseId = this.route.snapshot.params['expenseID'];
    this.getAllTags();
    registerLocaleData( pl )
    this.expenseForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        currency: ['', Validators.required],
        date: [0, Validators.required],
        tags: [[], Validators.required],
        amount: ['', Validators.required]
      }
    )
    this.getExpenseById();
  }

  private getAllTags() {
    this.tagsService.getAllTags().subscribe(tag => this.tagsList = tag)
  }
  compare(val1:any, val2:any): boolean{
    return val1.id === val2.id;
  };

  private getExpenseById() {
    this.expenseService.getExpense(this.expenseId)
      .subscribe(
        data=>{
          this.expenseForm = this.formBuilder.group({
            name:[data.name],
            tags:[data.tags],
            currency:[data.currency],
            amount:[data.amount],
            date:[new Date(data.date)]

          })
        }
      )

  }

  updateExpense(){
    this.expenseModel.name = this.expenseForm.get('name')?.value;
    this.expenseModel.currency = this.expenseForm.get('currency')?.value;
    this.expenseModel.tags = this.expenseForm.get('tags')?.value;
    this.expenseModel.date = this.expenseForm.get('date')?.value;
    this.expenseModel.amount = this.expenseForm.get('amount')?.value;

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
