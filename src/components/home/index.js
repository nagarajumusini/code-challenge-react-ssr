import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header';
if (process.env.WEBPACK) require('./index.scss');

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<div className='home'>
				<Header title='Home' />
				<div>This is home</div>
				<br />
				<Link to='/page'>
					<button className="button">Show user details</button>
				</Link>
			</div>
		)
	}

}

export default Home
