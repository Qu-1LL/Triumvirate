import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  imports: [CommonModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  text: string = 'Create a Room';

  constructor (private router: Router) {}

  swapPage(): void {
    this.router.navigate(['/room/'])
  }
}
