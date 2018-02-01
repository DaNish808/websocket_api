import React, { PureComponent } from 'react';


class Msg extends PureComponent {

  render() {
    const {
      user, text, timestamp
    } = this.props;

    return (
      <li className="msg">
        <span className="user">{user}</span>
        <span className="timestamp">{JSON.stringify(timestamp)}</span>
        <p className="msg-text">{text}</p>
      </li>
    );
  }
}

export default Msg;