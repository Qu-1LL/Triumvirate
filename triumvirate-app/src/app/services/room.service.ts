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

  async joinRoom(rid: string, pid: string): Promise<string> {
    try {
      const joinedRoom: Room = await firstValueFrom(
        this.http.put<Room>(`${this.apiUrl}/rooms/join`,{'roomId': rid,'playerId': pid})
      )
      console.log(joinedRoom);
      return joinedRoom._id;
    } catch (error) {
      console.error('Could not join the requested room:', error);
      return '';
    }
  }
}
