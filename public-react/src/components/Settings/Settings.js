import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import { setUser } from '../../state/actions/me';
import { HuePicker } from 'react-color';
import './Settings.css';

class Settings extends PureComponent {

  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };
  }

  handleModalToggle = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  handlePreview = ({ hsl: { h : hue } }) => {
    this.setState({
      ...this.state,
      previewHue: hue
    });
  }

  handleUserUpdate = e => {
    e.preventDefault();
    
    const userUpdate = {
      username: e.target.username.value || this.props.username,
      myHue: this.state.previewHue
    };

    this.props.socket.emit('reset-user', userUpdate);
  }


  render() {
    const { myHue, username } = this.props;
    const { modalIsOpen, previewHue } = this.state;

    return (
      <section className="settings">
        <div 
          className="settings-cog-centerer"
          onClick={this.handleModalToggle}
        >
          <svg className="settings-cog icon icon-cog">
            <path 
              d="M24.238 17.919c-1.049-1.817-0.418-4.147 1.409-5.205l-1.965-3.404c-0.561 0.329-1.214 0.518-1.911 0.518-2.1 0-3.803-1.714-3.803-3.828h-3.931c0.005 0.653-0.158 1.314-0.507 1.919-1.049 1.817-3.382 2.436-5.212 1.382l-1.965 3.404c0.566 0.322 1.056 0.793 1.404 1.396 1.048 1.815 0.42 4.139-1.401 5.2l1.965 3.404c0.56-0.326 1.209-0.513 1.902-0.513 2.094 0 3.792 1.703 3.803 3.808h3.931c-0.002-0.646 0.162-1.3 0.507-1.899 1.048-1.815 3.375-2.433 5.203-1.387l1.965-3.404c-0.562-0.322-1.049-0.791-1.395-1.391zM16 20.049c-2.236 0-4.050-1.813-4.050-4.050s1.813-4.050 4.050-4.050c2.236 0 4.050 1.813 4.050 4.050s-1.813 4.050-4.050 4.050z" 
              stroke={`hsl(${myHue}, 86%, 88%)`}
              fill={`hsl(${myHue}, 86%, 88%)`}
            />
          </svg>
        </div>
        <Modal open={modalIsOpen}>
          <form
            onSubmit={this.handleUserUpdate}
            style={{
              backgroundColor: `hsl(${previewHue || myHue}, 40%, 93%)`,
              color: `hsl(${previewHue || myHue}, 86%, 27%)`,
            }}
          >
            <HuePicker 
              color={{ h: previewHue || myHue, s: 1, l: .5 }}
              onChange={this.handlePreview}
            />
            <fieldset>
              <label>username:</label>
              <input type="text" name="username" placeholder={username} 
                style={{
                  color: `hsl(${previewHue || myHue}, 86%, 27%)`
                }}/>
            </fieldset>
            <button className="submit" type="submit">Change</button>
          </form>
        </Modal>
      </section>
    );
  }
}

export default connect(
  state => ({
    myHue: state.me.myHue,
    username: state.me.username,
    socket: state.socket
  }),
  { setUser }
)(Settings);