import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Settings from './components/Settings/Settings';
import Members from './components/Members/Members';
import Chat from './components/Chat/Chat';

import './App.css';

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <header className="banner" role="banner">
          <h1>hello {this.props.username}</h1>
          <Settings/>
        </header>
        <Members/>
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
