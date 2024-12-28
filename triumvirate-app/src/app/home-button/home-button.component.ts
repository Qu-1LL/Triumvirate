import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  imports: [CommonModule],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {
  text: string = 'Go Home';
  
  constructor( private router: Router) {
      
  }
  
  swapPage(): void {
    this.router.navigate(['/home']);
  }
}
