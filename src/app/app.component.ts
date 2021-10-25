import { Component } from '@angular/core';
import { WebsocketService } from './sockets/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';
  constructor(private wsService: WebsocketService){}
}
