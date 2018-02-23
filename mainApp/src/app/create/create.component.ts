import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newListing: object = {title: "", description: "", price: "", location: "", img_url: ""}
  errorMessages: string[] = [];
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


  createListing() {
    console.log("Create button clicked")
    this._httpService.addListing(this.newListing)
    .subscribe((responseData:any)=>{
      this.errorMessages = [];
      if(responseData.errors){
        for(var key in responseData.errors){
          this.errorMessages.push(responseData.errors[key].message);
        }
      } else {
        console.log("Adding listing")
        console.log(responseData)
        this._router.navigate(['browse'])
      }
    })
  }

}
