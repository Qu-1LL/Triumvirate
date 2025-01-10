import { Component, Input } from '@angular/core';
import { Room } from '../../../room';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../services/player.service'
import { Router } from '@angular/router';
import { SessionService} from '../../../services/session.service';
import { LobbyService } from '../../../services/lobby.service';


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
    private lobbyService: LobbyService,
    private sessionService: SessionService,
    private router: Router) { }

  async joinRoom(): Promise<void> {
    console.log(this.room._id);
    console.log(this.sessionService.getSessionId());
    await this.lobbyService.joinRoom(this.room._id);
    this.router.navigate(['room/', this.room._id]);
  }

  get isInProgressText(): string {
    return this.room.inprogress ? "In Progress" : "Waiting";
  }

  async ngOnInit(): Promise<void> {
    this.room.players.forEach( async (uid) => {
      await this.playerService.getPlayer(uid).then((player) => {
        this.playerNames.push(player['playername']);
      }, (error) => {
        console.error('Error getting player names', error);
      });
    });
  }



}
