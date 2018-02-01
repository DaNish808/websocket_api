import React, { PureComponent } from 'react';
import io from 'socket.io-client';

import Chat from './components/Chat/Chat';

import './App.css';

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <h1>hello again!</h1>
        <Chat/>
      </div>
    );
  }
}

export default App;
