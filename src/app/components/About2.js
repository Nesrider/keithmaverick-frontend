import React, {Component} from 'react';
import './About2.scss';
import {aboutContent, aboutPic} from '../constants/aboutConstants';
import {logs} from '../constants/logConstants';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {Log} from './Log';
import $ from 'jquery';

export class About2 extends Component {

	constructor(props) {
		super(props);

		this.state = {
			content: aboutContent,
			showLog: false,
			initResize: true
		};

		this.handleShowLogs = this.handleShowLogs.bind(this);

		$(window).resize(() =>
			this.resizeAboutPic()
		);
	}

	componentDidMount() {
		if (this.state.initResize) {
			this.resizeAboutPic();
		}

		this.setState({
			initResize: false
		});
	}

	resizeAboutPic() {
		if ($(window).width() > 1199) {
			const leftSoftwareHeight = $('.leftSoftware').height();
			const rightExperienceHeight = $('.rightExperience').height();
			$('.aboutImg').height(rightExperienceHeight - (20 + leftSoftwareHeight));
			$('#aboutPhoto').css({
				'width': 'auto',
				'position': 'absolute',
				'transform': 'translate3d(-50%, -50%, 0)',
				'-webkit-transform': 'translate3d(-50%,-50%,0)',
				'-ms-transform': 'translate3d(-50%,-50%,0)',
				'min-height': '100%'
			});
			$('.aboutImg').css('position', 'relative');
		} else {
			$('.aboutImg').css({
				height: 'auto',
				position: 'static'
			});
			$('#aboutPhoto').css({
				'width': '100%',
				'position': 'static',
				'transform': 'none',
				'-webkit-transform': 'none',
				'-ms-transform': 'none',
				'min-height': '0'
			});
		}
	}

	handleFadeIn() {
		$('#aboutPhoto').fadeIn(200);
		this.resizeAboutPic();
	}

	handleShowLogs() {
		this.setState({
			showLog: !this.state.showLog
		});
	}

	addNewLine(contentLength, i) {
		if (i !== contentLength) {
			return (<br/>);
		}

		return (<div></div>);
	}

	skillMeter(item) {
		return (<tr className="row" key={item.skill}>
			<td className="skill col-xs-6 col-sm-6 col-md-6 col-lg-6">{item.skill}</td>
			<td className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<div className="skillMeter">
					<div className="bar" style={{width: `${item.score * 10}%`}}>
						&nbsp;
					</div>
				</div>
			</td>
		</tr>);
	}

	render() {
		const content = this.state.content;
		const experienceLength = content.Experience.length - 1;
		const tech = content.Skills.Tech.map(item => this.skillMeter(item));
		const design = content.Skills.Design.map(item => this.skillMeter(item));
		const hobbies = content.Skills.Hobbies.map(item => this.skillMeter(item));
		const showLogs = this.state.showLog ? (<Log key={"site_logs"}/>) : (<div/>);

		const experience = content.Experience.map((item, i) =>
			(<div key={item.Company}>
				<div className="aboutTextTitle">
					<b>{item.Company}</b>, {item.Position} | {item.Time}
				</div>
				<p className="aboutTextDesc">
					{item.Description}
				</p>
				{this.addNewLine(experienceLength, i)}
			</div>)
		);

		return (
			<div className="container aboutPage">
				<div className="container containerName ">
					<div className="row">
						<div className="col aboutName aboutBox">
							<div className="align-center">
								<div className="aboutMainName">
									{content.Name}
								</div>
								<div className="aboutSubName aboutEduName">
									{content.School}
								</div>
								<div className="aboutSubName aboutMajorName">
									{content.Major}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container containerDesc aboutText align-center">
					<div className="row doubleBoxCol">
						<div className="col col-lg-6 leftBox">
							<div className="row aboutBoxCol leftSoftware">
								<div className="center-block">
									<div className="aboutBoxTitle">
										<b>Software Engineer</b>
									</div>
									<p>
										{content.Description}
									</p>
								</div>
							</div>
							<div className="row aboutImg">
								<img id="aboutPhoto" src={aboutPic} onLoad={this.handleFadeIn()}/>
							</div>
						</div>
						<div className="col col-lg-6 rightBox">
							<div className="row aboutBoxCol rightExperience">
								<div className="center-block">
									<div className="aboutBoxTitle">
										<b>Experience</b>
									</div>
									<div>
										{experience}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row doubleBoxCol">
						<div className="col col-lg-6 leftBox">
							<div className="aboutSkills aboutBoxCol">
								<div className="aboutBoxTitle">
									<b>Programming</b>
								</div>
								<table>
									<tbody>
										{tech}
									</tbody>
								</table>
							</div>
						</div>
						<div className="col col-lg-6 rightBox">
							<div className="aboutSkills aboutBoxCol">
								<div className="aboutBoxTitle">
									<b>Design</b>
								</div>
								<table>
									<tbody>
										{design}
									</tbody>
								</table>
								<br/>
								<br/>
								<br/>
								<div className="aboutBoxTitle">
									<b>Hobbies</b>
								</div>
								<table>
									<tbody>
										{hobbies}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="row aboutBoxCol">
						<div className="center-block">
							<div className="aboutBoxTitle vertical-align-text">
								<b>The Website v{logs[0].vers}</b>
							</div>
							<p>
								{content.Website}
							</p>
							<div className="showLogButton activeBtn" onClick={this.handleShowLogs}>
								{this.state.showLog ? "Hide Logs" : "Show Logs"}
							</div>
							<TransitionGroup>
								{showLogs}
							</TransitionGroup>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
