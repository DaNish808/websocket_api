import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Chat from '../Chat/Chat';
import Sky from './Sky';

import { FRAME_INTERVAL } from '../../state/constants';

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

  /********* game animation drivers *********/
  runGame = () => {
    this.commandCycle();
  }

  commandCycle = () => {
    setTimeout(() => {
      this.commandCycle();

      console.log(`${this.state.ArrowUp ? '^' : ' '}${this.state.ArrowDown ? 'v' : ' '}${this.state.ArrowLeft ? '<' : ' '}${this.state.ArrowRight ? '>' : ' '}${this.state.Shift ? '*' : ' '}`);

    }, FRAME_INTERVAL);
  }
  
  /********* game event handlers ***********/
  onKey = toggle => ({ key }) => {
    
    if(
      /^(Arrow|Shift)/.test(key) &&
      (toggle === 'on' && !this.state[key]) || toggle === 'off'
    ) {

      const newState = { ...this.state };
      newState[key] = toggle === 'on';

      this.setState(newState);
    }
  }

  componentDidMount = () => {
    this.runGame();
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