import React from 'react';
import ScalableComponent from "./ScalableComponent";

export default class Target extends ScalableComponent {

	setStyles() {

		const horizontalPosition = this.props.horizontalPosition - ((this.props.diameter / this.props.squashFactor) / 2);

		this.containerStyle = {
			top: this.props.verticalPosition + "px",
			left: horizontalPosition + "px"
		};
		this.outerRingStyle = {
			width: this.reScale(this.props.diameter / this.props.squashFactor),
			height: this.reScale(this.props.diameter)
		};
		const middleRingDiameter = (this.props.diameter * 3) / 5;
		this.middleRingStyle = {
			width: this.reScale(middleRingDiameter / this.props.squashFactor),
			height: this.reScale(middleRingDiameter)
		};
		const bullsEyeDiameter = (this.props.diameter / 5);
		this.bullsEyeStyle = {
			width: this.reScale(bullsEyeDiameter / this.props.squashFactor),
			height: this.reScale(bullsEyeDiameter)
		};

		this.bulletHoleStyle = {
			height: this.reScale(this.props.scale),
			width: this.reScale(this.props.scale),
			borderRadius: this.reScale(this.props.scale / 2),
			top: this.props.bulletHolePosition,
			left: (this.props.diameter / this.props.squashFactor) - this.reScale(this.props.scale / 2)
		}
	}

	componentWillMount(){
		this.setStyles();
	}

	componentWillUpdate(){
		this.setStyles();
	}

	render(){
		return (
			<div className="targetContainer" style={this.containerStyle}>
				<div className="outerRing" style={this.outerRingStyle}>
					<div className="middleRing" style={this.middleRingStyle}>
						<div className="bullsEye" style={this.bullsEyeStyle} />
					</div>
				</div>
				{this.renderBulletHole()}
			</div>
		);
	}

	renderBulletHole() {
		if (!this.props.bulletHolePosition)
			return;
		return (
			<div className="bulletHole" style={this.bulletHoleStyle} />
		);
	}
}