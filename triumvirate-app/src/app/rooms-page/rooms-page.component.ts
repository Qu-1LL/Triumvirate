import { Component } from '@angular/core';
import { HomeButtonComponent } from '../home-button/home-button.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';

@Component({
  selector: 'app-rooms-page',
  imports: [HomeButtonComponent, RoomsListComponent],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.css'
})
export class RoomsPageComp {
  title = 'Lobby'
}
