import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import './Sky.css';


class Sky extends PureComponent {

  render() {
    return (
      <section className="jet-game sky">

      </section>
    );
  }
}

export default connect(
  state => ({}),
  null
)(Sky);