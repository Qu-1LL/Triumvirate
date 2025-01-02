import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Room } from '../../room';
import { RoomComponent } from './room/room.component';
import { RoomService } from '../../services/room-service.service';

@Component({
  selector: 'app-rooms-list',
  imports: [FormsModule, CommonModule, RoomComponent],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css'
})
export class RoomsListComponent {
  rooms: Room[] = [];


  constructor(private roomService: RoomService) {
    this.roomService.rooms$.subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });
  }
}