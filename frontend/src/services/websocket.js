import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const SOCKET_URL = 'http://localhost:8080/ws';

let stompClient = null;

export const connectSocket = (username, onMessage) => {
  const socket = new SockJS(SOCKET_URL);
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe(`/user/${username}/queue/messages`, (msg) => {
      onMessage(JSON.parse(msg.body));
    });
  });
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/chat.send', {}, JSON.stringify(message));
  }
};
