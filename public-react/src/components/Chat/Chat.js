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

    socket.on('set-user', (user) => {
      setUsername(user);
    });
    socket.on('all-members', members => {
      console.log(members);
      setMembers(members);
    });
    socket.on('message-all', msg => {
      receivePost(msg);
    });
    socket.on('member-update', ({ userHue, newUsername, oldUsername }) => {
      newMember({
        username: newUsername,
        userHue
      });
      if(oldUsername) removeMember(oldUsername);
    });
    socket.on('member-disconnect', username => {
      removeMember(username);
    });
  }

  handlePost = e => {
    console.log(e.target);
    e.preventDefault();
    const msgEl = e.target.msgText;
    this.postMsg(msgEl);
  }
  
  handleCtrlEnterPost = e => {
    if(e.ctrlKey && e.key === 'Enter') {
      this.postMsg(e.target);
    }
  }
  
  postMsg = textboxEl => {
    this.props.postAll(textboxEl.value);
    textboxEl.value = '';  
  }

  render() {
    const { me, messages } = this.props;

    return (
      <section className="chat-box">
        <div className="message-box">
          <ul className="messages">
            {messages.map((msg, i) => {
              const user = msg.user;
              const myMsg = user === me.username;

              return(
                <Msg
                  key={i}
                  msg={msg}
                  myMsg={myMsg}
                />
              );
            })}
          </ul>
        </div>
        <form className="new-msg" 
          onSubmit={this.handlePost}
          onKeyDown={this.handleCtrlEnterPost}
        >
          <textarea name="msgText"/>
          <button type="submit">
            Send<br/>
            <span>(Ctrl + Enter)</span>
          </button>
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