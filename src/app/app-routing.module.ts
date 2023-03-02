import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {UserprofileComponent} from "./auth/user-profile/userprofile.component";
import {IncomeComponent} from "./income/income.component";
import {ExpensesComponent} from "./expenses/expenses.component";
import {AuthGuard} from "./auth/auth.guard";
import {CreateExpenseComponent} from "./expenses/create-expense/create-expense.component";
import {EditExpenseComponent} from "./expenses/edit-expense/edit-expense.component";
import {TagsComponent} from "./tags/tags.component";
import {CreateIncomeComponent} from "./income/create-income/create-income.component";
import {UpdateIncomeComponent} from "./income/update-income/update-income.component";
import {CreateTagComponent} from "./tags/create-tag/create-tag.component";
import {UpdateTagComponent} from "./tags/update-tag/update-tag.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [

  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'user-profile', component: UserprofileComponent, canActivate: [AuthGuard]},
  {path: 'income', component: IncomeComponent, canActivate: [AuthGuard]},
  {path: 'add/income', component: CreateIncomeComponent, canActivate: [AuthGuard]},
  {path: 'edit/income/:incomeID', component: UpdateIncomeComponent, canActivate: [AuthGuard]},
  {path: 'expenses', component: ExpensesComponent,  canActivate: [AuthGuard]},
  {path: 'add/expenses', component: CreateExpenseComponent,  canActivate: [AuthGuard]},
  {path: 'edit/expenses/:expenseID', component: EditExpenseComponent,  canActivate: [AuthGuard]},
  {path: 'tags', component: TagsComponent,  canActivate: [AuthGuard]},
  {path: 'add/tags', component: CreateTagComponent,  canActivate: [AuthGuard]},
  {path: 'edit/tags/:tagID', component: UpdateTagComponent,  canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
