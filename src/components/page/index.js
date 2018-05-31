import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header';
import axios from 'axios';
if (process.env.WEBPACK) require('./index.scss');

class Home extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			loading: false,
			error: false,
			userData: {}
		}
	}

	componentDidMount() {
		axios.get('app/user')
			.then(res => {
				console.log('get user data', res);
				if (res.status == 200) {
					//success
					this.setState({
						error: false,
						loading: false,
						userData: res.data.data
					})
				} else {
					//Error
					this.setState({
						error: true,
						loading: false
					})
				}
			}).catch(error => {
				console.log("error", error)
				this.setState({
					error: true,
					loading: false
				})
			});
	}
	handleChange(event){
		var gthis = this;
		const target = event.target;
		const value = target.value;
		const name = target.name;

		const { userData } = gthis.state;
		this.setState({
			userData: {
				...userData,
				[name]: value
			}
		});
	}

	render() {
		//console.log('render', this.state);
		const { userData }= this.state;
		return (
			<div className='home'>
				<Header title='User Details Page' />
				<Link to='/'>
					<button className="button">Go To Home</button>
				</Link>
				<br />
				<div className="container">
					<div className="row">
						<div className="col-25">
							<label htmlFor="name">Name</label>
						</div>
						<div className="col-75">
							<input 
								type="text" 
								id="name" 
								name="name" 
								placeholder="Your name.." 
								value={userData.name}
        						onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label htmlFor="name">Type of contract</label>
						</div>
						<div className="col-75">
							<input type="radio" id="contract" name="contract" value="consultant" checked={userData.contract == 'consultant'} onChange={this.handleChange}/> Consultant
							<input type="radio" id="contract" name="contract" value="permanent" checked={userData.contract == 'permanent'} onChange={this.handleChange}/> Permanent
						</div>
					</div>
					<div className="row">
						<div className="col-25">
							<label htmlFor="country">Country</label>
						</div>
						<div className="col-75">
							<select id="country" name="country" value={userData.country} onChange={this.handleChange}>
								<option value="australia">Australia</option>
								<option value="canada">Canada</option>
								<option value="usa">USA</option>
								<option value="United Kingdom">United Kingdom</option>
							</select>
						</div>
					</div>
				</div>

			</div>
		)
	}

}

export default Home
