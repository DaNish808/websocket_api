import React, { PureComponent } from 'react';

import './Sky.css';


export default class Jet extends PureComponent {
  render() {
    const { 
      username, hue,
      jet: { heading, coordX, coordY }
    } = this.props;

    return (
      <div className='jet' style={{
        backgroundColor: `hsl(${hue}, 100%, 50%)`,
        bottom: coordY + '%',
        left: coordX + '%',
        transform: `rotate(${-heading - 90}deg)`
      }}>
        
      </div>
    );
  }
}