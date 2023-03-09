import { Socket, io } from 'socket.io-client';
import { AUTH_TOKEN_KEY } from '@/pages/auth/AuthContext';

export class SocketSingleton {
   private static instance: SocketSingleton | null;
   public socket: Socket;

   private constructor() {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      this.socket = io('http://localhost:2509', {
         auth: { token },
      });

      this.socket.on('connect', () => {
         console.log('Connected to server:', this.socket.id);
      });

      this.socket.on('log', (arg) => {
         console.log('Log from Server', arg);
      });
   }

   public static getInstance() {
      if (!SocketSingleton.instance) {
         SocketSingleton.instance = new SocketSingleton();
      }
      return SocketSingleton.instance;
   }

   public static disconnect() {
      SocketSingleton.instance?.socket.disconnect();
      SocketSingleton.instance = null;
   }
}
