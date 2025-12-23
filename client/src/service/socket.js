import { io } from 'socket.io-client';

const socket = io('https://localconnect-backend-81u0.onrender.com');

export default socket;