import { Component } from '@angular/core';
import { Room } from '../room';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-lobby-page',
  imports: [],
  templateUrl: './lobby-page.component.html',
  styleUrl: './lobby-page.component.css'
})
export class LobbyPageComp {
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
  
  constructor (private route: ActivatedRoute,
    private roomService: RoomService
  ) {
    this.roomService.getRoom(this.route.snapshot.paramMap.get('roomId') ?? '').then((myRoom: Room) => {
      this.room = myRoom;
      window.location.reload();
    })
  }

}
