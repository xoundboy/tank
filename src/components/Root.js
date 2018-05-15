import React, { Component } from 'react';
import Tank from "./Tank";
import MissileLayer from "./MissileLayer";
import "../scss/root.css";



export default class Root extends Component {

	constructor() {
		super();
		this.onMissileFired = this.onMissileFired.bind(this);
	}

	onMissileFired(missile) {
		console.log(missile);
	}

	render() {
		return (
			<div className="Root">
				<Tank onMissileFired={this.onMissileFired}/>
				{/*<MissileLayer missile={this.state.newMissile} />*/}
			</div>
		);
	}
}
