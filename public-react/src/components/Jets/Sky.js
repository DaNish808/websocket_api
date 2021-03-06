import React, { Component } from 'react';
import { connect } from 'react-redux';

import Jet from './Jet';

import './Sky.css';


class Sky extends Component {

  render() {
    const { allJets } = this.props;

    const roundHundreth = n => Math.floor(parseFloat(n) * 100) / 100;

    return (
      <section className="sky" tabIndex="0">
        {!!allJets.length &&
          allJets.map(({ username, hue, jet }) => (
            <Jet
              username={username}
              hue={hue}
              jet={jet}
            />
          ))
        }
      </section>
    );
  }
}

export default connect(
  state => ({
    allJets: state.members
      .filter(m => m.userJet)
      .map(m => ({
        username: m.username,
        hue: m.userHue,
        jet: m.userJet
      }))
      .concat(state.me.userJet ? {
        username: state.me.username,
        hue: state.me.userHue,
        jet: state.me.userJet
      } : []),
    members: state.members
  }),
  null
)(Sky);



/* <li>
  <p>name: {username}, hue: {hue}</p>
  <p>velocity: {roundHundreth(jet.velocity)}, heading: {roundHundreth(jet.heading)}</p>
  <p>xCoord: {roundHundreth(jet.coordX)}, yCoord: {roundHundreth(jet.coordY)}</p>
</li> */