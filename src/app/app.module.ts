import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './home/home.component';
import {TokenInterceptor} from "./token-interceptor";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomeComponent } from './income/income.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { UserprofileComponent } from './auth/user-profile/userprofile.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { TagsComponent } from './tags/tags.component';
import { CreateIncomeComponent } from './income/create-income/create-income.component';
import { UpdateIncomeComponent } from './income/update-income/update-income.component';
import { CreateTagComponent } from './tags/create-tag/create-tag.component';
import { UpdateTagComponent } from './tags/update-tag/update-tag.component';
import {MatChipsModule} from "@angular/material/chips";
import {NgModalConfirm} from "./shared/NgModalConfiirm";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SearchBarComponent } from './shared/search-bar/search-bar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from "@angular/material/card";
import {DatePipe} from "@angular/common";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    SideBarComponent,
    ExpensesComponent,
    IncomeComponent,
    UserprofileComponent,
    CreateExpenseComponent,
    EditExpenseComponent,
    TagsComponent,
    CreateIncomeComponent,
    UpdateIncomeComponent,
    CreateTagComponent,
    UpdateTagComponent,
    NgModalConfirm,
    SearchBarComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    NgbModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,


  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
