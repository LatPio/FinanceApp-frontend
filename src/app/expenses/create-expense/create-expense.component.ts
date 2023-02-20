import {Component, OnInit} from '@angular/core';
import {ExpenseRequestPayload} from "./expense.request.payload";
import {Router} from "@angular/router";
import {ExpenseService} from "../../service/expense.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TagModel} from "../../service/models/tag-model";
import {TagsService} from "../../service/tags.service";

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit{

  createExpenseForm:  FormGroup;
  expensePayload: ExpenseRequestPayload;
  tagsList: Array<TagModel> = []


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private tagsService: TagsService,
              private expenseService: ExpenseService,
              // private modalService : NgbModal,   // to add adding expense in modal form
              private toastr: ToastrService ) {
    this.expensePayload = {
      name: '',
      currency: '',
      tags: [],
      amount: 0
    }
  }
  ngOnInit(): void {
    this.getAllTags();
    this.createExpenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      tags: new FormControl([], Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }
  private getAllTags() {
    this.tagsService.getAllTags().subscribe(tag => this.tagsList = tag)
  }

  createExpense(){
    this.expensePayload.name = this.createExpenseForm.get('name')?.value;
    this.expensePayload.currency = this.createExpenseForm.get('currency')?.value;
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
