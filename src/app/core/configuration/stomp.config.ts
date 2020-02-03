import { StompConfig} from '@stomp/ng2-stompjs';
import { environment } from 'src/environments/environment';
import * as SockJS from "sockjs-client";
import { isDevMode } from '@angular/core';

export const FiscaliaStompConfig: StompConfig = {
  debug: isDevMode() && false,
  url: () => new SockJS(environment.webSocketHost),
  headers: {
    login: "guest",
    passcode: "guest"
  },
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 500
};
