import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserData } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    
  ) {
    axios.defaults.baseURL = "http://localhost:8080"
    axios.defaults.headers.post["Content-Type"] = "application/json"
   }

   request(method: string, url: string, data: any): Promise<any>{
    let headers = {} 

    if (this.getAuthToken() !== null){
      headers = {"Authorization": "Bearer " + this.getAuthToken()}
    }
    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
   }

   getAuthToken(): string | null{
    return window.localStorage.getItem("auth_token")
   }

   setUserData(responseData: UserData | null): void{
    if (responseData !== null) {
      const userData: UserData = responseData
      localStorage.setItem('userId', userData.id.toString());
      localStorage.setItem('auth_token', userData.token);
   }

  }

   setAuthToken(token: string | null): void{
    if(token !== null) {
      window.localStorage.setItem("auth_token", token)
    }else{
      window.localStorage.removeItem("auth_token")
    }
   }
  
}
