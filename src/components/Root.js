import React, { Component } from 'react';
import "../scss/root.css";
import InfoScreen from "./InfoScreen";
import Game from "./Game";

export const LEVEL_DURATION_SECS = 15;
const LS_HI_SCORE_KEY = "tankHiScore";

export const levelRules = [
	{},
	{targetSize: 100, targetSpeed: 4, requiredScore: 10},
	{targetSize: 90, targetSpeed: 6, requiredScore: 12},
	{targetSize: 80, targetSpeed: 8, requiredScore: 14},
	{targetSize: 70, targetSpeed: 10, requiredScore: 16},
	{targetSize: 60, targetSpeed: 12, requiredScore: 18},
	{targetSize: 50, targetSpeed: 14, requiredScore: 20},
	{targetSize: 50, targetSpeed: 16, requiredScore: 22},
	{targetSize: 50, targetSpeed: 18, requiredScore: 24},
	{targetSize: 50, targetSpeed: 20, requiredScore: 26}
];


export default class Root extends Component {

	constructor(props) {

		super(props);

		this.onRestartRequested = this.onRestartRequested.bind(this);
		this.onNextLevelRequested = this.onNextLevelRequested.bind(this);
		this.onLevelCompleted = this.onLevelCompleted.bind(this);
		this.onLevelFailed = this.onLevelFailed.bind(this);

		this.state = {
			totalScore: 0,
			playing: true,
			level: 1,
			remainingTime: null,
			failedLevelScore: null,
			bonus:0
		};
	}

	get hiScore() {
		return window.localStorage.getItem(LS_HI_SCORE_KEY);
	}

	set hiScore(newHiScore) {
		window.localStorage.setItem(LS_HI_SCORE_KEY, newHiScore);
	}

	componentDidMount() {
		this.setState({viewport:{
				height: this.rootDiv.clientHeight,
				width: this.rootDiv.clientWidth
			}
		});
	}

	render() {
		return (
			<div className="Root" ref={(root)=>this.rootDiv = root}>
				{this.state.playing ? this.renderGame() : this.renderInfoScreen()}
			</div>
		);
	}

	renderInfoScreen() {
		return (
			<InfoScreen
				level={this.state.level}
				totalScore={this.state.totalScore}
				remainingTime={this.state.remainingTime}
				failedLevelScore={this.state.failedLevelScore}
				bonus={this.state.bonus}
				hiScore={this.hiScore}
				onNextLevelRequested={this.onNextLevelRequested}
				onRestartRequested={this.onRestartRequested}
			/>
		)
	}

	renderGame() {
		return (
			<Game
				level={this.state.level}
				viewport={this.state.viewport}
				onLevelCompleted={this.onLevelCompleted}
				onLevelFailed={this.onLevelFailed}
			/>
		);
	}

	onLevelCompleted(remainingTime) {
		const bonus = remainingTime * this.state.level;
		const newTotalScore = this.state.totalScore + bonus;
		this.setState({
			playing: false,
			remainingTime: remainingTime,
			failedLevelScore: null,
			bonus: bonus,
			totalScore: newTotalScore
		});
		this.UpdateHiScore(newTotalScore);
	}

	onLevelFailed(score) {
		const newTotalScore = this.state.totalScore + score;
		this.UpdateHiScore(newTotalScore);
		this.setState({
			playing: false,
			remainingTime: null,
			failedLevelScore: score,
			bonus: null,
			totalScore: newTotalScore
		});
	}

	UpdateHiScore(newTotalScore) {
		if (newTotalScore > this.hiScore)
			this.hiScore = newTotalScore;
	}

	onNextLevelRequested() {
		this.setState({
			playing: true,
			remainingTime: LEVEL_DURATION_SECS,
			level: this.state.level + 1
		});
	}

	onRestartRequested() {
		this.setState({
			totalScore: 0,
			playing: true,
			remainingTime: LEVEL_DURATION_SECS,
			level: 1
		});
	}
}
