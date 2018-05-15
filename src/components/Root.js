import React, { Component } from 'react';
import Tank from "./Tank";
import "../scss/root.css";

let cannonAngle = 0;
const upperCannonAngleLimit = -40;
const lowerCanonAngleLimit = 15;

export default class Root extends Component {

    constructor() {
        super();
        this.state = {cannonAngle: cannonAngle};
        this.onWindowKeyDown = this.onWindowKeyDown.bind(this);
    }

	componentDidMount() {
		window.addEventListener("keydown", this.onWindowKeyDown);
	}

	onWindowKeyDown(event){
		event.stopPropagation();
		event.preventDefault();

		switch(event.key){

			case "ArrowDown":
				if (this.state.cannonAngle < lowerCanonAngleLimit)
					this.moveCannon(5);
				break;

			case "ArrowUp":
				if (this.state.cannonAngle > upperCannonAngleLimit)
					this.moveCannon(-5);
				break;

			default:
		}
	}

	moveCannon(offset) {
		this.setState({cannonAngle: this.state.cannonAngle + offset});
	}

    render() {
        return (
            <div className="Root">
                <Tank cannonAngle={this.state.cannonAngle} />
            </div>
        );
    }
}
