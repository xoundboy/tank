import React, { Component } from 'react';

export default class ScalableComponent extends Component {

	reScale(initialPixelValue) {
		return initialPixelValue * this.props.scale + 'px';
	}
}