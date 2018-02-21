import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import './Members.css';

class Members extends PureComponent {

  render() {
    const { userHue, members } = this.props;
    return (
      <aside className="members" style={{
        background: `hsl(${userHue}, 58%, 95%)`
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
    userHue: state.me.userHue,
    members: state.members
  }),
  null
)(Members);