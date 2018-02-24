import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Chat from '../Chat/Chat';
import Sky from './Sky';

import { 
  FRAME_INTERVAL,
  ACCELERATE, DECELERATE, BEAR_LEFT, BEAR_RIGHT, FIRE
} from '../../state/constants';

import { setUser, commandJet } from '../../state/actions/me';
import { 
  setMembers, newMember, memberUpdate, removeMember, 
  transmitEnemyOrders, updateEnemyJet } from '../../state/actions/members';
import { 
  updateUserMessages, receivePost,
  postAll, receiveMsgLog
} from '../../state/actions/messages';
import { plugSocket } from '../../state/actions/socket';
import { moveAll, updateJetStatus } from '../../state/actions/jet';
import { genProjectile } from '../../utils/jetPhysics';

import setListeners from '../../services/io';

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

    // location updates are sent when cycleCount === 0
    // cyclically increments to 59 then reverts to 0
    this.cycleCount = -1; 
  }



  /********* game animation drivers *********/
  runGame = () => {
    if(!this.cycleListener) this.timeCycle();
  }

  timeCycle = () => {
    const { 
      props: { userJet, moveAll, socket },
      commandOscillator, cycleCount
    } = this;

    // every other cycle, send all active commands
    // to avoid overloading server
    this.commandOscillator = !commandOscillator;
    if(userJet && commandOscillator) {
      this.sendActiveOrders();
    }

    // related to "TODO: think about refactoring game" in src/io.js
    this.cycleCount = cycleCount < 60 ? cycleCount + 1 : 0;

    this.cycleListener = setTimeout(() => {
      this.timeCycle();
      
      // actions per game loop
      moveAll(this.cycleCount);

    }, FRAME_INTERVAL);
  }

  sendActiveOrders = () => { 
    const { 
      user, userJet,
      socket
    } = this.props;
    
    const orders = [];
    for(let key in this.state) {
      if(/^Arrow/.test(key) && this.state[key]) {
        orders.push(this.keyCommandMap[key]);
      }
    }
    socket.emit('jet-order', orders);

    if(this.state.Shift)
      socket.emit('shoot', genProjectile(user, userJet));
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
  
  async componentDidMount() {
    
    await this.props.plugSocket();

    // pull all action creators from this.props 
    // and set as properties of actionCreators
    const actionCreators = (({ 
      setUser, 
      setMembers, newMember, memberUpdate, removeMember, 
      updateUserMessages, receivePost, receiveMsgLog,
      commandJet, transmitEnemyOrders, updateEnemyJet, updateJetStatus
    }) => ({
      setUser, 
      setMembers, newMember, memberUpdate, removeMember, 
      updateUserMessages, receivePost, receiveMsgLog,
      commandJet, transmitEnemyOrders, updateEnemyJet, updateJetStatus
    }))(this.props);

    setListeners(this.props.socket, actionCreators);
    
    this.props.socket.on('new-member', () => {
      this.cycleCount = -1;
    });

    
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
    user: {
      username: state.me.username,
      userHue: state.me.userHue
    },
    userJet: state.me.userJet,
    socket: state.socket
  }),
  { 
    setUser, 
    commandJet, transmitEnemyOrders, updateEnemyJet, 
    moveAll, updateJetStatus,
    receivePost, updateUserMessages, receiveMsgLog,
    setMembers, newMember, memberUpdate, removeMember, 
    plugSocket 
  }
)(JetChat);