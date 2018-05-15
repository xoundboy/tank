import React, { Component } from 'react';
import "../scss/tank.css";

const cannonAngleStep = 5; // degrees
const upperCannonAngleLimit = -40;
const lowerCanonAngleLimit = 15;

export default class Tank extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cannonAngle: 0
		};

		this.onWindowKeyDown = this.onWindowKeyDown.bind(this);
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onWindowKeyDown);
	}

	onWindowKeyDown(event){

		event.stopPropagation();
		event.preventDefault();

		switch(event.key){

			case "ArrowDown":
				this.cannonDown();
				break;

			case "ArrowUp":
				this.cannonUp();
				break;

			case " ":
				this.fireMissile();
				break;
		}
	}

	cannonUp() {
		if (this.state.cannonAngle > upperCannonAngleLimit)
			this.setState({cannonAngle: this.state.cannonAngle - cannonAngleStep});
	}

	cannonDown() {
		if (this.state.cannonAngle < lowerCanonAngleLimit)
			this.setState({cannonAngle: this.state.cannonAngle + cannonAngleStep});
	}

	fireMissile() {
		const newMissile = {
			origin: this.getMissileOrigin(),
			angle: this.state.cannonAngle
		};
		this.props.onMissileFired(newMissile);
	}

	getMissileOrigin() {
		return "missle origin";
	}

	render() {
		const style = {transform: "rotate(" + this.state.cannonAngle + "deg)"};
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
