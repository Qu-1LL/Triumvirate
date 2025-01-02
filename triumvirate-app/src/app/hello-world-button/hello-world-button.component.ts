import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Room } from '../room';

@Component({
  selector: 'app-hello-world-button',
  imports: [CommonModule],
  templateUrl: './hello-world-button.component.html',
  styleUrl: './hello-world-button.component.css'
})
export class HelloWorldButtonComponent {
  text: string = 'Hello World!'

  apiUrl: string = 'http://localhost:5000'

  constructor(private http: HttpClient) { }

  async sendHelloWorld(): Promise<void> {
    try {
      const helloString: Room[] = await firstValueFrom(
        this.http.get<Room[]>(`${this.apiUrl}/rooms`)
      );
      console.log(helloString);
    } catch (error) {
      console.error('Error', error);
      return;
    }
  } 
}
