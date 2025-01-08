import { Component, Input } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-kick-button',
  imports: [],
  templateUrl: './kick-button.component.html',
  styleUrl: './kick-button.component.css'
})
export class KickButtonComponent {
  @Input() id!: string;
  @Input() roomId!: string;

  constructor (private roomService: RoomService,
    private sessionService: SessionService
  ) {}

  kickPlayer(): void {
    this.roomService.kickPlayer(this.roomId,this.sessionService.getSessionId(),this.id);
  }


}
