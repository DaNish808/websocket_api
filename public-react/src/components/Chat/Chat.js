import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Msg from './Msg';
import Sky from '../Jets/Sky';

import { setUser } from '../../state/actions/me';
import { setMembers, newMember, removeMember } from '../../state/actions/members';
import { updateUserMessages, receivePost, postAll } from '../../state/actions/messages';
import { plugSocket } from '../../state/actions/socket';

import './Chat.css';

class Chat extends PureComponent {

  constructor() {
    super();
    this.state = {};
  }
  
  componentWillReceiveProps() {
    const { myHue } = this.props;
    this.setState({
      buttonHasFocus: false
    });
  }

  async componentDidMount() {
    const { 
      setUser, setMembers, 
      newMember, removeMember, updateUserMessages,
      plugSocket, receivePost 
    } = this.props;

    await plugSocket();
    const { socket } = this.props;

    socket.on('set-user', user => {
      updateUserMessages(user.newUsername, this.props.username);
      setUser(user);
    });
    socket.on('all-members', members => {
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
      if(oldUsername) {
        removeMember(oldUsername);
        updateUserMessages(newUsername, oldUsername);
      }
    });
    socket.on('member-disconnect', username => {
      removeMember(username);
    });
  }

  handleButtonFocus = e => {
    this.setState({
      ...this.state,
      buttonHasFocus: true
    });
  }
  
  handleButtonUnfocus = e => {
    this.setState({
      ...this.state,
      buttonHasFocus: false
    });
  }

  handlePost = e => {
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
    const { 
      username, myHue,
      messages, nameHueDict
    } = this.props;
    const { buttonHasFocus } = this.state;

    
    const normalButtonStyle = {
      background: `hsl(${myHue}, 40%, 93%)`, 
    };
    const focusButtonStyle = {
      background: `hsl(${myHue}, 40%, 85%)`,
      color: `hsl(${myHue}, 86%, 17%)`,
    };

    return (
      <section className="chat-box">
        <Sky/>
        <div className="message-box">
          <ul className="messages">
            {messages.map((msg, i) => {
              const user = msg.user;
              const myMsg = user === username;
              const systemMsg = user === 'system';

              return(
                <Msg
                  key={i}
                  msg={msg}
                  myMsg={myMsg}
                  hue={
                    systemMsg ?
                      0 :
                      myMsg ? 
                        myHue : 
                        nameHueDict[user]}
                  system={systemMsg}
                />
              );
            })}
          </ul>
        </div>
        <form className="new-msg" 
          onSubmit={this.handlePost}
          onKeyDown={this.handleCtrlEnterPost}
          style={{
            background: `-moz-linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            background: `-webkit-gradient(left top, right bottom, color-stop(0%, rgba(0,0,0,1)), color-stop(60%, rgba(0,0,0,1)), color-stop(100%, hsl(${myHue}, 86%, 27%)))`,
            background: `-webkit-linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            background: `-o-linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            background: `-ms-linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            background: `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
          }}
        >
          <textarea name="msgText"/>
          <button type="submit"
            onMouseEnter={this.handleButtonFocus} onFocus={this.handleButtonFocus}
            onMouseLeave={this.handleButtonUnfocus} onBlur={this.handleButtonUnfocus}
            style={buttonHasFocus ? focusButtonStyle : normalButtonStyle}
          >
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
    username: state.me.username,
    myHue: state.me.myHue,
    nameHueDict: state.members.reduce((dict, { username, userHue }) => {
      dict[username] = userHue;
      return dict;
    }, {}),
    messages: state.messages,
    socket: state.socket
  }),
  { 
    setUser, setMembers, newMember, removeMember, 
    receivePost, postAll, updateUserMessages,
    plugSocket }
)(Chat);