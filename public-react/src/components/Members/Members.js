import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import './Members.css';

class Members extends PureComponent {

  render() {
    const { members } = this.props;
    return (
      <aside className="members">
        <header>
          <h2>online now</h2>
        </header>
        <ul>
          {members.map(({ username, userHue }, i) => (
            <li 
              key={i}
              style={{
                color: `hsl(${userHue}, 50%, 50%)`
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
    members: state.members
  }),
  null
)(Members);