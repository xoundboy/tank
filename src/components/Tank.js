import React, { Component } from 'react';
import "../scss/tank.css";
import ScreenUtil from "../util/ScreenUtil";

const cannonAngleStep = 5; // degrees
const upperCannonAngleLimit = -40;
const lowerCanonAngleLimit = 15;

export default class Tank extends Component {

	constructor(props) {
		super(props);
		this.state = {cannonAngle: 0};
		this.onWindowKeyDown = this.onWindowKeyDown.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onWindowKeyDown);
		window.addEventListener("resize", this.onWindowResize);
		this.updateMissileOrigin();
	}

	updateMissileOrigin () {
		this.setState({missileOrigin:ScreenUtil.getScreenCordinates(this.missileOrigin)})
	}

	onWindowKeyDown(event){
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
			default:
		}
	}

	onWindowResize() {
		this.updateMissileOrigin();
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
			origin: this.state.missileOrigin,
			angle: this.state.cannonAngle
		};
		this.props.onMissileFired(newMissile);
	}

	render() {
		const style = {transform: "rotate(" + this.state.cannonAngle + "deg)"};
		return (
			<div className="tank">
				<div className="cannon" style={style}>
					<div className="missileOrigin" ref={(missileOrigin) => this.missileOrigin = missileOrigin} />
				</div>
				<div className='turret'/>
				<div className='tankBody'/>
				<div className='track'/>
			</div>
		);
	}
}
