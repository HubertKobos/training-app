import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Training } from '../../types';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-edit-training-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, CalendarModule],
  templateUrl: './edit-training-popup.component.html',
  styleUrl: './edit-training-popup.component.scss'
})
export class EditTrainingPopupComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter()
  @Input() header!: string;

  @Input() training: Training = {
    userId: localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : 0,
    id: 0,
    date: new Date(),
    distanceKm: null,
    time: new Date(new Date().setHours(0, 0, 0)),
    kcal: null,
    comment: "",
    averageSpeed: 0,
  };

  @Output() confirm = new EventEmitter<Training>()
  initialTrainingTime = new Date(new Date().setHours(0, 0, 0));

  onConfirm(){
    if(this.isFormValid()){
      this.confirm.emit(this.training)
      this.display = false;
      this.displayChange.emit(this.display)
      
    }else{
      console.log("Please fill required fields")
    }
  }

  onCancel(){
    this.display = false
    this.displayChange.emit(this.display)
  }

  parseTimeString(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  }

  isTimeMoreThan20SecondsFromMidnight(date: Date | null): boolean {

    if (date === null) return false;
    if (typeof date === 'string') {
      date = this.parseTimeString(date);
    }

    // calculate the time in milliseconds from midnight
    const timeInMillis = date.getHours() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
    // 20 seconds in milliseconds
    const twentySecondsInMillis = 20 * 1000;

    return timeInMillis > twentySecondsInMillis;
  }

  isFormValid(): boolean {
    if(typeof this.training.time === 'string'){
      this.training.time = this.parseTimeString(this.training.time)
    }
    return this.training.distanceKm !== null 
        && this.training.distanceKm !== 0 
        && (this.training.time instanceof Date && this.training.time !== this.initialTrainingTime)
        && this.isTimeMoreThan20SecondsFromMidnight(this.training.time)
}
}
