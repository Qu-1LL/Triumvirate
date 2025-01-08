import { Component, HostListener } from '@angular/core';
import { HomeButtonComponent } from '../home-button/home-button.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-rooms-page',
  imports: [HomeButtonComponent, RoomsListComponent],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.css'
})
export class RoomsPageComp {
  title = 'Lobby'

  constructor (private sessionService: SessionService) {}

  @HostListener('window:unload', ['$event'])
  onUnload(): void {
    if (this.sessionService.getSessionId() != '') {
      this.sessionService.signOut();
    }
  }

  

}
