import React, { PureComponent } from 'react';

import { PROJECTILE_COLLISION_RADIUS } from '../../state/constants';
import './Sky.css';


export default class Projectile extends PureComponent {
  render() {
    const { 
      projectile: { 
        origin: { userHue: hue },
        coordX, coordY
      }
    } = this.props;

    const sideLen = PROJECTILE_COLLISION_RADIUS * 2;

    return (
      <div className="projectile" style={{
        height: `${sideLen}%`,
        width: `${sideLen}%`,
        top: 100 - coordY + '%',
        left: coordX + '%',
        backgroundColor: `hsl(${hue}, 100%, 50%)`,
      }}>
      </div>
    );
  }
}