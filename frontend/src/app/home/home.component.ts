import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AddTrainingPopupComponent } from '../add-training-popup/add-training-popup.component';
import { Training } from '../../types';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { EditTrainingPopupComponent } from '../edit-training-popup/edit-training-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, AddTrainingPopupComponent, ConfirmPopupModule, EditTrainingPopupComponent],
  providers: [DatePipe, ConfirmationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild("deleteButton") deleteButton: any;
  @Input() training!: Training
  
  data: Training[] = []
  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;
  selectedTraining: Training = {
    userId: localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : 0,
    id: 0,
    date: new Date(),
    distanceKm: null,
    time: new Date(new Date().setHours(0, 0, 0)),
    kcal: null,
    comment: "",
    averageSpeed: 0,
  };
  
  constructor(private apiService: ApiService, private datePipe: DatePipe, private confirmationService: ConfirmationService) {
    
  }

  ngOnInit(): void{
    this.getTrainings()
  }
      getTrainings(): void{
        const userId = localStorage.getItem("userId")
        this.apiService.request(
          "GET",
          `users/${userId}/trainings`,
          {}
          ).then(
            (response) =>{
              this.data = response.data
              console.log(response.data)
            } 
            )
      }
      
      toggleEditPopup(training: Training){
        this.selectedTraining = {...training};
        this.displayEditPopup = true;
      }

      onConfirmEdit(training: Training){
        this.editTraining(training);
        this.displayEditPopup = false;
      }

      toggleAddPopup(){
        this.displayAddPopup = true
      }
      
      onConfirmAdd(training: Training){
        this.addTraining(training)
        this.displayAddPopup = false;
      }

      confirmDelete(training: Training){
        this.confirmationService.confirm({
          target: this.deleteButton.nativeElement,
          message: "Are your sure that you want to delete this training?",
          accept: () =>{
            this.deleteTraining(training)
          }
        })
      }
      
      deleteTraining(training: Training){
        const userId = localStorage.getItem("userId")
        if(!training.id){
          return;
        }

        this.apiService.request(
          "DELETE",
          `/users/${userId}/trainings/${training.id}`,
          {}
        ).then(response =>{
          this.getTrainings()
        })
      }
      
      editTraining(training: Training){
        const userId = localStorage.getItem("userId")
        const formattedDate = this.datePipe.transform(training.date, 'yyyy-MM-dd');
        const formatedTime: string = training.time instanceof Date ? this.convertDateToLocalTime(training.time) : '';
        const requestBody = {
          ...training,
          date: formattedDate,
          time: formatedTime
        };

        this.apiService.request(
          "PUT",
          `/users/${userId}/trainings`,
          requestBody
        ).then(response =>{
          this.getTrainings()
        })
      }

      convertDateToLocalTime(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      }

      addTraining(training: Training){
        const formattedDate = this.datePipe.transform(training.date, 'yyyy-MM-dd');
        
        const formatedTime: string = training.time instanceof Date ? this.convertDateToLocalTime(training.time) : '';

        const requestBody = {
          ...training,
          date: formattedDate,
          time: formatedTime
        };
        console.log(requestBody)
        this.apiService.request(
          "POST",
          "/users/trainings",
          requestBody
        ).then(response =>{
          this.getTrainings()
        })
      }
    }
