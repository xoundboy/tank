import React, { Component } from 'react';

export default class ScorePanel extends Component {
	render() {
		return (
			<div className="scorePanel">
				<div className="level">Level: {this.props.level}</div>
				<div className="score">Score: {this.props.score}</div>
				<div className="requiredScore">Target Score: {this.props.requiredScore}</div>
				<div className="totalScore">Total Score: {this.props.totalScore}</div>
				<div className="remainingTime">Countdown: {this.props.remainingTime}</div>
			</div>
		)
	}
}