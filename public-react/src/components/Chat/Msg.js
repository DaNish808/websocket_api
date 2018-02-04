import React, { PureComponent } from 'react';


class Msg extends PureComponent {

  render() {
    const {
      msg: { 
        user, text, timestamp,
        firstInChain, inChain, lastInChain
      }, 
      myMsg,
      hue,
      system
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
          style={{
            ...chainEdges,
            backgroundColor: `hsl(${hue}, ${system ? '0%' : '100%'}, 90%)`,
            color: `hsl(${hue}, 30%, 15%)`,
          }}
        >
          {!inChain && !lastInChain &&
            <span 
              className="user"
              style={{
                backgroundColor: `hsl(${hue}, ${system ? '0%' : '65%'}, 35%)`,
                color: `hsl(${hue}, ${system ? '0%' : '100%'}, 95%)`,
              }}
            >{user}</span>
          }
          <p className="msg-text">{text}</p>
          <div className="timestamp">{JSON.stringify(timestamp)}</div>
        </div>
      </li>
    );
  }
}

export default Msg;