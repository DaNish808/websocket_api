import React, { PureComponent } from 'react';
import io from 'socket.io-client';

import Msg from './Msg';

import './Chat.css';

class Chat extends PureComponent {

  componentDidMount() {
    this.socket = io();
  }

  render() {
    return (
      <section className="chat-box">
        <ul className="messages">
          <Msg 
            user="mie"
            text="hello!"
            timestamp={new Date()}
          />
          <Msg 
            user="me"
            text="hi!"
            timestamp={new Date()}
          />
        </ul>
        <form className="new-msg">
          <textarea/>
          <button type="submit">Send</button>
        </form>
      </section>
    );
  }
}

export default Chat;