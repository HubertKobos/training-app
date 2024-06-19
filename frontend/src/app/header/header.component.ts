import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Button, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() pageTitle!: string;
  @Input() logoSrc!: string;
  @Input() isUserLogged: boolean = false;
  @Output() logoutEvent = new EventEmitter()

  logout() {
    this.logoutEvent.emit();
  }
}
