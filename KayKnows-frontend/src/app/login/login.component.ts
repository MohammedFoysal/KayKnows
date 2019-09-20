import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = { user_email: '', user_password: '' };
  response = '';

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
   });

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  login() {
    let self = this;
    self.response = '';

    this.dataService.login(this.user).subscribe({
      next: data => {
        if (data && data.successful) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", String(data.user.user_id));
          localStorage.setItem("user_email", data.user.user_email);
          localStorage.setItem("user_admin", String(data.user.user_admin));
          localStorage.setItem("user_full_name", data.user.user_full_name);
  
          self.router.navigate(['/']);
          
        } else {
          self.response = 'Email and password is incorrect';
        }
      },
      error: error => self.response = 'Email and password is incorrect'
    });
    
  }

}
