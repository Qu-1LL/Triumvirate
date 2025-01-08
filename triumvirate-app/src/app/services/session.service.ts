import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionId: string = ''
  myName: string = ''
  apiUrl: string = 'http://localhost:5000'

  constructor(private http: HttpClient) { }

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

  async signOut() {
    console.log('Attempting to sign out ',this.sessionId);
    try {
      this.http.delete<void>(`${this.apiUrl}/player/${this.sessionId}`);
    } catch (error) {
      console.error('Failed to delete player with ID:',this.sessionId,'. (may already be deleted) ', error)
    }
  }
}
