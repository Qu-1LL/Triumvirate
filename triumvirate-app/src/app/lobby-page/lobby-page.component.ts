import { Component, OnInit, HostListener } from '@angular/core';
import { Room } from '../room';
import { ActivatedRoute} from '@angular/router';
import { RoomService } from '../services/room.service';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../services/player.service';
import { KickButtonComponent } from './kick-button/kick-button.component';
import { Player } from '../player';
import { SessionService } from '../services/session.service';
import { LobbyService } from '../services/lobby.service';

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

  host: Player = {_id: '',
    ishost: false,
    inroom: false,
    hand:[],
    balance:0,
    activecards:[],
    playername:'',
    availableactions:[],
    __v:0
  }

  isHost: boolean = false
  
  constructor (private route: ActivatedRoute,
    private roomService: RoomService,
    private playerService: PlayerService,
    private sessionService: SessionService,
    private lobbyService: LobbyService
  ) {
    this.roomService.getRoom(this.route.snapshot.paramMap.get('roomId') ?? '').then((myRoom: Room) => {
      this.room = myRoom;
    })
  }

  async ngOnInit(): Promise<void> {
    this.room.players.forEach( async (uid) => {
      await this.playerService.getPlayer(uid).then(player => {
        this.players.push(player);
      }, (error) => {
        console.error('Error getting player names', error);
      });
    });



    this.lobbyService.players$.subscribe((players: Player[]) => {
      this.players = players;
    });
    this.lobbyService.host$.subscribe((host: Player) => {
      this.host = host;
      this.isHost = this.host._id == this.sessionService.getSessionId()
      console.log('1:',this.host,'2:',this.sessionService.getSessionId())
    });
    
  }

  @HostListener('window:unload', ['$event'])
    onUnload(): void {
      if (this.sessionService.getSessionId() != '') {
        this.sessionService.signOut();
      }
    }
}
