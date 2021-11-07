import { SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://192.168.2.156:5200', options: {} };
export const environment = {
  production: true,
  urlHeroku: 'http://192.168.2.156:5200',
  wsService: config
};
