import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './home/home.component';
import {TokenInterceptor} from "./token-interceptor";
import {MatTableModule} from "@angular/material/table";
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomeComponent } from './income/income.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { UserprofileComponent } from './auth/user-profile/userprofile.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';

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
    EditExpenseComponent
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
    NgbModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
