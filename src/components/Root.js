import React, { Component } from 'react';
import Tank from "./Tank";
import "../scss/root.css";
import Missile from "./Missile";

const TANK_SCALE_FACTOR = 4;

export default class Root extends Component {

	constructor() {
		super();
		this.onMissileFired = this.onMissileFired.bind(this);
		this.onMissileFinished = this.onMissileFinished.bind(this);
		this.setRef = this.setRef.bind(this);
		this.state = {missile:null};
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
				<Tank
					scale={TANK_SCALE_FACTOR}
					missile={this.state.missile}
					onMissileFired={this.onMissileFired}
					viewport={this.state.viewport}
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
				/>
			);
		}
	}
}
