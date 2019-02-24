import React, { Component } from 'react';
import { levelRules } from './Root';

export default class InfoScreen extends Component {

	constructor(props) {
		super(props);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onInitialPauseOver = this.onInitialPauseOver.bind(this);
		this.state = {
			initialPauseOver: false
		}
	}

	get requiredScore() {
		return levelRules[this.props.level].requiredScore;
	}

	componentDidMount() {
		setTimeout(this.onInitialPauseOver, 2000);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onKeyDown);
	}

	onInitialPauseOver() {
		window.addEventListener("keydown", this.onKeyDown);
		this.setState({initialPauseOver: true});
	}

	isGameOver() {
		return !this.props.remainingTime;
	}

	render() {
		return (
			<div className="infoScreen">
				<div className="body">
					{this.isGameOver()
						? this.renderFailMessage()
						: this.renderSuccessMessage()}
				</div>
			</div>
		)
	}

	renderSuccessMessage() {
		return (
			<div className="successMessages">
				<div className="hail">Level {this.props.level} passed!</div>
				{this.renderBonus()}
				{this.renderTotalScore()}
				{this.renderHiScore()}
				{this.state.initialPauseOver && this.renderPrompt()}
			</div>
		);
	}

	renderTotalScore() {
		return <div className="totalScore">Total Score: {this.props.totalScore}</div>
	}

	renderBonus() {
		return (<div className="bonus">Bonus: {this.props.bonus}</div>);
	}

	renderFailMessage() {
		return(
			<div className="failureMessages">
				<div className="gameOver">GAME OVER</div>
				<div className="hail">Level {this.props.level}</div>
				<div className="failedLevelScore">Level Score: {this.props.failedLevelScore}</div>
				<div className="requiredScore">Required score: {this.requiredScore}</div>
				{this.renderTotalScore()}
				{this.renderHiScore()}
				{this.state.initialPauseOver && this.renderPrompt()}
			</div>
		);
	}

	renderHiScore() {
		return <div className="hiScore">Hi Score: {this.props.hiScore}</div>
	}

	renderPrompt() {
		return <div className="prompt">Press any key to try again</div>;
	}

	onKeyDown(e) {
		if (e.which !== 32)
			return;
		if (this.isGameOver())
			this.props.onRestartRequested();
		else
			this.props.onNextLevelRequested();
	}
}
