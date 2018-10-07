import React, { Component } from 'react';
import Tank from "./Tank";
import "../scss/root.css";
import Missile from "./Missile";
import Target from "./Target";
import * as ReactDOM from "react-dom";

const TANK_SCALE_FACTOR = 6;
const TANK_HORIZONTAL_POSITION = 40;
const TARGET_HORIZONTAL_POSITION = 600;
const TARGET_INITIAL_VERTICAL_POSITION = 0;

export default class Root extends Component {

	constructor() {
		super();
		this.onMissileFired = this.onMissileFired.bind(this);
		this.onMissileFinished = this.onMissileFinished.bind(this);
		this.onMissileReachedTargetLine = this.onMissileReachedTargetLine.bind(this);
		this.setRef = this.setRef.bind(this);
		this.targetElementRef = React.createRef();
		this.state = {
			missile: null,
			targetVerticalPosition: TARGET_INITIAL_VERTICAL_POSITION
		};
	}

	onMissileFired(missile) {
		if (!this.state.missile) {
			this.setState({missile:missile});
		}
	}

	onMissileFinished() {
		this.setState({missile:null});
	}

	componentDidMount() {
		this.setState({viewport:{
				height: this.rootDiv.clientHeight,
				width: this.rootDiv.clientWidth
			}
		});
	}

	setRef(root) {
		return this.rootDiv = root;
	}

	render() {
		return (
			<div className="Root" ref={this.setRef}>
				{this.renderMissile()}
				<Target
					ref={(elem) => this.targetElementRef = elem}
					scale={2}
					horizontalPosition={TARGET_HORIZONTAL_POSITION}
					verticalPosition={this.state.targetVerticalPosition}
				/>
				<Tank
					scale={TANK_SCALE_FACTOR}
					missile={this.state.missile}
					onMissileFired={this.onMissileFired}
					viewport={this.state.viewport}
					horizontalPosition={TANK_HORIZONTAL_POSITION}
				/>
			</div>
		);
	}

	renderMissile() {
		if (this.state && this.state.missile){
			return (
				<Missile
					scale={TANK_SCALE_FACTOR}
					missile={this.state.missile}
					viewport={this.state.viewport}
					onMissileFinished={this.onMissileFinished}
					targetHorizontalPosition={TARGET_HORIZONTAL_POSITION}
					onTargetLineReached={this.onMissileReachedTargetLine}
				/>
			);
		}
	}

	onMissileReachedTargetLine(verticalPositionOfMissile){
		const heightOfTarget = ReactDOM.findDOMNode(this.targetElementRef).clientHeight;
		if (verticalPositionOfMissile > this.state.targetVerticalPosition &&
			verticalPositionOfMissile < (this.state.targetVerticalPosition + heightOfTarget))
			this.handleMissileHitTarget(heightOfTarget, verticalPositionOfMissile);
	}

	handleMissileHitTarget(heightOfTarget, verticalPositionOfMissile) {
		this.setState({missile:false});


	}

	calculateScore(heightOfTarget, verticalPositionOfMissile) {

	}
}
