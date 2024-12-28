import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-button',
  imports: [CommonModule],
  templateUrl: './rooms-button.component.html',
  styleUrl: './rooms-button.component.css'
})
export class RoomsButtonComponent {
  text: string = 'Join a Room!';
  
  username: string = '';

  constructor( private router: Router) {
    
  }

  swapPage(): void {
    this.router.navigate(['/rooms']);
  }

}
