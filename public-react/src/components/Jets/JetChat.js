import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Chat from '../Chat/Chat';
import Sky from './Sky';

import './Sky.css';


class JetChat extends PureComponent {
  
  /********* game event handlers ***********/
  onKey = toggle => ({ key }) => {
    if(/^(Arrow|Shift)/.test(key)) {
      console.log('action:', key);
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