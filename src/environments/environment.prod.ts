import { SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:5200', options: {} };
export const environment = {
  production: true,
  urlHeroku: 'https://backen-api-residuos.herokuapp.com',
  wsService: config
};
