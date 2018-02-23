import React, { PureComponent } from 'react';
import formatDate from '../../utils/formatDate';

class Msg extends PureComponent {

  render() {
    const {
      msg: { 
        user, text, timestamp, sameTimeAsNext,
        firstInChain, inChain, lastInChain,
      }, 
      myMsg,
      hue,
      system
    } = this.props;
    
    let liChainSpacing = {};
    let divChainSpacing = {};
    let chainEdges = {};
    if(firstInChain) {
      liChainSpacing = {
        marginBottom: '0',
      };
      divChainSpacing = {
        paddingBottom: '0.4rem'
      };
      chainEdges = {
        width: '100%',
        borderBottomRightRadius: '0',
        borderBottomLeftRadius: '0'
      };
    }
    else if(inChain) {
      liChainSpacing = {
        marginTop: '0',
        marginBottom: '0',
      };
      divChainSpacing = {
        paddingTop: '0.4rem',
        paddingBottom: '0.4rem'
      };
      chainEdges = {
        width: '100%',
        borderRadius: '0'
      };
    }
    else if(lastInChain) {
      liChainSpacing = {
        marginTop: '0',
      };
      divChainSpacing = {
        paddingTop: '0.4rem',
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
        style={liChainSpacing}
      >
        <div
          className={myMsg ? 'my-msg msg' : 'msg'}
          style={{
            ...divChainSpacing,
            ...chainEdges,
            backgroundColor: `hsl(${hue}, ${system ? '0%' : '100%'}, 90%)`,
            color: `hsl(${hue}, 30%, 15%)`,
          }}
        >
          {!inChain && !lastInChain &&
            <span 
              className="user"
              style={{
                backgroundColor: `hsl(${hue}, ${system ? '0%' : '100%'}, 30%)`,
                color: `hsl(${hue}, ${system ? '0%' : '100%'}, 95%)`,
              }}
            >{user}</span>
          }
          <p className="msg-text">{text}</p>
          {sameTimeAsNext ||
            <div className="timestamp">{timestamp}</div>
          }
        </div>
      </li>
    );
  }
}

export default Msg;