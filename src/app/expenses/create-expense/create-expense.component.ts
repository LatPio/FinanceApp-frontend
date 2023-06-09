import {Component, OnInit} from '@angular/core';
import {ExpenseRequestPayload} from "./expense.request.payload";
import {Router} from "@angular/router";
import {ExpenseService} from "../../service/expense.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TagModel} from "../../service/models/tag-model";
import {TagsService} from "../../service/tags.service";
import {UserOptionsService} from "../../service/user-options.service";
import {UserOptionsModel} from "../../service/models/userOptions-model";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit{

  createExpenseForm:  FormGroup;
  expensePayload: ExpenseRequestPayload;
  tagsList: Array<TagModel> = []
  options: UserOptionsModel = new UserOptionsModel();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private tagsService: TagsService,
              private expenseService: ExpenseService,
              private toastr: ToastrService,
              private userOptionsService: UserOptionsService) {
    this.expensePayload = {
      name: '',
      currency: '',
      date: 0,
      tags: [],
      amount: 0
    }
    this.getOptions();
  }

  ngOnInit(): void {
    this.getAllTags();
    this.createExpenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      currency: new FormControl(this.options.defaultCurrency, Validators.required),
      date: new FormControl(new Date() , Validators.required),
      tags: new FormControl([], Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }

  private getAllTags() {
    this.tagsService.getAllTags().subscribe(tag => this.tagsList = tag)
  }

  async getOptions(){
    await this.userOptionsService.getUserOptions()
      .forEach(value => this.options = value).then(value => {
        this.createExpenseForm = new FormGroup({
          name: new FormControl('', Validators.required),
          currency: new FormControl(this.options.defaultCurrency, Validators.required),
          date: new FormControl(new Date() , Validators.required),
          tags: new FormControl([], Validators.required),
          amount: new FormControl('', Validators.required)
        });
        }
      )
  }

  createExpense(){
    this.expensePayload.name = this.createExpenseForm.get('name')?.value;
    this.expensePayload.currency = this.createExpenseForm.get('currency')?.value;
    this.expensePayload.date = this.createExpenseForm.get('date')?.value;
    this.expensePayload.tags = this.createExpenseForm.get('tags')?.value;
    this.expensePayload.amount = this.createExpenseForm.get('amount')?.value;

    this.expenseService.createExpense(this.expensePayload).subscribe(
      {
        next: () => {
          this.toastr.success('Expense Created Successfully')
          this.router.navigateByUrl('expenses')
        },
        error: err => {
          this.toastr.error("Something Gone Wrong")
        }
      }
    )
  }

  discardExpense(){
    this.router.navigateByUrl('expenses')
  }

}
