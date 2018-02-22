import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  loginUser(userObj){
    console.log("login user")
    return this._http.post('/api/users', userObj)
  }

  getCurrentUser(){
    return this._http.get('/api/users/current')
  }

}

