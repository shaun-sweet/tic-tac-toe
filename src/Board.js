import React, { Component } from 'react';
import Space from './Space.js'
export default class Board extends Component {

  constructor(props){
    super(props);
    this.state = {
      gameState:{
        won: false,
        currentTurn: "X"
      },
      boardState:{
        s1: "",
        s2: "",
        s3: "",
        s4: "",
        s5: "",
        s6: "",
        s7: "",
        s8: "",
        s9: "",
      }
    };
    this.makeMove = this.makeMove.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.nextPlayerTurn = this.nextPlayerTurn.bind(this);
  }

  render() {
    const space = (spaceNum) => (
      <Space
        spaceNum={spaceNum}
        takenBy={this.state.boardState[spaceNum]}
        onClick={this.makeMove}
      />
    );
    return (
      <div className='board'>
        <div className="game-won">{this.state.gameState.won ? "Game Won!!" : ""}</div>
        <div className="row">
          {space("s1")}
          {space("s2")}
          {space("s3")}
        </div>
        <div className="row">
          {space("s4")}
          {space("s5")}
          {space("s6")}
        </div>
        <div className="row">
          {space("s7")}
          {space("s8")}
          {space("s9")}
        </div>
      </div>
    );
  }

  checkForWin() {
    let boardState = this.state.boardState;
  /*eslint-disable */
    if (boardState.s1 === boardState.s2 && boardState.s2 === boardState.s3 && boardState.s1 !== "" ||
        boardState.s4 === boardState.s5 && boardState.s5 === boardState.s6 && boardState.s4 !== "" ||
        boardState.s7 === boardState.s8 && boardState.s8 === boardState.s9 && boardState.s7 !== "" ||
        boardState.s1 === boardState.s5 && boardState.s5 === boardState.s9 && boardState.s1 !== "" ||
        boardState.s3 === boardState.s5 && boardState.s5 === boardState.s7 && boardState.s3 !== "" ||
        boardState.s1 === boardState.s4 && boardState.s4 === boardState.s7 && boardState.s1 !== "" ||
        boardState.s2 === boardState.s5 && boardState.s5 === boardState.s8 && boardState.s2 !== "" ||
        boardState.s3 === boardState.s6 && boardState.s6 === boardState.s9 && boardState.s3 !== ""
        ) {
      this.setState({
        gameState: {
        ...this.state.gameState,
        won: true
        }
      })
    /*eslint-enable */
    }
  }

  nextPlayerTurn() {
    let currentTurn;
    this.state.gameState.currentTurn === "X" ? currentTurn = "O" : currentTurn = "X"
    this.setState({
      gameState: {
        ...this.state.gameState,
        currentTurn
      }
    })
  }

  makeMove(e) {
    var _this = this;
    return new Promise(
      function(resolve, reject) {
        const space = e.target.attributes.getNamedItem('data-spaceNum').value
        _this.setState({
          boardState: {
            ..._this.state.boardState,
            [space]: _this.state.gameState.currentTurn
          }
        })
        resolve()
      }
    )
    .then(function() {
      // eslint-disable-next-line
      _this.checkForWin();
    }).then(function() {
      _this.nextPlayerTurn();
    })

  }
}
