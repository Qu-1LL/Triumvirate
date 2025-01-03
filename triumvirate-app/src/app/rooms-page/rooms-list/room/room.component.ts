import { Component, Input } from '@angular/core';
import { Room } from '../../../room';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Player } from '../../../player';
import { PlayerService } from '../../../services/player.service'


@Component({
  selector: 'app-room',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  @Input() room!: Room;

  playerNames: string[] = []

  constructor (private playerService: PlayerService) { }


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
