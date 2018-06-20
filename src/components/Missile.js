import React from 'react';
import '../scss/Missile.css';
import ScalableComponent from "./ScalableComponent";

const RE_RENDER_INTERVAL_MS = 2;
const SPEED = 5; // px per interval

export default class Missile extends ScalableComponent {

	constructor(props)
	{
		super(props);
		this.state = {missile:null};
		this.onFiringLoopTick = this.onFiringLoopTick.bind(this);
	}

	componentWillMount() {
		if (!this.state.missile) {
			this.setState({
				missile: this.props.missile,
				top: this.props.missile.origin.top,
				left: this.props.missile.origin.left
			});
		}
	}

	componentDidMount() {
		if (!this.firingLoop) {
			this.horizontalIncrement = SPEED * Math.cos(this.state.missile.angle * Math.PI / 180);
			this.verticalIncrement = SPEED * Math.sin(this.state.missile.angle * Math.PI / 180);
			this.firingLoop = setInterval(this.onFiringLoopTick, RE_RENDER_INTERVAL_MS);
		}
	}

	componentDidUpdate(){
		if (this.state.left > this.props.viewport.width
			|| this.state.left < 0
			|| this.state.top > this.props.viewport.height
			|| this.state.top < 0)
		this.dispose();
	}

	onFiringLoopTick() {
		this.setState({
			left: this.state.left + this.horizontalIncrement,
			top: this.state.top + this.verticalIncrement
		});
	}

	dispose() {
		clearInterval(this.firingLoop);
		this.props.onMissileFinished();
	}

	render() {
		let style = {
			top: this.state.top,
			left: this.state.left,
			height: this.reScale(this.props.scale),
			width: this.reScale(this.props.scale)
		};

		return (
			<div className="Missile" style={style} />
		);
	}
}