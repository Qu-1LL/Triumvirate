import { Injectable } from '@angular/core';
import { RoomService } from './room.service';
import { PlayerService } from './player.service';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom,BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../player';
import { Room } from '../room';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  apiUrl = 'http://localhost:5000'

  private currentPlayers: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  players$: Observable<Player[]> = this.currentPlayers.asObservable();

  private currentHost: BehaviorSubject<Player> = new BehaviorSubject<Player>({_id: '',
    ishost: false,
    inroom: false,
    hand:[],
    balance:0,
    activecards:[],
    playername:'',
    availableactions:[],
    __v:0
  });
  host$: Observable<Player> = this.currentHost.asObservable();

  async checkHost(): Promise<void> {
    this.currentPlayers.getValue().forEach((player) => {
      if (player.ishost) {
        this.currentHost = new BehaviorSubject<Player>(player);
        this.host$ = this.currentHost.asObservable();
      }
    })
  }
  
  async leaveRoom(): Promise<void> {

    try {
      this.http.put<Room>(`${this.apiUrl}/lobby/leave`,{'roomId': this.getRoomId(),'playerId': this.sessionService.getSessionId()})
    } catch (error) {
      console.error('Could not join the requested room:', error);
    }

    this.setRoomId('')
    this.currentPlayers = new BehaviorSubject<Player[]>([]);
    this.players$ = this.currentPlayers.asObservable();

    this.currentHost = new BehaviorSubject<Player>({_id: '',
      ishost: false,
      inroom: false,
      hand:[],
      balance:0,
      activecards:[],
      playername:'',
      availableactions:[],
      __v:0
    })
    this.host$ = this.currentHost.asObservable();
  }

  async joinRoom(roomId: string): Promise<void> {

    try {
      const joinedRoom: Room = await firstValueFrom(
        this.http.put<Room>(`${this.apiUrl}/lobby/join`,{'roomId': roomId,'playerId': this.sessionService.getSessionId()})
      )
      console.log(joinedRoom);
    } catch (error) {
      console.error('Could not join the requested room:', error);
    }

    this.setRoomId(roomId)
    const myPlayers: Player[] = []
    this.roomService.getRoom(roomId).then((room) => {
      room.players.forEach((playerId) => {
        this.playerService.getPlayer(playerId).then(player => {
          myPlayers.push(player)
        })
      })
    })

    this.currentPlayers = new BehaviorSubject<Player[]>(myPlayers);
    this.players$ = this.currentPlayers.asObservable()
    this.checkHost()
  }

  setRoomId(roomId: string): void {
    sessionStorage.setItem('roomId',roomId);
  }

  getRoomId(): string {
    return sessionStorage.getItem('roomId') ?? '';
  }


  constructor(
    private http: HttpClient,
    private roomService: RoomService,
    private playerService: PlayerService,
    private sessionService: SessionService
  ) { }
}
