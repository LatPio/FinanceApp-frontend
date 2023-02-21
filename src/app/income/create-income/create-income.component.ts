import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IncomeRequestPayload} from "./income.request.payload";
import {Router} from "@angular/router";
import {IncomeService} from "../../service/income.service";
import {ToastrService} from "ngx-toastr";
import {TagsService} from "../../service/tags.service";
import {TagModel} from "../../service/models/tag-model";

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.css']
})
export class CreateIncomeComponent implements  OnInit{

  createIncomeForm: FormGroup;
  incomePayload: IncomeRequestPayload;
  tagsList: Array<TagModel> = []


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private incomeService: IncomeService,
              private toastr: ToastrService,
              private tagsService: TagsService) {
    this.incomePayload = {
      name:'',
      currency: '',
      tags:[],
      amount: 0
    }
  }

  ngOnInit(): void {
    this.getAllTags();
    this.createIncomeForm = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      tags: new FormControl([this.tagsList], Validators.required),
      amount: new FormControl('',Validators.required)
    });

  }
  private getAllTags() {
    this.tagsService.getAllTags().subscribe(tag => this.tagsList = tag)
  }
  createIncome(){
    this.incomePayload.name = this.createIncomeForm.get('name')?.value;
    this.incomePayload.currency = this.createIncomeForm.get('currency')?.value;
    this.incomePayload.amount = this.createIncomeForm.get('amount')?.value;
    this.incomePayload.tags = this.createIncomeForm.get('tags')?.value;

    this.incomeService.createIncome(this.incomePayload).subscribe({
      next: () => {
        this.toastr.success('Income Created Successfully')
        this.router.navigateByUrl('income')
      },
      error: err => {
        this.toastr.error("Something Gone Wrong")
      }
    })
  }

  discardIncome(){
    this.router.navigateByUrl('income')
  }

}
