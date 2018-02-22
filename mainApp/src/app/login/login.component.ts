import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUser: object = {first: "", last: "", email: "", password: ""};
  con_pass: string = "";
  user: object = {email: ""};
  errorMessages: string[] = [];

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log(this.user);
    console.log('login');
    this._httpService.loginUser(this.user)
    .subscribe((responseData:any)=>{
      console.log('responseData', responseData);
      this.errorMessages = [];
      if(responseData.errors){
        for(var key in responseData.errors) {
          // console.log(key)
          // console.log(responseData.error[key].message);
          this.errorMessages.push(responseData.errors[key].message);
        }
      } else {
        this._router.navigate(['browse'])
      }
    })
  }

  register(){
    console.log(this.newUser);
  }

}
