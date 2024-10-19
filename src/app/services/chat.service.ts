import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(data: { user: string, message: string }) {
    // Enviar mensaje al servidor con el usuario y el mensaje
    this.socket.emit('message', data);
  }

  getMessage() {
    // Recibir mensaje desde el servidor
    return this.socket.fromEvent<any>('message-receive');
  }
}
