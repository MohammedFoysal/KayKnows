import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  result: any;

  constructor(private dataService: DataService) { 
    this.user = new User();
    this.user.user_email = '';
    this.user.user_full_name = '';
    this.user.user_password = '';
    this.user.role_id = 1;
    this.user.user_admin = 0;
  }

  ngOnInit() {
  }

  register() {
    if (this.user.user_admin) {
      this.user.user_admin = 1;
    } else {
      this.user.user_admin = 0;
    }

    let self = this;
    this.result = '';
    this.dataService.register(this.user, function(data, error) {
      if (data && data.successful) {
        self.result = 'Registered successfully: ' + data.token
      } else {
        self.result = 'Error';
        console.error(data);
        console.error(error);
      }
    })
  }

}
