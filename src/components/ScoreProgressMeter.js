import React, { Component } from 'react';

export default class ScoreProgressMeter extends Component {

	render() {
		return (
			<div className="scoreProgressMeter">
				{this.renderFill()}
			</div>
		);
	}

	renderFill() {
		return <div className="fill" style={{width: (this.props.score * 100 / this.props.targetScore) + '%'}} />
	}
}