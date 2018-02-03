import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Settings from './components/Settings/Settings';
import Chat from './components/Chat/Chat';

import './App.css';

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <header role="banner">
          <h1>hello</h1>
          <Settings/>
        </header>
        <Chat/>
      </div>
    );
  }
}

export default connect(
  state => ({
    username: state.me.username
  }),
  null
)(App);
