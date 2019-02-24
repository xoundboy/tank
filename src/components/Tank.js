import React from 'react';
import Sound from 'react-sound';
import soundTankshotUrl from '../samples/tankshot.mp3';
import ScreenUtil from "../util/ScreenUtil";
import ScalableComponent from "./ScalableComponent";

const CANNON_ANGLE_STEP = 3; // degrees
const UPPER_CANNON_ANGLE_LIMIT = -40;
const LOWER_CANNON_ANGLE_LIMIT = 15;
const DEFAULT_VERTICAL_POSITION = 100;
const VERTICAL_MOVEMENT_INCREMENT = 10;
const VERTICAL_PADDING = 60;
const TANK_MOTION_INTERVAL = 50;

const MOVE_TANK_UP_KEY = "s";
const MOVE_TANK_DOWN_KEY = "x";
const MOVE_CANNON_UP_KEY = "d";
const MOVE_CANNON_DOWN_KEY = "c";
const FIRE_MISSILE_KEY = " ";

export default class Tank extends ScalableComponent {

	moveTankDownKeyPressed;
	moveTankUpKeyPressed;
	moveCannonDownKeyPressed;
	moveCannonUpKeyPressed;

	constructor(props) {
		super(props);
		this.state = {
			verticalPosition: DEFAULT_VERTICAL_POSITION,
			cannonAngle: 0,
			fireSoundStatus: Sound.status.STOPPED
		};
		this.onWindowKeyDown = this.onWindowKeyDown.bind(this);
		this.onWindowKeyUp = this.onWindowKeyUp.bind(this);
		this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
		this.tankMotionTick = this.tankMotionTick.bind(this);
		this.setInitialStyles();
	}

	setInitialStyles() {

		this.cannonStyle = {
			width: this.reScale(15),
			height: this.reScale(1),
			left: this.reScale(7.5),
			top: this.reScale(2),
			borderWidth: this.props.scale
		};

		this.tankBodyStyle = {
			width: this.reScale(15),
			height: this.reScale(3),
			left: this.reScale(2.5),
			top: this.reScale(-1),
			borderTopLeftRadius: this.reScale(1.5),
			borderTopRightRadius: this.reScale(1.5),
			borderWidth: this.props.scale
		};

		this.turretStyle = {
			width: this.reScale(6),
			height: this.reScale(3),
			left:this.reScale(7),
			borderTopLeftRadius: this.reScale(1.5),
			borderTopRightRadius: this.reScale(1.5),
			borderWidth: this.props.scale
		};

		this.trackStyle = {
			top: this.reScale(-2),
			width: this.reScale(20),
			height: this.reScale(3),
			borderRadius: this.reScale(2.5),
			borderWidth: this.props.scale
		};
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onWindowKeyDown);
		window.addEventListener("keyup", this.onWindowKeyUp);
		this.tankMotionInterval = setInterval(this.tankMotionTick, TANK_MOTION_INTERVAL);
		this.updateMissileOrigin();
	}

	tankMotionTick() {
		if (this.moveTankDownKeyPressed)
			this.moveTankDown();
		if (this.moveTankUpKeyPressed)
			this.moveTankUp();
		if (this.moveCannonDownKeyPressed)
			this.cannonDown();
		if (this.moveCannonUpKeyPressed)
			this.cannonUp();
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onWindowKeyDown);
		window.removeEventListener("keyup", this.onWindowKeyUp);
		clearInterval(this.tankMotionInterval);
	}

	updateMissileOrigin () {
		this.setState({missileOrigin:ScreenUtil.getScreenCordinates(this.missileOriginRef)})
	}

	onWindowKeyDown(event){

		switch(event.key){

			case MOVE_TANK_DOWN_KEY:
				this.moveTankDownKeyPressed = Date.now();
				this.moveTankUpKeyPressed = null;
				break;

			case MOVE_TANK_UP_KEY:
				this.moveTankUpKeyPressed = Date.now();
				this.moveTankDownKeyPressed = null;
				break;

			case MOVE_CANNON_DOWN_KEY:
				this.moveCannonDownKeyPressed = Date.now();
				this.moveCannonUpKeyPressed = null;
				break;

			case MOVE_CANNON_UP_KEY:
				this.moveCannonUpKeyPressed = Date.now();
				this.moveCannonDownKeyPressed = null;
				break;

			case FIRE_MISSILE_KEY:
				this.fireMissile();
				break;

			default:
				break;
		}
	}

	onWindowKeyUp(event){

		switch(event.key){

			case MOVE_TANK_DOWN_KEY:
				this.moveTankDownKeyPressed = null;
				break;

			case MOVE_TANK_UP_KEY:
				this.moveTankUpKeyPressed = null;
				break;

			case MOVE_CANNON_DOWN_KEY:
				this.moveCannonDownKeyPressed = null;
				break;

			case MOVE_CANNON_UP_KEY:
				this.moveCannonUpKeyPressed = null;
				break;

			default:
		}
	}

	moveTankUp() {
		if (this.state.verticalPosition > VERTICAL_PADDING){
			this.setState({verticalPosition: this.state.verticalPosition - VERTICAL_MOVEMENT_INCREMENT});
			this.updateMissileOrigin();
		}
	}

	moveTankDown() {
		const maxVerticalDisplacement = this.props.viewport.height - this.tankRef.clientHeight;
		if (this.state.verticalPosition < (maxVerticalDisplacement - VERTICAL_PADDING)){
			this.setState({verticalPosition: this.state.verticalPosition + VERTICAL_MOVEMENT_INCREMENT});
			this.updateMissileOrigin();
		}
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
		this.setState({fireSoundStatus:Sound.status.STOPPED});
		this.setState({fireSoundStatus:Sound.status.PLAYING});
		this.props.onMissileFired(newMissile);
	}

	render() {
		let cannonStyle = {"transform": "rotate(" + this.state.cannonAngle + "deg)"};
		let tankStyle = {
			"top": this.state.verticalPosition + "px",
			"left": this.props.horizontalPosition + "px"
		};
		return (
			<div className="tank" style={tankStyle} ref={(tankRef) => this.tankRef = tankRef}>
				<div className="cannon" style={Object.assign(cannonStyle, this.cannonStyle)}>
					<div className="missileOrigin" ref={(missileOriginRef) => this.missileOriginRef = missileOriginRef} />
					{this.renderMissileSound()}
				</div>
				<div className='turret' style={this.turretStyle}/>
				<div className='tankBody' style={this.tankBodyStyle}/>
				<div className='track' style={this.trackStyle}/>
			</div>
		);
	}

	renderMissileSound() {
		if (this.state.fireSoundStatus === Sound.status.PLAYING) {
			return (
				<Sound
					playStatus={this.state.fireSoundStatus}
					url={soundTankshotUrl}
					onFinishedPlaying={this.onFinishedPlaying}
				/>
			);
		} else {
			return null
		}
	}

	onFinishedPlaying(){
		this.setState({fireSoundStatus: Sound.status.STOPPED})
	}
}
