import React, { Component } from 'react';
import "../scss/tank.css";

export default class Tank extends Component {

	render() {
		const style = {
			transform: "rotate(" + this.props.cannonAngle + "deg)"
		};

		return (
			<div className="tank">
				<div className="cannon" style={style}/>
				<div className='turret'/>
				<div className='tankBody'/>
				<div className='track'/>
			</div>
		);
	}
}
