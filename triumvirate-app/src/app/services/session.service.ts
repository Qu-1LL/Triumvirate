import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  apiUrl: string = 'http://localhost:5000'

  constructor(private http: HttpClient) {
   }

  setSessionId(newId: string) {
    sessionStorage.setItem('id',newId)
  }

  getSessionId() {
    return sessionStorage.getItem('id') ?? ''
  }

  setName(name: string) {
    sessionStorage.setItem('name',name)
  }

  getName() {
    return sessionStorage.getItem('name') ?? ''
  }

  async signOut() {
    try {
      await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/player/${sessionStorage.getItem('id')}`));
      console.log(sessionStorage.getItem('id'))
    } catch (error) {
      console.error('Failed to delete player with ID:',sessionStorage.getItem('id'),'. (may already be deleted) ', error)
    }
    sessionStorage.setItem('id','')
    sessionStorage.setItem('name','')
  }
}
