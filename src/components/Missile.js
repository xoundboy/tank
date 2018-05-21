import React, { Component } from 'react';
import '../scss/Missile.css';

const RE_RENDER_INTERVAL = 10;
const PX_DELTA = 3;

export default class Missile extends Component {

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
			this.horizontalIncrement = PX_DELTA;
			this.verticalIncrement = (PX_DELTA * Math.sin(-this.state.missile.angle));
			this.firingLoop = setInterval(this.onFiringLoopTick, RE_RENDER_INTERVAL);
		}
	}

	onFiringLoopTick() {
		if (this.state.left > this.props.viewport.width || this.state.left < 0)
			this.dispose();

		if (this.state.top > this.props.viewport.height || this.state.top < 0)
			this.dispose();

		else {
			this.setState({
				left: this.state.left + this.horizontalIncrement,
				top: this.state.top + this.verticalIncrement
			});
		}
	}

	dispose() {
		clearInterval(this.firingLoop);
		this.props.onMissileFinished();
	}

	render() {
		let style = {
			top: this.state.top,
			left: this.state.left
		};

		return (
			<div className="Missile" style={style} />
		);
	}
}