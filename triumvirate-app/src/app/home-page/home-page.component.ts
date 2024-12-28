import { Component } from '@angular/core';
import { RoomsButtonComponent } from '../rooms-button/rooms-button.component'

@Component({
  selector: 'app-home-page',
  imports: [RoomsButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComp {
  title = 'Triumvirate';
}
