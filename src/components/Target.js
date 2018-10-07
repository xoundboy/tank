import React from 'react';
import ScalableComponent from "./ScalableComponent";
import '../scss/Target.css';

export default class Target extends ScalableComponent {

	constructor(props){
		super(props);
		this.setInitialStyles();
	}

	setInitialStyles() {
		this.containerStyle = {
			left: this.props.horizontalPosition	+ "px"
		};
		this.outerRingStyle = {
			width: this.reScale(10),
			height: this.reScale(60)
		};
		this.middleRingStyle = {
			width: this.reScale(6),
			height: this.reScale(36)
		};
		this.bullsEyeStyle = {
			width: this.reScale(2),
			height: this.reScale(12)
		};
	}

	render(){
		return (
			<div className="targetContainer" style={this.containerStyle}>
				<div className="outerRing" style={this.outerRingStyle}>
					<div className="middleRing" style={this.middleRingStyle}>
						<div className="bullsEye" style={this.bullsEyeStyle} />
					</div>
				</div>
			</div>
		);
	}
}