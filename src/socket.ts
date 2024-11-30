import { io } from 'socket.io-client';

const URL: string = process.env.NODE_ENV === 'production' ? `undefined` : 'http://192.168.0.22:5000';

export const socket = io(URL, {
  transports: ['websocket']
});