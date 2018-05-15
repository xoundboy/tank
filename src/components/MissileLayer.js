import React, { Component } from 'react';
import "../scss/missileLayer.css";

export default class MissileLayer extends Component {

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}

	render() {
		return (
			<div className="MissileLayer">
				missiles
			</div>
		);
	}

}