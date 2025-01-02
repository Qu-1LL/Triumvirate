import { Component, Input } from '@angular/core';
import { Room } from '../../../room';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Player } from '../../../player';

@Component({
  selector: 'app-room',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  @Input() room!: Room;

  isInProgress: string = "Waiting" //this.room.inprogress ? "In Progress" : "Waiting";
}
