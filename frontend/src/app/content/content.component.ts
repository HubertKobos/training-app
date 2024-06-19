import { Component } from '@angular/core';
import { WelcomeContentComponent } from '../welcome-content/welcome-content.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { ApiService } from '../services/api.service';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AddTrainingPopupComponent } from '../add-training-popup/add-training-popup.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [WelcomeContentComponent, LoginFormComponent, HomeComponent, CommonModule, HeaderComponent, AddTrainingPopupComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  componentToShow: string = "login"
  isUserLogged: boolean = false;

  constructor(private apiService: ApiService){}

  ngOnInit(): void{
    const token = localStorage.getItem("auth_token")
    if(token){
      this.isUserLogged = true;
      this.showComponent('home')
    }
  }

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  onLogout(): void {
    this.isUserLogged = false;
    window.localStorage.removeItem("auth_token")
    window.localStorage.removeItem("userId")
    this.showComponent('login')
  }

  onLogin(input: any): void{
    this.apiService.request(
      "POST",
      "/login",
      {
        login: input.login,
        password: input.password
      }
    ).then(response =>{
      this.apiService.setUserData(response.data)
      this.isUserLogged = true
      this.componentToShow = "home"
    })
  }

  onRegister(input: any): void{
    this.apiService.request(
      "POST",
      "/register",
      {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
        password: input.password
      }
    ).then(response =>{
      this.apiService.setUserData(response.data)

      this.isUserLogged = true
      this.componentToShow = "home"
    })
  }


  
}
