import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom,BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'http://localhost:5000';

  currentRooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  rooms$: Observable<Room[]> = this.currentRooms.asObservable();

  constructor(private http: HttpClient) { }

  async getRooms(): Promise<void> {
    var rooms: Room[] = await firstValueFrom(
      this.http.get<Room[]>(`${this.apiUrl}/Rooms`));
      this.currentRooms = new BehaviorSubject<Room[]>(rooms);
      this.rooms$ = this.currentRooms.asObservable();
  }
}
