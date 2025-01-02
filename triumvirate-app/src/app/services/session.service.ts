import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionId: string = ''
  myName: string = ''

  constructor() { }

  setSessionId(newId: string) {
    this.sessionId = newId;
  }

  getSessionId() {
    return this.sessionId;
  }

  setName(name: string) {
    this.myName = name;
  }

  getName() {
    return this.myName;
  }
}
