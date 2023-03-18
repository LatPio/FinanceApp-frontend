import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/service/auth.service";
import {UserOptionsService} from "./service/user-options.service";
import {UserOptionsModel} from "./service/models/userOptions-model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'finansepal';
  isLoggedIn: boolean = false;


  constructor(private authService: AuthService,
              ) {
  }
  ngOnInit(): void {
    this.authService.loggedIn.subscribe( (data: boolean) => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();

  }

}
