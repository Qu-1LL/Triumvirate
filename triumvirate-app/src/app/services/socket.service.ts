import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  private readonly apiUrl:string = 'http://localhost:5000';

  constructor() {
    this.socket = io(this.apiUrl);
  }
  listenToEvent(eventName: string){
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);

      });
    });
  }
  emitEvent(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
