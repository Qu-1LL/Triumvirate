import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom,BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'http://localhost:5000';

  private currentRooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  rooms$: Observable<Room[]> = this.currentRooms.asObservable();

  constructor(private http: HttpClient) { }

  async getRooms(): Promise<void> {
    try {
      const rooms: Room[] = await firstValueFrom(
        this.http.get<Room[]>(`${this.apiUrl}/rooms`)
      );
      this.currentRooms.next(rooms);
      
    } catch (error) {
      console.error('Failed to get rooms:', error);
    }
  }

  async getRoom(roomId: string): Promise<Room> {
    try {
      const room: Room = await firstValueFrom(
        this.http.get<Room>(`${this.apiUrl}/room/${roomId}`)
      );
      return room;

    } catch (error) {
      console.error('Failed to get the room with Id: ',roomId,' ', error)
      return {_id:'',
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
    }
  }

  async createRoom(pid: string): Promise<string> {
    try {
      const createdRoom: Room = await firstValueFrom(
        this.http.post<Room>(`${this.apiUrl}/rooms/${pid}`,{observable: 'response'})
      );
      return createdRoom._id;
    } catch (error) {
      console.error('Could not create room:', error);
      return '';
    }
  }

  async kickPlayer(roomId: string, playerId: string, playerToKickId: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.put<Room>(`${this.apiUrl}/lobby/kick`,
          {observable: 'response', 
            'roomId': roomId,
            'playerId': playerId,
            'playerToKickId': playerToKickId })
      )
    } catch (error) {
      console.error('Could not kick player,', error);
    }
  }

  async setHost(roomId: string, playerId: string, playerToHostId: string): Promise<void> {
    try {
      await firstValueFrom(
        this.http.put<Room>(`${this.apiUrl}/rooms/host`,{
          observable: 'response',
          'roomId': roomId,
          'playerId': playerId,
          'playerToHostId': playerToHostId
        })
      )
    } catch (error) {
      console.error('Could not transfer host,', error);
    }
  }
}


