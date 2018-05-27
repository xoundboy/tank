import React, { Component } from 'react';
import "../scss/tank.css";
import ScreenUtil from "../util/ScreenUtil";
import Sound from 'react-sound';

const CANNON_ANGLE_STEP = 3; // degrees
const UPPER_CANNON_ANGLE_LIMIT = -40;
const LOWER_CANNON_ANGLE_LIMIT = 15;
const CANNON_FIRE_SOUND_URL = "../samples/tankshot.mp3";

export default class Tank extends Component {

	constructor(props) {
		super(props);
		this.state = {cannonAngle: 0, firingSound: false};
		this.onWindowKeyDown = this.onWindowKeyDown.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
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
		if (this.state.cannonAngle > UPPER_CANNON_ANGLE_LIMIT)
			this.setState({cannonAngle: this.state.cannonAngle - CANNON_ANGLE_STEP});
	}

	cannonDown() {
		if (this.state.cannonAngle < LOWER_CANNON_ANGLE_LIMIT)
			this.setState({cannonAngle: this.state.cannonAngle + CANNON_ANGLE_STEP});
	}

	fireMissile() {
		const newMissile = {
			origin: this.state.missileOrigin,
			angle: this.state.cannonAngle
		};
		this.setState({fireSoundStatus:Sound.status.PLAYING});
		this.props.onMissileFired(newMissile);
	}

	onFinishedPlaying() {
		this.setState({fireSoundStatus:Sound.status.STOPPED});
	}

	render() {
		const style = {transform: "rotate(" + this.state.cannonAngle + "deg)"};
		return (
			<div className="tank">
				<div className="cannon" style={style}>
					<div className="missileOrigin" ref={(missileOrigin) => this.missileOrigin = missileOrigin} />
					<Sound
						playStatus={this.state.fireSoundStatus}
						url={CANNON_FIRE_SOUND_URL}
						onFinishedPlaying={this.onFinishedPlaying} />
				</div>
				<div className='turret'/>
				<div className='tankBody'/>
				<div className='track'/>
			</div>
		);
	}
}
