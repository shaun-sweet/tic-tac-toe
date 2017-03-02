import React, { Component } from 'react';

export default class SetupGame extends Component {

  render() {
    return (
      <div className='setup-game'>
        <button onClick={() => this.props.startGame()}>Click to Start</button>
      </div>
    );
  }
}
