import React, { PureComponent } from 'react';
import Msg from './Msg';

import { connect } from 'react-redux';
import io from 'socket.io-client';
import { postAll } from '../../state/actions/messages';

import './Chat.css';

class Chat extends PureComponent {

  componentDidMount() {
    this.socket = io();
  }

  handlePost = e => {
    e.preventDefault();
    this.props.postAll(e.target.msgText.value);
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
        <form className="new-msg" onSubmit={this.handlePost}>
          <textarea name="msgText"/>
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
  { postAll }
)(Chat);