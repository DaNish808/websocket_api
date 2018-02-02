import io from 'socket.io-client';
import { PLUG_SOCKET } from '../constants';

export const plugSocket = () => ({
  type: PLUG_SOCKET,
  payload: io()
});