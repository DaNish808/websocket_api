import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Settings from './components/Settings/Settings';
import Members from './components/Members/Members';
import Chat from './components/Chat/Chat';

import './App.css';

class App extends PureComponent {
  render() {
    const { username, myHue } = this.props;

    return (
      <div className="App">
        <header className="banner" role="banner"
          style={{
            background: `-moz-linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            background: `-webkit-gradient(left bottom, right top, color-stop(0%, rgba(0,0,0,1)), color-stop(60%, rgba(0,0,0,1)), color-stop(100%, hsl(${myHue}, 86%, 27%)))`,
            background: `-webkit-linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            background: `-o-linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            background: `-ms-linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            background: `linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, hsl(${myHue}, 86%, 27%) 100%)`,
            color: `hsl(${myHue}, 86%, 88%)`
          }}
        >
          <h1>
            hello,
            <span style={{
              color: `hsl(${myHue}, 100%, 50%)`
            }}> {username}</span>
          </h1>
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
    username: state.me.username,
    myHue: state.me.myHue
  }),
  null
)(App);
