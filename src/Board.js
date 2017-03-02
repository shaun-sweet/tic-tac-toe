import React, { Component } from 'react';
import Space from './Space.js'
import WinLine from './WinLine.js'

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

  componentDidMount() {

  }

  render() {
    const space = (spaceNum) => (
      <Space
        spaceNum={spaceNum}
        takenBy={this.state.boardState[spaceNum]}
        onClick={this.state.gameState.won ? ()=> null : this.makeMove}
      />
    );
    return (
      <div className="game-container" >
        <div className="game-won">{this.state.gameState.won ? <span onClick={this.gameReset.bind(this)}>Game Won!! (tap here to play again)</span> : ""}</div>
        <div className='board'>
          {this.state.gameState.won ? <WinLine style={this.mapWinLinePlacement()} /> : null}
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
      </div>
    );
  }

  gameWon(winType) {
    this.setState({
      gameState: {
      ...this.state.gameState,
      won: true,
      winType: winType
      }
    })
  }

  checkForWin() {
    let bs = this.state.boardState;
  /*eslint-disable */
    if (bs.s1 === bs.s2 && bs.s2 === bs.s3 && bs.s1 !== "") {
      this.gameWon('th')
    }
    if (bs.s4 === bs.s5 && bs.s5 === bs.s6 && bs.s4 !== "") {
      this.gameWon('mh')
    }
    if (bs.s7 === bs.s8 && bs.s8 === bs.s9 && bs.s7 !== "") {
      this.gameWon('bh')
    }
    if (bs.s1 === bs.s5 && bs.s5 === bs.s9 && bs.s1 !== "") {
      this.gameWon('tld')
    }
    if (bs.s3 === bs.s5 && bs.s5 === bs.s7 && bs.s3 !== "") {
      this.gameWon('trd')
    }
    if (bs.s1 === bs.s4 && bs.s4 === bs.s7 && bs.s1 !== "") {
      this.gameWon('lv')
    }
    if (bs.s2 === bs.s5 && bs.s5 === bs.s8 && bs.s2 !== "") {
      this.gameWon('mv')
    }
    if (bs.s3 === bs.s6 && bs.s6 === bs.s9 && bs.s3 !== "") {
      this.gameWon('rv')
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

  mapWinLinePlacement() {
    let placement = {};
    switch (this.state.gameState.winType) {
      case 'lv':
      placement.left = '63px'
      placement.height = '400px'
      placement.bottom = '0'
      placement.transform = 'none'
        break;
      case 'mv':
        placement.height = '400px'
        placement.left = '196px'
        placement.bottom = '0'
        placement.transform = 'none'
        break;
      case 'rv':
        placement.height = '400px'
        placement.left = '329px'
        placement.bottom = '0'
        placement.transform = 'none'
        break;
      case 'mh':
        placement.height = '400px'
        placement.left = '196px'
        placement.transform = 'rotate(90deg)'
        placement.bottom = '5px'
      break;
      case 'th':
        placement.height = '400px'
        placement.left = '196px'
        placement.transform = 'rotate(90deg)'
        placement.bottom = '139px'
      break;
      case 'bh':
        placement.height = '400px'
        placement.left = '196px'
        placement.transform = 'rotate(90deg)'
        placement.top = '128px'
      break;
      case 'tld':
        placement.left = '200px'
        placement.top = '-87px'
        placement.transform = 'rotate(-45deg)'
        placement.height = '565px'
      break;
      case 'trd':
        placement.left = '200px'
        placement.top = '-87px'
        placement.transform = 'rotate(45deg)'
        placement.height = '565px'
      break;
    }
    return placement;
  }

  gameReset() {
    this.setState({
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
    });
  }
}
