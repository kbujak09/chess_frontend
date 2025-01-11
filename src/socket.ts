import { io } from 'socket.io-client';

const URL: string = process.env.NODE_ENV === 'production' ? `undefined` : 'localhost:5000';

export const socket = io(URL, {
  transports: ['websocket']
});