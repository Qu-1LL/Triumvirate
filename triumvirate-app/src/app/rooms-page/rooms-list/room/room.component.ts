import { Component, Input } from '@angular/core';
import { Room } from '../../../room';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../services/player.service'
import { RoomService } from '../../../services/room.service'
import { Router } from '@angular/router';
import { SessionService} from '../../../services/session.service';


@Component({
  selector: 'app-room',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  @Input() room!: Room;

  playerNames: string[] = []

  constructor (private playerService: PlayerService,
    private roomService: RoomService,
    private sessionService: SessionService,
    private router: Router) { }

  async joinRoom(): Promise<void> {
    console.log(this.room._id);
    console.log(this.sessionService.getSessionId());
    const roomId = await this.roomService.joinRoom(this.room._id,this.sessionService.getSessionId());
    this.router.navigate(['room/', roomId]);
  }

  get isInProgressText(): string {
    return this.room.inprogress ? "In Progress" : "Waiting";
  }

  async ngOnInit(): Promise<void> {
    this.room.players.forEach( async (uid) => {
      await this.playerService.getPlayerName(uid).then(player => {
        this.playerNames.push(player);
      }, (error) => {
        console.error('Error getting player names', error);
      });
    });
  }



}
