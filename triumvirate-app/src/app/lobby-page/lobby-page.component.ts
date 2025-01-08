import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { ActivatedRoute} from '@angular/router';
import { RoomService } from '../services/room.service';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../services/player.service';
import { KickButtonComponent } from './kick-button/kick-button.component';
import { Player } from '../player';

@Component({
  selector: 'app-lobby-page',
  imports: [CommonModule, KickButtonComponent],
  templateUrl: './lobby-page.component.html',
  styleUrl: './lobby-page.component.css'
})
export class LobbyPageComp implements OnInit{
  title: string = 'Lobby'
  room: Room = {_id:'',
    maxplayers:0,
    playercount:0,
    roomname:'',
    inprogress:false,
    players:[],
    deck:[],
    treasury:0,
    turnOrder:[],
    currentPlayerTurn:'',
    __v:0};
  players: Player[] = []
  
  constructor (private route: ActivatedRoute,
    private roomService: RoomService,
    private playerService: PlayerService
  ) {
    this.roomService.getRoom(this.route.snapshot.paramMap.get('roomId') ?? '').then((myRoom: Room) => {
      this.room = myRoom;
    })
  }

  ngOnInit(): void {
    this.room.players.forEach( async (uid) => {
      await this.playerService.getPlayer(uid).then(player => {
        this.players.push(player);
      }, (error) => {
        console.error('Error getting player names', error);
      });
    });
    
  }
}
