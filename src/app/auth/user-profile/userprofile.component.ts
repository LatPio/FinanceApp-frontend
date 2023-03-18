import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserOptionsService} from "../../service/user-options.service";
import {UserOptionsModel} from "../../service/models/userOptions-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{

  userOptionsForm: FormGroup;
  userOptionsModel: UserOptionsModel = new UserOptionsModel();


  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private userOptionsService: UserOptionsService,
              private router: Router) {
  }

  ngOnInit(): void {
      this.userOptionsForm = this.formBuilder.group(
        {
          userPagination: ['', Validators.required],
          defaultCurrency: ['', Validators.required],
          getLastNumberOfMonthsData: [0, Validators.required],
        }
      );
      this.getUserOptions();

  }

  private getUserOptions() {
    this.userOptionsService.getUserOptions().subscribe(
      value => {
        this.userOptionsForm = this.formBuilder.group({
            id:[value.id],
            userPagination:[value.userPagination],
            defaultCurrency: [value.defaultCurrency],
            getLastNumberOfMonthsData: [value.getLastNumberOfMonthsData],
        }
        )
      }
    )
  }

  updateUserOptions(){
    this.userOptionsModel.id = this.userOptionsForm.get('id')?.value;
    this.userOptionsModel.userPagination = this.userOptionsForm.get('userPagination')?.value;
    this.userOptionsModel.defaultCurrency = this.userOptionsForm.get('defaultCurrency')?.value;
    this.userOptionsModel.getLastNumberOfMonthsData = this.userOptionsForm.get('getLastNumberOfMonthsData')?.value;

    this.userOptionsService.updateUserOptions(this.userOptionsModel).subscribe({
      next: () => {
        this.toastr.success('Updated Successfully');
        this.router.navigateByUrl('userprofile')
      },
      error: err => {
        this.toastr.error("something gone wrong")
      }
    })

  }

  compare(val1:any, val2:any): boolean{
    return val1 === val2;
  };


}
