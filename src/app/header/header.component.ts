import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLoggedIn: boolean;
  email: string;

  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.authService.loggedIn.subscribe( (data: boolean) => this.isLoggedIn = data);
    this.authService.userEmail.subscribe( (data: string) => this.email= data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.email = this.authService.getUserEmail()
  }

  goToUserProfile() {
    this.router.navigateByUrl('user-profile');
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('')
  }
}
