import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/chatMessage.model'; 


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = [];
  user: string = 'usuario'; // Puedes cambiar este valor por el nombre del usuario que inicia sesión

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.listMessage();
  }

  // Método para enviar el mensaje
  sendMessage(): void {
    if (this.message) {
      // Agrega el mensaje localmente como enviado
      this.messages.push({ text: this.message, user: this.user, type: 'sent', date: new Date() });
      
      // Enviar el mensaje al backend
      this.chatService.sendMessage({ user: this.user, message: this.message });
      
      // Limpiar el campo de texto
      this.message = '';
      this.scrollToBottom(); // Forzar el scroll hacia abajo
    }
  }

  // Método para escuchar los mensajes recibidos
  listMessage(): void {
    this.chatService.getMessage().subscribe((data) => {
      console.log('Mensaje recibido:', data);

      // Solo agregar mensajes recibidos si NO son del propio usuario
      if (data.user !== this.user) {
        this.messages.push({
          text: data.message,
          user: data.user,
          date: data.date, // Almacenar la fecha
          type: 'received' // Mostrar como mensaje recibido
        });
      }
      
      this.scrollToBottom(); // Forzar el scroll hacia abajo cuando se recibe un mensaje
    });
  }

  // Método para hacer scroll automático al fondo
  scrollToBottom(): void {
    const messageContainer = document.querySelector('.chat-messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }
}
