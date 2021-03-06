import React, {Component} from 'react';
import {Subject} from './Subject';

export class AdSubject extends Component {
	render() {
		return (
			<Subject subjectID="2" path="/design" subjectName="Art and Design" icon="./images/icons/pencil.svg" curImage={this.props.params.imageName} albumStyle/>
		);
	}
}

AdSubject.propTypes = {
	params: React.PropTypes.object
};
