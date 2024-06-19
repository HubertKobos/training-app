import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Training } from '../../types';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-add-training-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, CalendarModule],
  templateUrl: './add-training-popup.component.html',
  styleUrl: './add-training-popup.component.scss'
})
export class AddTrainingPopupComponent {
  @Input() display: boolean = false
  @Input() header!: string;
  @Output() confirm = new EventEmitter<Training>()
  @Output() displayChange = new EventEmitter<boolean>()

  initialTraining: Training = {
    userId: localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : 0,
    id: 0,
    date: new Date(),
    distanceKm: null,
    time: new Date(new Date().setHours(0, 0, 0)),
    kcal: null,
    comment: "",
    averageSpeed: 0,
  };

  training: Training = { ...this.initialTraining };

  onConfirm(){
    if(this.isFormValid()){
      console.log(this.isFormValid())
      this.confirm.emit(this.training)
      this.resetTraining();
      this.display = false;
      this.displayChange.emit(this.display)

    }else{
      console.log("Please fill all required fields")
    }
  }

  onCancel(){
    this.resetTraining();
    this.display = false
    this.displayChange.emit(this.display)
  }

  resetTraining() {
    this.training = { ...this.initialTraining };
  }

  isTimeMoreThan20SecondsFromMidnight(date: Date | null): boolean {
    if (date === null) return false;
    // calculate the time in milliseconds from midnight
    const timeInMillis = date.getHours() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
    // 20 seconds in milliseconds
    const twentySecondsInMillis = 20 * 1000;
    return timeInMillis > twentySecondsInMillis;
  }

  isFormValid(): boolean {
    return this.training.distanceKm !== null 
        && this.training.distanceKm !== 0 
        && (this.training.time instanceof Date && this.training.time !== this.initialTraining.time)
        && this.isTimeMoreThan20SecondsFromMidnight(this.training.time)
}

}
