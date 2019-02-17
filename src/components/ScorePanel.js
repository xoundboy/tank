import React, { Component } from 'react';
import { levelRules } from "./Root";

export default class ScorePanel extends Component {

	get requiredScore() {
		return levelRules[this.props.level].requiredScore;
	}

	render() {
		return (
			<div className="scorePanel">
				<div className="level">Level: {this.props.level}</div>
				<div className="score">Score: {this.props.score}</div>
				<div className="requiredScore">Target Score: {this.requiredScore}</div>
				<div className="totalScore">Total Score: {this.props.totalScore}</div>
				<div className="remainingTime">Countdown: {this.props.remainingTime}</div>
			</div>
		)
	}
}