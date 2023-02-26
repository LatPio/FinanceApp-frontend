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
      date: 0,
      tags: [],
      amount: 0
    }
  }
  ngOnInit(): void {
    this.getAllTags();
    this.createExpenseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      date: new FormControl(new Date() , Validators.required),
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


// <ng-container matColumnDef="tags" >
//     <th mat-header-cell *matHeaderCellDef> Tag </th>
//     <td mat-cell *matCellDef="let emp">
// <mat-chip-listbox>
// <mat-chip *ngFor="let tag of emp.tags" [hidden]>{{tag.name}}</mat-chip>
// </mat-chip-listbox>
// </td>
// </ng-container>
// <ng-container matColumnDef="option">
//   <th mat-header-cell *matHeaderCellDef> Option </th>
//   <td mat-cell *matCellDef="let emp">
// <a [routerLink]="['/edit/expenses/', emp.id]" class="btn">
// <svg class="bi me-2" width="20" height="20" fill="navy" >
//   <use xlink:href="bootstrap-icons.svg#pencil-square"/></svg>
// </a>
// <a (click)="deleteExpenseConfirmation(emp)" class="btn">
// <svg class="bi me-2" width="20"  height="20"fill="red" >
//   <use xlink:href="bootstrap-icons.svg#trash3"/></svg>
//   </a>
//
//   </td>
//
//   </ng-container>
}
