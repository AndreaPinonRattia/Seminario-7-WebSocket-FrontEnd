export interface ChatMessage {
  text: string;       // El texto del mensaje
  user?: string;     // El autor del mensaje (opcional)
  date?: Date;       // La fecha del mensaje (opcional)
  type: 'sent' | 'received'; // Solo estos dos tipos
}
