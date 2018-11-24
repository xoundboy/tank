import React, { Component } from 'react';
import '../scss/ScorePanel.css';

export default class ScorePanel extends Component {
	render() {
		return (
			<div className="scorePanel">
				<div className="score">Score: {this.props.score}</div>
				<div className="score">Countdown: {this.props.remainingTime}</div>
			</div>
		)
	}
}