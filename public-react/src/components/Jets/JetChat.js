import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Chat from '../Chat/Chat';
import Sky from './Sky';

import { 
  FRAME_INTERVAL,
  ACCELERATE, DECELERATE, BEAR_LEFT, BEAR_RIGHT, FIRE
} from '../../state/constants';
import { moveAll } from '../../state/actions/jet';

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
    
    this.keyCommandMap = {
      ArrowUp: ACCELERATE,
      ArrowDown: DECELERATE,
      ArrowLeft: BEAR_LEFT,
      ArrowRight: BEAR_RIGHT,
      Shift: FIRE
    };

    this.commandOscillator = 0;
    this.cycleListener = null;
  }



  /********* game animation drivers *********/
  runGame = () => {
    if(!this.cycleListener) this.timeCycle();
  }

  timeCycle = () => {
    // every other cycle, send all active commands
    this.commandOscillator = !this.commandOscillator;
    if(this.props.userJet && this.commandOscillator) {
      this.sendActiveOrders();
    }

    this.cycleListener = setTimeout(() => {
      this.timeCycle();
      
      // actions per game loop
      this.props.moveAll();

    }, FRAME_INTERVAL);
  }

  sendActiveOrders = () => { 

    const orders = [];
    for(let key in this.state) {
      if(this.state[key]) {
        orders.push(this.keyCommandMap[key]);
      }
    }
    this.props.socket.emit('jet-order', orders);
  }
  


  /********* game input handler ***********/
  onKey = toggle => ({ key }) => {
    
    if(
      // the key is a relevant command and
      /^(Arrow|Shift)/.test(key) &&
      // the user has a jet
      this.props.userJet
    ) {
      const toggleIsOn = toggle === 'on';
      if(
        // switches off a command or
        // switches on a command that was off...
        (!toggleIsOn ||
        (toggleIsOn && !this.state[key]))
      ) {
  
        if(toggleIsOn) this.props.socket.emit('jet-order', this.keyCommandMap[key]);
  
        const newState = { ...this.state };
        newState[key] = toggleIsOn;
  
        this.setState(newState);
      }
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
  state => ({
    userJet: state.me.userJet,
    socket: state.socket
  }),
  { moveAll }
)(JetChat);