import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Jet from './Jet';

import './Sky.css';


class Sky extends PureComponent {

  render() {
    return (
      <section className="jet-game sky" tabIndex="0">

      </section>
    );
  }
}

export default connect(
  state => ({}),
  null
)(Sky);