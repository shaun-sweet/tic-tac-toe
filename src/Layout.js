import React, { Component } from 'react';
import Board from './Board.js'
import SetupGame from './SetupGame.js'

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameStarted: true
    };
    this.startGame = this.startGame.bind(this);
  }
  render() {
    return this.state.gameStarted ? <Board /> : <SetupGame startGame={this.startGame}/>;

  }

  startGame() {
    this.setState({gameStarted: true});
  }
}

export default Layout;
