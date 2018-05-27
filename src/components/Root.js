import React, { Component } from 'react';
import Tank from "./Tank";
import "../scss/root.css";
import Missile from "./Missile";

export default class Root extends Component {

	constructor() {
		super();
		this.onMissileFired = this.onMissileFired.bind(this);
		this.onMissileFinished = this.onMissileFinished.bind(this);
		this.setRef = this.setRef.bind(this);
		//this.initSounds();
		this.state = {missile:null};
	}

	initSounds() {
		this.sounds = {
			tankShot: new Audio('../samples/tankshot.mp3')
		};

		this.sounds.tankShot.setAttribute('crossorigin', 'anonymous');
	}

	onMissileFired(missile) {
		if (!this.state.missile) {
			this.setState({missile:missile});
			//this.sounds.tankShot.play();
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
				<Tank onMissileFired={this.onMissileFired}/>
			</div>
		);
	}

	renderMissile() {
		if (this.state && this.state.missile){
			return (
				<Missile
					missile={this.state.missile}
					viewport={this.state.viewport}
					onMissileFinished={this.onMissileFinished}
				/>
			);
		}
	}
}
