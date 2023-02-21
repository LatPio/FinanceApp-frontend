import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomeModel} from "../../service/models/income-model";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {IncomeService} from "../../service/income.service";
import {first} from "rxjs";
import {TagModel} from "../../service/models/tag-model";
import {TagsService} from "../../service/tags.service";

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.css']
})
export class UpdateIncomeComponent implements OnInit{

  incomeForm: FormGroup;
  incomeId: string;
  incomeModel: IncomeModel = new IncomeModel();
  tagsList: Array<TagModel> = []


  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private incomeService: IncomeService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.incomeModel.id = this.route.snapshot.params['incomeID'];
    this.incomeId = this.route.snapshot.params['incomeID'];
    this.getAllTags();

    this.incomeForm = this.formBuilder.group({
      name:['', Validators.required],
      currency: ['', Validators.required],
      tags: [[], Validators.required],
      amount: ['', Validators.required]
    })
    this.getIncomeById();
  }
  private getAllTags() {
    this.tagsService.getAllTags().subscribe(tag => this.tagsList = tag)
  }
  // private getIncomeById() {
  //   this.incomeService.getIncome(this.incomeId)
  //     .pipe(first())
  //     .subscribe(x=> this.incomeForm.patchValue(x))
  // }

  compare(val1:any, val2:any): boolean{
    return val1.id === val2.id;
  };

  private getIncomeById() {
    this.incomeService.getIncome(this.incomeId).subscribe(data=>{
      this.incomeForm = this.formBuilder.group({
        name:[data.name],
        currency:[data.currency],
        tags: [data.tags],
        amount: [data.amount]
      })
    })
  }

  updateIncome(){
    this.incomeModel.name = this.incomeForm.get('name')?.value;
    this.incomeModel.currency = this.incomeForm.get('currency')?.value;
    this.incomeModel.tags = this.incomeForm.get('tags')?.value;
    this.incomeModel.amount = this.incomeForm.get('amount')?.value;

    this.incomeService.updateIncome(this.incomeModel).subscribe({
      next: ()=>{
        this.toastr.success('Updated Successful')
        this.router.navigateByUrl('income')
      },
      error: err => {
        this.toastr.error("something gone wrong")
      }
    })
  }

  discardIncome(){
    this.router.navigateByUrl('income')
  }


}
