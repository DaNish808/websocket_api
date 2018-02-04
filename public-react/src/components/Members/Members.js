import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import './Members.css';

class Members extends PureComponent {

  render() {
    const { myHue, members } = this.props;
    return (
      <aside className="members" style={{
        background: `hsl(${myHue}, 58%, 95%)`
      }}>
        <header>
          <h2>online now</h2>
        </header>
        <ul>
          {members.map(({ username, userHue }, i) => (
            <li 
              key={i}
              style={{
                color: `hsl(${userHue}, 100%, 40%)`
              }}
            >{username}</li>
          ))}
        </ul>
      </aside>
    );
  }
}

export default connect(
  state => ({
    myHue: state.me.myHue,
    members: state.members
  }),
  null
)(Members);