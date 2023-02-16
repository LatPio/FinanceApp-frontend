import {Component, OnInit, Type} from '@angular/core';
import {NgModalConfirm} from "../shared/NgModalConfiirm";
import {IncomeModel} from "../service/models/income-model";
import {IncomeService} from "../service/income.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExpenseModel} from "../service/models/expense-model";

const MODALS: {[name: string]: Type<any>}= {deleteModal: NgModalConfirm};

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit{

  incomes: Array<IncomeModel> = [];

  constructor(private incomeService: IncomeService,
              private router: Router,
              private modalService: NgbModal,
              private  toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllIncomes();
  }

  private getAllIncomes() {
    this.incomeService.getAllIncomes().subscribe(income => this.incomes = income);
  }
  createIncome(){
    this.router.navigate(['add/incomes']);
  }
  deleteIncomeConfirmation(income: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteIncome(income);
      },
      (reason) => {});
  }

  deleteIncome(income: IncomeModel) {
    this.incomeService
      .deleteIncome(income)
      .subscribe(
        (data: any) => {
          this.toastr.success("Expense Entry Deleted");
          this.getAllIncomes();
        }
      )
  }
}
