import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Chat from '../Chat/Chat';
import Sky from './Sky';

import './Sky.css';


class JetChat extends PureComponent {

  constructor() {
    super();
    this.state = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      Shift: false 
    };
  }
  
  /********* game event handlers ***********/
  onKey = toggle => ({ key }) => {
    if(/^(Arrow|Shift)/.test(key)) {
      toggle = toggle === 'on';

      const newState = { ...this.state };
      newState[key] = toggle;

      this.setState(newState);
    }
  }

  render() {
    return (
      <div className="jet-chat" 
        onKeyDown={this.onKey('on')}
        onKeyUp={this.onKey('off')}
      >
        <Chat>
          <Sky/>
        </Chat>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  null
)(JetChat);