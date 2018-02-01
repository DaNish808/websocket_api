import React, { PureComponent } from 'react';
import io from 'socket.io-client';
import './Chat.css';

class Chat extends PureComponent {

  componentDidMount() {
    this.socket = io();
  }

  render() {
    return (
      <section>
        chaaaaaat
      </section>
    );
  }
}

export default Chat;