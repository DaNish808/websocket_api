import React, { PureComponent } from 'react';
import Msg from './Msg';

import { connect } from 'react-redux';
import { setUsername } from '../../state/actions/me';
import { setMembers, newMember, removeMember } from '../../state/actions/members';
import { receivePost, postAll } from '../../state/actions/messages';
import { plugSocket } from '../../state/actions/socket';

import './Chat.css';

class Chat extends PureComponent {

  async componentDidMount() {
    const { 
      setUsername, setMembers, newMember, 
      removeMember, plugSocket, receivePost 
    } = this.props;

    await plugSocket();
    const { socket } = this.props;

    socket.on('set-username', ({ newUsername }) => {
      setUsername(newUsername);
    });
    socket.on('all-members', members => {
      setMembers(members);
    });
    socket.on('message-all', msg => {
      receivePost(msg);
    });
    socket.on('member-update', ({ newUsername, oldUsername }) => {
      newMember(newUsername);
      if(oldUsername) removeMember(oldUsername);
    });
    socket.on('member-disconnect', username => {
      removeMember(username);
    });
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
          {messages.map((msg, i) => (
            <Msg
              key={i}
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
    messages: state.messages,
    socket: state.socket
  }),
  { 
    setUsername, setMembers, newMember, 
    removeMember, receivePost, postAll, 
    plugSocket }
)(Chat);