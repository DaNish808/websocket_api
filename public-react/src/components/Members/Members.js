import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import './Members.css';

class Members extends PureComponent {

  render() {
    return (
      <aside className="members">
        <ul>
          
        </ul>
      </aside>
    );
  }
}

export default connect(
  state => ({}),
  null
)(Members);