import React, { Component } from 'react';
import {LEVEL_DURATION_SECS, levelRules} from "./Root";
import Countdown from "./Countdown";
import ScoreProgressMeter from "./ScoreProgressMeter";

export default class ScorePanel extends Component {

	get requiredScore() {
		return levelRules[this.props.level].requiredScore;
	}

	render() {
		return (
			<div className="scorePanel">
				{/*<div className="score">Score: {this.props.score} / {this.requiredScore}</div>*/}
				<ScoreProgressMeter score={this.props.score} targetScore={this.requiredScore}/>
				<Countdown
					current={this.props.remainingTime}
					total={LEVEL_DURATION_SECS}
					scale={2}
				/>
				<div className="level">{this.props.level} / {levelRules.length}</div>
			</div>
		)
	}
}