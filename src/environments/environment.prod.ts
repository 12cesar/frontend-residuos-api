import { SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://backen-api-residuos.herokuapp.com', options: {} };
export const environment = {
  production: true,
  urlHeroku: 'https://backen-api-residuos.herokuapp.com',
  wsService: config
};
