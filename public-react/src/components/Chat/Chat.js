import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Msg from './Msg';

import './Chat.css';

class Chat extends PureComponent {

  componentDidMount() {
    this.socket = io();
  }

  render() {
    const { me, messages } = this.props;

    return (
      <section className="chat-box">
        <ul className="messages">
          {messages.map(msg => (
            <Msg
              msg={msg}
              myMsg={msg.user === me.username}
            />
          ))}
        </ul>
        <form className="new-msg">
          <textarea/>
          <button type="submit">Send</button>
        </form>
      </section>
    );
  }
}

export default connect(
  state => ({
    me: state.me,
    messages: state.messages
  }),
  null
)(Chat);