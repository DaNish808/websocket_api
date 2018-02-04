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
          {members.map(({ username }, i) => (
            <li key={i}>{username}</li>
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