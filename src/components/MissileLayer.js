import React, { Component } from 'react';
import "../scss/missileLayer.css";

export default class MissileLayer extends Component {

	constructor(props){
		super(props);
		this.state = {missiles:[]};
	}

	componentWillReceiveProps(nextProps) {
		let missiles = Object.assign([], this.state.missiles);
		missiles.push(nextProps.missile);
		this.setState({missiles:missiles,newMissile:nextProps.missile});
	}

	render() {
		console.log(this.state.missiles);
		return (
			<div className="MissileLayer">
				missiles
			</div>
		);
	}

}