import React, {Component} from 'react';
import {ProjectDescription} from './ProjectDescription';
import {TweenMax} from 'gsap';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import './ProjectImage.scss';
import {Link} from 'react-router';
import VideoPlayer from './VideoPlayer';
import $ from 'jquery';

export class ProjectImage extends Component {

	constructor(props) {
		super(props);
		this.buildImage = this.buildImage.bind(this);
		this.containerAdd = this.containerAdd.bind(this);
		this.buildDescription = this.buildDescription.bind(this);
		this.buildPrev = this.buildPrev.bind(this);
		this.handleInfo = this.handleInfo.bind(this);
		this.handleRemoveInfo = this.handleRemoveInfo.bind(this);
		this.state = {
			infoClicked: false,
			expanded: false,
			loading: true
		};
	}

	fadeIn() {
		const image = this.props.imageObject;
		const projectImage = this;
		return function () {
			projectImage.setState({
				loading: false
			});
			$(`#img${image.IMAGE_ID}`).fadeIn(200);
		};
	}

	componentWillReceiveProps(nextProps) {
		const curImageId = this.props.imageObject.IMAGE_ID;
		const nextImageId = nextProps.imageObject.IMAGE_ID;

		if (curImageId !== nextImageId) {
			this.setState({
				loading: true
			});
		}
	}

	buildVideo() {
		const image = this.props.imageObject;
		const videoId = image.PROJECT_ID;
		const videoSource = image.IMAGE_SOURCE;
		const videoPoster = image.IMAGE_BACK;

		return (
			<VideoPlayer id={videoId} source={videoSource} poster={videoPoster}/>
		);
	}

	buildImage() {
		const image = this.props.imageObject;
		const imgId = `img${image.IMAGE_ID}`;

		if (image.IMAGE_TYPE === 2) {
			return this.buildVideo();
		}

		return (
			<div className="projectImageWrapper">
				<img id={imgId} src={image.IMAGE_SOURCE} onLoad={this.fadeIn()} onChange={this.fadeIn()}/>
			</div>
		);
	}

	buildLoader() {
		const image = this.props.imageObject;

		if (this.state.loading && image.IMAGE_TYPE !== 2) {
			return (
				<div className="imageLoader">
					<i className="fa fa-spin fa-3x fa-circle-o-notch" aria-hidden="true"></i>
				</div>
			);
		}

		return (
			<div className="imageLoader">
			</div>
		);
	}

	buildDescription() {
		if (this.state.infoClicked) {
			const image = this.props.imageObject;

			return (
				<ProjectDescription key={image} imageObject={image}/>
			);
		}

		return (
			<div>
			</div>
		);
	}

	buildPrev() {
		const index = this.props.index;
		const curLocation = this.props.location;

		if (index === 0) {
			return (<div></div>);
		}

		return (
			<div className="arrow left-button">
				<Link to={`${curLocation}/${index - 1}`}>
					<i className="fa fa-chevron-left fa-sm arrowIcon" aria-hidden="true"></i>
				</Link>
			</div>
		);
	}

	buildNext() {
		const index = this.props.index;
		const maxIndex = this.props.maxIndex;
		const curLocation = this.props.location;

		if (index === maxIndex) {
			return (<div></div>);
		}

		return (
			<div className="arrow right-button">
				<Link to={`${curLocation}/${index + 1}`}>
					<i className="fa fa-chevron-right fa-sm arrowIcon" aria-hidden="true"></i>
				</Link>
			</div>
		);
	}

	handleRemoveInfo() {
		if ($(".info").hasClass("infoClicked")) {
			$(".info").removeClass("infoClicked");
		}

		this.setState({
			infoClicked: false
		});
	}

	handleInfo() {
		if ($(".info").hasClass("infoClicked")) {
			$(".info").removeClass("infoClicked");
		} else {
			$(".info").addClass("infoClicked");
		}

		const isInfoClicked = this.state.infoClicked;
		this.setState({
			infoClicked: !isInfoClicked
		});
	}

	addImage() {
		$(".Subject").addClass("imagePopped");
	}

	componentWillEnter(callback) {
		const el = this.container;

		const newCallback = () => {
			$(".Subject").addClass("imagePopped");
			$(".projects").height("43%");
			callback();
		};

		TweenMax.fromTo(el, 0.4, {opacity: 0, height: "0%"}, {opacity: 1, height: "57%", onComplete: newCallback});
	}

	componentWillLeave(callback) {
		const el = this.container;
		$(".Subject").removeClass("imagePopped");
		$(".projects").height("100%");
		TweenMax.fromTo(el, 0.4, {opacity: 1, height: "57%"}, {opacity: 0, height: "0%", onComplete: callback});
	}

	containerAdd(container) {
		this.container = container;
	}

	render() {
		const image = this.buildImage();
		const description = this.buildDescription();
		const prev = this.buildPrev();
		const next = this.buildNext();
		const loader = this.buildLoader();

		return (
			<div className="row projectImage" ref={this.containerAdd}>
				<div className="col col-xs-11 col-sm-11 col-mid-7 col-lg-7 center-block">
					{image}
				</div>
				{loader}
				<div className="description" onClick={this.handleRemoveInfo}>
					<TransitionGroup>
						{description}
					</TransitionGroup>
				</div>
				<div className="close right-button">
					<Link to={this.props.location}>
						<i className="fa fa-times-thin fa-sm closeIcon" aria-hidden="true"></i>
					</Link>
				</div>
				<div className="info left-button" onClick={this.handleInfo}>
					<i className="fa fa-info-circle fa-2x fa-sm infoIcon" aria-hidden="true"></i>
				</div>
				{prev}
				{next}
			</div>
		);
	}
}

ProjectImage.propTypes = {
	imageObject: React.PropTypes.object,
	location: React.PropTypes.string,
	index: React.PropTypes.number,
	maxIndex: React.PropTypes.number
};
