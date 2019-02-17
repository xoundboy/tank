import React, { Component } from 'react';
import "../scss/root.css";
import InfoScreen from "./InfoScreen";
import Game from "./Game";

export const LEVEL_DURATION_SECS = 15;

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

	constructor() {

		super();

		this.onRestartRequested = this.onRestartRequested.bind(this);
		this.onEndOfLevel = this.onEndOfLevel.bind(this);
		this.onScoreChanged = this.onScoreChanged.bind(this);
		this.onNextLevelRequested = this.onNextLevelRequested.bind(this);

		this.state = {
			score: 0,
			totalScore: 0,
			playing: true,
			level: 1
		};
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
				score={this.state.score}
				level={this.state.level}
				totalScore={this.state.totalScore}
				onNextLevelRequested={this.onNextLevelRequested}
				onRestartRequested={this.onRestartRequested}
			/>
		)
	}

	renderGame() {
		return (
			<Game
				level={this.state.level}
				score={this.state.score}
				totalScore={this.state.totalScore}
				viewport={this.state.viewport}
				onEndOfLevel={this.onEndOfLevel}
				onScoreChanged={this.onScoreChanged}
			/>
		);
	}

	onEndOfLevel() {
		this.setState({
			playing: false
		});
	}

	onNextLevelRequested() {
		this.setState({
			score: 0,
			playing: true,
			remainingTime: LEVEL_DURATION_SECS,
			level: this.state.level + 1
		});
	}

	onRestartRequested() {
		this.setState({
			score: 0,
			totalScore: 0,
			playing: true,
			remainingTime: LEVEL_DURATION_SECS,
			level: 1
		});
	}

	onScoreChanged(diff) {
		this.setState({
			score: this.state.score + diff,
			totalScore: this.state.totalScore + diff
		});
	}
}
