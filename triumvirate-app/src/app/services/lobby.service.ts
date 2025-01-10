import { Injectable, OnInit} from '@angular/core';
import { RoomService } from './room.service';
import { PlayerService } from './player.service';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom,BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { Player } from '../player';
import { Room } from '../room';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService implements OnInit {

  apiUrl = 'http://localhost:5000'

  private currentPlayers: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  players$: Observable<Player[]> = this.currentPlayers.asObservable();

  private currentHost: ReplaySubject<Player> = new ReplaySubject<Player>();
  host$: Observable<Player> = this.currentHost.asObservable();

  async checkHost(): Promise<void> {
    this.currentPlayers.getValue().forEach((player) => {
      if (player.ishost == true) {
        this.currentHost.next(player);
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

    this.currentHost = new ReplaySubject<Player>()
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

    console.log('Current players:', this.currentPlayers.getValue())
  }

  setRoomId(roomId: string): void {
    sessionStorage.setItem('roomId',roomId);
  }

  getRoomId(): string {
    return sessionStorage.getItem('roomId') ?? '';
  }

  ngOnInit(): void {
    const myPlayers: Player[] = []
    this.roomService.getRoom(this.getRoomId()).then((room) => {
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


  constructor(
    private http: HttpClient,
    private roomService: RoomService,
    private playerService: PlayerService,
    private sessionService: SessionService
  ) { }
}
