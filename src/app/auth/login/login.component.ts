import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "./login.request.payload";
import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {throwError} from "rxjs";
// import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup;
  isError: boolean;
  registerSuccessMessage: string;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
    this.loginRequestPayload = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params["registered"] !== undefined && params["registered"] === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login() {
    this.loginRequestPayload.email =  this.loginForm.get('email')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload).subscribe(
      (data) => {
        console.log('Login Successful')
        if (data) {
          this.isError = false;
          this.router.navigateByUrl('home');
          this.toastr.success('Login Successful');
        } else {
          this.isError = true;
          this.toastr.error('Wrong Credentials');
          // throwError(error);
        }
      }, (error) =>{
        this.isError = true;
        this.toastr.error('Wrong Credentials');
      }
    )
  }
}
