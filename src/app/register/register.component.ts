import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.userService.createUser(this.model)
        .subscribe(
            data => {
              this.alertService.success('Registration successful', true);
              let user = JSON.parse(data['_body']);
              localStorage.setItem('currentUser', data['_body']);
              this.router.navigate(['profile/:id'], user.id);
            },
            error => {
              this.alertService.error(error._body);
              this.loading = false;
            }
        )
  }
}
