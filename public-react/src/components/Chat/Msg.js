import React, { PureComponent } from 'react';


class Msg extends PureComponent {

  render() {
    const {
      msg: { user, text, timestamp }, 
      myMsg
    } = this.props;

    return (
      <li className={myMsg ? 'my-msg msg' : 'msg'}>
        <span className="user">{user}</span>
        <span className="timestamp">{JSON.stringify(timestamp)}</span>
        <p className="msg-text">{text}</p>
      </li>
    );
  }
}

export default Msg;