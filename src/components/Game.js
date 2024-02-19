import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import {LEVEL_DURATION_SECS, levelRules} from "./Root";
import Target from "./Target";
import Tank from "./Tank";
import ScorePanel from "./ScorePanel";
import Missile from "./Missile";


const TANK_SCALE_FACTOR = 6;
const TANK_HORIZONTAL_POSITION = 40;
const TARGET_HORIZONTAL_POSITION = 600;
const TARGET_INITIAL_VERTICAL_POSITION = 0;
const TARGET_SQUASH_FACTOR = 4;
const TARGET_BULLET_HOLE_DISPLAY_TIME = 2000;
const COUNTDOWN_TICK_INTERVAL = 1000;

export default class Game extends Component {

	constructor() {

		super();

		this.onMissileFired = this.onMissileFired.bind(this);
		this.onMissileFinished = this.onMissileFinished.bind(this);
		this.onMissileReachedTargetLine = this.onMissileReachedTargetLine.bind(this);
		this.onBulletHoleDisplayTimeout = this.onBulletHoleDisplayTimeout.bind(this);
		this.onTargetMotionTick = this.onTargetMotionTick.bind(this);
		this.onCountdownTick = this.onCountdownTick.bind(this);
		this.updateScore = this.updateScore.bind(this);

		this.targetElementRef = React.createRef();
		this.countDown = setInterval(this.onCountdownTick, COUNTDOWN_TICK_INTERVAL);

		this.state = {
			missile: null,
			targetVerticalPosition: TARGET_INITIAL_VERTICAL_POSITION,
			bulletHolePosition: null,
			targetMovingDown: true,
			score: 0,
			remainingTime: LEVEL_DURATION_SECS,
			playing: true
		};
	}

	get targetSize() {
		return levelRules[this.props.level].targetSize;
	}

	get targetSpeed() {
		return levelRules[this.props.level].targetSpeed;
	}

	get requiredScore() {
		return levelRules[this.props.level].requiredScore;
	}

	componentDidMount() {
		this.targetHeight = ReactDOM.findDOMNode(this.targetElementRef).clientHeight;
		this.targetMotion = setInterval(this.onTargetMotionTick, 100);
	}

	componentWillUnmount() {
		this.dispose();
	}

	dispose() {
		clearInterval(this.targetMotion);
		clearInterval(this.countDown);
		clearTimeout(this.bulletHoleDisplayTimeout);
	}

	render() {
		return (
			<div>
				{this.renderMissile()}
				<Target
					ref={(elem) => this.targetElementRef = elem}
					scale={(this.targetSize / 50)}
					horizontalPosition={TARGET_HORIZONTAL_POSITION}
					verticalPosition={this.state.targetVerticalPosition}
					diameter={60}
					squashFactor={TARGET_SQUASH_FACTOR}
					bulletHolePosition={this.state.bulletHolePosition}
				/>
				<Tank
					scale={TANK_SCALE_FACTOR}
					missile={this.state.missile}
					onMissileFired={this.onMissileFired}
					viewport={this.props.viewport}
					horizontalPosition={TANK_HORIZONTAL_POSITION}
				/>
				<ScorePanel
					level={this.props.level}
					score={this.state.score}
					remainingTime={this.state.remainingTime}/>
			</div>
		);
	}

	renderMissile() {
		if (this.state && this.state.missile){
			return (
				<Missile
					scale={TANK_SCALE_FACTOR}
					missile={this.state.missile}
					viewport={this.props.viewport}
					onMissileFinished={this.onMissileFinished}
					targetHorizontalPosition={TARGET_HORIZONTAL_POSITION}
					onTargetLineReached={this.onMissileReachedTargetLine}
				/>
			);
		}
	}

	calculateScore(bulletPositionOnTarget, heightOfTarget){
		const percentageDistanceFromTop = (bulletPositionOnTarget / heightOfTarget) * 100;
		switch (true) {
			case (percentageDistanceFromTop > 40 && percentageDistanceFromTop < 60):
				return 3;
			case (percentageDistanceFromTop > 20 && percentageDistanceFromTop < 80):
				return 2;
			default:
				return 1;
		}
	}

	onCountdownTick() {
		const remainingTime = this.state.remainingTime - 1;
		this.setState({remainingTime: remainingTime});
		if (remainingTime <= 0){
			this.dispose();
			this.props.onLevelFailed(this.state.score);
		}
	}

	onTargetMotionTick(){
		if (this.state.targetMovingDown) {

			if ((this.state.targetVerticalPosition + this.targetHeight) <= this.props.viewport.height)
				this.setState({targetVerticalPosition: this.state.targetVerticalPosition + this.targetSpeed});
			else
				this.setState({targetMovingDown:false});

		} else {

			if (this.state.targetVerticalPosition >= 0)
				this.setState({targetVerticalPosition: this.state.targetVerticalPosition - this.targetSpeed});
			else
				this.setState({targetMovingDown:true});
		}
	}

	onMissileFired(missile) {
		if (!this.state.missile) {
			this.setState({missile:missile});
		}
	}

	onMissileFinished() {
		this.setState({missile:null});
	}


	onMissileReachedTargetLine(verticalPositionOfMissile){
		const heightOfTarget = ReactDOM.findDOMNode(this.targetElementRef).clientHeight;
		if (verticalPositionOfMissile > this.state.targetVerticalPosition &&
			verticalPositionOfMissile < (this.state.targetVerticalPosition + heightOfTarget)){

			// calculate bullet hole position relative to top-left of target for positioning
			const bulletPositionOnTarget = verticalPositionOfMissile - this.state.targetVerticalPosition;


			this.setState({

				// stop rendering the missile
				missile:false,

				// mark the position where the missile hit
				bulletHolePosition: bulletPositionOnTarget
			});

			// accumulate the score
			this.updateScore(this.calculateScore(bulletPositionOnTarget, heightOfTarget));

			// play a missile hit sound

			// only show the bullet hole for a short time
			this.bulletHoleDisplayTimeout = setTimeout(this.onBulletHoleDisplayTimeout, TARGET_BULLET_HOLE_DISPLAY_TIME)
		}
	}

	updateScore(diff) {
		let newScore = this.state.score + diff;
		if (newScore >= levelRules[this.props.level].requiredScore)
			this.props.onLevelCompleted(this.state.remainingTime);
		this.setState({score: newScore});
	}

	onBulletHoleDisplayTimeout() {
		this.setState({bulletHolePosition: null});
		clearTimeout(this.bulletHoleDisplayTimeout);
	}
}
