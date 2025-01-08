import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, throwError, firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../player';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-start',
  imports: [FormsModule, CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnDestroy {
  name: string = '';
  apiUrl: string = 'http://localhost:5000';
  private destroy$ = new Subject<void>();

  constructor (
    private router: Router,
    private http: HttpClient,
    private session: SessionService
  ) {}

  startPlayer(): void {
    if (this.name.trim()) {
      this.callPostPlayer(this.name);
    } 
  }


  async callPostPlayer(username: string): Promise<void> {
    try {
      const newPlayer: Player = await firstValueFrom(
        this.http.post<Player>(`${this.apiUrl}/player/${username}`,{observable: "response"})
      );
      this.session.setSessionId(newPlayer._id);
      this.session.setName(newPlayer.playername);
      } catch (error) {
      console.log('Error',error);
      return;
    }
    this.router.navigate(['/rooms']);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
