import { Component } from '@angular/core';
import { RoomsButtonComponent } from '../rooms-button/rooms-button.component';
import { HelloWorldButtonComponent } from '../hello-world-button/hello-world-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [RoomsButtonComponent, HelloWorldButtonComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComp {
  title = 'Triumvirate';
}
