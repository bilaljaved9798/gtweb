import { Router } from '@angular/router';
import { Component,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   // <-- Add this
import { AuthService } from '../../..//auth/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,  
    FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginData: any = {}
  public loading: boolean = false;

  constructor(private router: Router, private authService: AuthService,) { }

  login() {
    // Dummy authentication
    this.authService.login(this.username, this.password).subscribe(
      result => {
        debugger;
        this.loading = false;
        //this.router.navigate(['/dashboard']);
      },
      error => {
        this.loading = false;
        this.errorMessage = this.authService.errorMessage.error;
      }
    );
  }
}
