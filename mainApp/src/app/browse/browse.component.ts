import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  currentUser: object = {email: ""};

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this._httpService.getCurrentUser()
    .subscribe((responseData: any)=>{
      console.log('responseData', responseData)
      if(responseData.errors){
        this._router.navigate(['']);
        console.log(this.currentUser)
      } else {
        this.currentUser = responseData;
        console.log(this.currentUser)
      }
    })
  }
  

}
