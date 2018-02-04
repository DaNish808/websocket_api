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

    let chainSpacing = {};
    let chainEdges = {};
    if(firstInChain) {
      chainSpacing = {
        marginBottom: '0',
      };
      chainEdges = {
        width: '100%',
        borderBottomRightRadius: '0',
        borderBottomLeftRadius: '0'
      };
    }
    else if(inChain) {
      chainSpacing = {
        marginTop: '0',
        marginBottom: '0'
      };
      chainEdges = {
        width: '100%',
        borderRadius: '0'
      };
    }
    else if(lastInChain) {
      chainSpacing = {
        marginTop: '0',
      };
      chainEdges = {
        width: '100%',
        borderTopRightRadius: '0',
        borderTopLeftRadius: '0'
      };
    }
    
    return (
      <li 
        className={myMsg ? 'my-msg-box msg-box' : 'msg-box'}
        style={chainSpacing}
      >
        <div
          className={myMsg ? 'my-msg msg' : 'msg'}
          style={chainEdges}
        >
          {!inChain && !lastInChain &&
            <span className="user">{user}</span>
          }
          <p className="msg-text">{text}</p>
          <div className="timestamp">{JSON.stringify(timestamp)}</div>
        </div>
      </li>
    );
  }
}

export default Msg;