import React, { Component } from 'react';

export default class Space extends Component {

  render() {
    return (
      <div
        data-spaceNum={this.props.spaceNum}
        onClick={this.props.onClick}
        className={this.props.spaceNum}
      >
        {this.props.takenBy !== "" ? <span className='player-piece'>{this.props.takenBy}</span> : null}
      </div>
      );
  }
}
