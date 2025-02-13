import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Player } from '../player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl: string = 'http://localhost:5000'

  constructor(private http: HttpClient) { }

  async getPlayerName(uid: string): Promise<string> {
    try {
      const player: Player = await firstValueFrom(
        this.http.get<Player>(`${this.apiUrl}/player/${uid}`)
      );
      return player['playername']
    } catch (error) {
      console.error('Failed to get player info', error);
      return '';
    }
  }

  async getPlayer(uid: string): Promise<Player> {
    try {
      const player: Player = await firstValueFrom(
        this.http.get<Player>(`${this.apiUrl}/player/${uid}`)
      );
      return player
    } catch (error) {
      console.error('Failed to get player info', error);
      return {_id: '',
        ishost: false,
        inroom: false,
        hand:[],
        balance:0,
        activecards:[],
        playername:'',
        availableactions:[],
        __v:0
      }
    }
  }
}
