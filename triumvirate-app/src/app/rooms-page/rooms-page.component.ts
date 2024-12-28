import { Component } from '@angular/core';
import { HomeButtonComponent } from '../home-button/home-button.component'

@Component({
  selector: 'app-rooms-page',
  imports: [HomeButtonComponent],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.css'
})
export class RoomsPageComp {
  title = 'Lobby'
}
