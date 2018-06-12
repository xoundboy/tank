import React, { Component } from 'react';
import "../scss/tank.css";
import Sound from 'react-sound';
import soundTankshotUrl from '../samples/tankshot.mp3';
import ScreenUtil from "../util/ScreenUtil";

const CANNON_ANGLE_STEP = 3; // degrees
const UPPER_CANNON_ANGLE_LIMIT = -40;
const LOWER_CANNON_ANGLE_LIMIT = 15;

export default class Tank extends Component {

	constructor(props) {
		super(props);
		this.state = {cannonAngle: 0, fireSoundStatus: Sound.status.STOPPED};
		this.onWindowKeyDown = this.onWindowKeyDown.bind(this);
		this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onWindowKeyDown);
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

	render() {

		let borderWidth = (this.props.size < 5) ? 3 : 5;
		borderWidth += 'px';

		const cannonStyle = {
			transform: "rotate(" + this.state.cannonAngle + "deg)",
			width: 8 * this.props.size + 'px',
			height: this.props.size + 'px',
			left: 7.5 * this.props.size + 'px',
			top: 3 * this.props.size + 'px',
			borderWidth: borderWidth
		};
		const tankBodyStyle = {
			width: 10 * this.props.size + 'px',
			height: 5 * this.props.size + 'px',
			left: 2.5 * this.props.size + 'px',
			top: 6 * this.props.size + 'px',
			borderWidth: borderWidth
		};

		const turretStyle = {
			width: 5 * this.props.size + 'px',
			height: 6 * this.props.size + 'px',
			left: 5 * this.props.size + 'px',
			borderTopLeftRadius: 1.5 * this.props.size + 'px',
			borderTopRightRadius: 1.5 * this.props.size + 'px',
			borderWidth: borderWidth
		};

		const trackStyle = {
			top: 10 * this.props.size + 'px',
			width: 15 * this.props.size + 'px',
			height: 5 * this.props.size + 'px',
			borderRadius: 2.5 * this.props.size + 'px',
			borderWidth: borderWidth
		};

		return (
			<div className="tank">
				<div className="cannon" style={cannonStyle}>
					<div
						className="missileOrigin"
						ref={(missileOrigin) => this.missileOrigin = missileOrigin} />
					{this.renderMissileSound()}
				</div>
				<div className='turret' style={turretStyle}/>
				<div className='tankBody' style={tankBodyStyle}/>
				<div className='track' style={trackStyle}/>
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
		}
	}

	onFinishedPlaying(){
		this.setState({fireSoundStatus: Sound.status.STOPPED})
	}
}
