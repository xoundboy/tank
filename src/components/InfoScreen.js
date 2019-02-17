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

	isEndOfGame() {
		return (this.props.score < this.requiredScore);
	}

	render() {
		return (
			<div className="infoScreen">
				<div className="body">
					{this.isEndOfGame()
						? this.renderEndOfGame()
						: this.renderStartNextLevel()}
				</div>
			</div>
		)
	}

	renderStartNextLevel() {
		return (
			<div className="successMessages">
				<div className="hail">Congratulations you passed level {this.props.level}</div>
				{this.renderScores() }
				<div className="prompt">
					{this.shouldRenderPrompt() && this.renderPrompt()}
				</div>
			</div>
		);
	}


	renderEndOfGame() {
		return(
			<div className="failureMessages">
				<div className="hail">Bad luck you failed level {this.props.level}</div>
				{this.renderScores()}
				<div className="prompt">
					{this.shouldRenderPrompt() && this.renderPrompt()}
				</div>
			</div>
		);
	}

	shouldRenderPrompt() {
		return this.state.initialPauseOver;
	}

	renderPrompt() {
		return (<span>Press any key to try again</span>);
	}

	renderScores() {
		return(
			<div>
				<div className="score">Level score: {this.props.score}</div>
				<div className="requiredScore">Required score: {this.requiredScore}</div>
				<div className="totalScore">Total Score: {this.props.totalScore}</div>
			</div>
		);
	}

	onKeyDown() {
		if (this.isEndOfGame())
			this.props.onRestartRequested();
		else
			this.props.onNextLevelRequested();
	}
}
