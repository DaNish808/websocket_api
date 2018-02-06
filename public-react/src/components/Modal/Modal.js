import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import './Modal.css';

class Modal extends PureComponent {

  render() {
    const { className, children, open } = this.props;

    const visibility = open ? {} : { right: '-24rem' };

    return (
      <section 
        className={`modal ${className ? className : ''}`}
        style={visibility}
      >
        {children}
      </section>
    );
  }
}

export default connect(
  state => ({
    myHue: state.me.myHue
  }),
  null
)(Modal);