import React, { PureComponent } from 'react';

import './Sky.css';


export default class Jet extends PureComponent {
  render() {
    const { 
      username, hue,
      jet: { heading, coordX, coordY }
    } = this.props;

    return (
      <div className="jet-positioner" style={{
        top: 100 - coordY + '%',
        left: coordX + '%',
        color: `hsl(${hue}, 100%, 35%)`
      }}>
        <span className="jet-owner">{username}</span>
        <div className="jet" style={{
          transform: `rotate(${-heading + 90}deg)`,
          backgroundColor: `hsl(${hue}, 100%, 50%)`,
        }}></div>
      </div>
    );
  }
}