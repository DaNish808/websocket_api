import React, { PureComponent } from 'react';


class Msg extends PureComponent {

  render() {
    const {
      msg: { 
        user, text, timestamp,
        firstInChain, inChain, lastInChain
      }, 
      myMsg
    } = this.props;

    console.log(firstInChain, inChain, lastInChain);
    let chainStyles = {};
    if(firstInChain) chainStyles = {
      marginBottom: '0',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0'
    };
    else if(inChain) chainStyles = {
      margin: '0 1rem',
      borderRadius: '0',
    };
    else if(lastInChain) chainStyles = {
      marginTop: '0',
      borderTopRightRadius: '0',
      borderTopLeftRadius: '0'

    };
    
    if(firstInChain) console.log('i\'m first!');
    return (
      <li 
        className={myMsg ? 'my-msg msg' : 'msg'}
        style={chainStyles}
      >
        {!inChain && !lastInChain &&
          <span className="user">{user}</span>
        }
        <p className="msg-text">{text}</p>
        <div className="timestamp">{JSON.stringify(timestamp)}</div>
      </li>
    );
  }
}

export default Msg;