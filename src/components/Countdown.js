import React, { Component } from 'react';

export default class Countdown extends Component {

	render() {
		return (
			<div className="countdown" >
				<div className="circle" />
				<div className="quadrants">
					{this.renderQuadrants()}
				</div>
			</div>
		);
	}

	renderQuadrants() {
		const percentage = this.props.current / this.props.total;

		if (percentage >= 0.75)
			return this.renderQuadrantsByOpacity([0, (1 - ((percentage - 0.75) * 4)), 0, 0]);

		else if (percentage >= 0.5)
			return this.renderQuadrantsByOpacity([0, 1, 0, (1 - ((percentage - 0.5) * 4))]);

		else if (percentage >= 0.25)
			return this.renderQuadrantsByOpacity([0, 1, (1 - ((percentage - 0.25) * 4)), 1]);

		else
			return this.renderQuadrantsByOpacity([(1 - (percentage * 4)), 1, 1, 1]);
	}

	renderQuadrantsByOpacity(opacities){
		return <div>
			{this.renderQuadrant(opacities[0])}
			{this.renderQuadrant(opacities[1])}
			{this.renderQuadrant(opacities[2])}
			{this.renderQuadrant(opacities[3])}
		</div>;
	}

	renderQuadrant(opacity) {
		return <div className="quadrant" style={{opacity:opacity}} />;
	}

}