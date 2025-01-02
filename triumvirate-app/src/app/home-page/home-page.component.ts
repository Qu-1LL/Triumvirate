import { Component } from '@angular/core';
import { StartComponent } from './start/start.component';
import { HelloWorldButtonComponent } from '../hello-world-button/hello-world-button.component';
import { RoomsButtonComponent } from '../rooms-button/rooms-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [StartComponent, HelloWorldButtonComponent, CommonModule, RoomsButtonComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComp {
  title = 'Triumvirate';
}
