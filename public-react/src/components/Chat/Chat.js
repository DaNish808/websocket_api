import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Msg from './Msg';
import Sky from '../Jets/Sky';

import { postAll } from '../../state/actions/messages';

import { TAKE_OFF } from '../../state/constants';

import './Chat.css';

class Chat extends PureComponent {

  constructor() {
    super();
    this.state = {};
  }
  
  componentWillReceiveProps() {
    const { userHue } = this.props;
    this.setState({
      buttonHasFocus: false
    });
  }


  /********* message event handlers ***********/
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
    const { postAll, userJet, socket } = this.props;
    
    if(!userJet) socket.emit('jet-order', TAKE_OFF);
    
    postAll(textboxEl.value);
    
    textboxEl.value = '';  
  }
  

  render() {
    const { 
      username, userHue,
      messages, nameHueDict, children
    } = this.props;
    const { buttonHasFocus } = this.state;

    const normalButtonStyle = {
      background: `hsl(${userHue}, 40%, 93%)`, 
    };
    const focusButtonStyle = {
      background: `hsl(${userHue}, 40%, 85%)`,
      color: `hsl(${userHue}, 86%, 17%)`,
    };

    return (
      <section className="chat-box">
        {children}
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
                        userHue : 
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
            background: `-moz-linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${userHue}, 86%, 27%) 100%)`,
            background: `-webkit-gradient(left top, right bottom, color-stop(0%, rgba(0,0,0,1)), color-stop(60%, rgba(0,0,0,1)), color-stop(100%, hsl(${userHue}, 86%, 27%)))`,
            background: `-webkit-linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${userHue}, 86%, 27%) 100%)`,
            background: `-o-linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${userHue}, 86%, 27%) 100%)`,
            background: `-ms-linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${userHue}, 86%, 27%) 100%)`,
            background: `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${userHue}, 86%, 27%) 100%)`,
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
    userHue: state.me.userHue,
    userJet: state.me.userJet,
    nameHueDict: state.members.reduce((dict, { username, userHue }) => {
      dict[username] = userHue;
      return dict;
    }, {}),
    messages: state.messages,
    socket: state.socket
  }),
  { postAll }
)(Chat);