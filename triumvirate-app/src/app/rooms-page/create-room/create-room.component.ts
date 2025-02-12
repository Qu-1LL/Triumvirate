import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-create-room',
  imports: [CommonModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  text: string = 'Create a Room';

  constructor (private router: Router,
    private roomService: RoomService,
    private sessionService: SessionService
  ) {}

  async swapPage(): Promise<void> {
    const newRoom = await this.roomService.createRoom(this.sessionService.getSessionId());
    this.router.navigate(['room/' + newRoom])
  }
}
