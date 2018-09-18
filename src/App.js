import React, { Component } from 'react';
// import easing from 'easing-functions';
import Slot from './Slot.jsx';
import queryString from 'query-string';
import urbanDictionaryService from './services/urbanDictionaryService';

import './App.css';
import alex from './images/alex.png';
import rob from './images/rob.png';
import jiten from './images/jiten.png';
import raluca from './images/raluca.png';
import joe from './images/joe.png';
import rik from './images/rik.png';
import questionMark from './images/questionMark.gif';

const namesMapper = { 
	'???': questionMark,
	'alex': alex,
	'rob': rob,
	'jiten': jiten,
	'raluca': raluca,
	'joe': joe,
	'rik': rik
};

class App extends Component {
	constructor() {
		super();

		const { names = '' } = queryString.parse(window.location.search);
		this.nameArray = names.split(',');

		this.state = {
			names: this.nameArray.concat(this.nameArray).concat(this.nameArray).concat(this.nameArray).concat(this.nameArray).concat(this.nameArray).concat(this.nameArray).concat(this.nameArray),
			person: 0,
			times: 0,
			result: {}
		}

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const index =	Math.floor(Math.random() * (this.nameArray.length));
		urbanDictionaryService()
			.then(result => {
				this.setState ({ 
					person: index + 1,
					result
				})
		})

		console.log(index);
	}
	
	render() {
		const style={ height: '300px', width: '250px', lineHeight: '34px' };

		return (
			<div className="App">
			<div className="slot-machine">
				<Slot
					className="slot"
					duration={ 3000 }
 					target={ this.state.person }
					times={ this.state.times }
					>
					{
						this.state.names.map((value, i) =>
							<div key={ i+1 } style={ style }>
								<img alt={ value } src={ namesMapper[value] }></img>
							</div>
						)
					}
				</Slot>
				<Slot
					className="slot"
					duration={ 3500 }
					target={ this.state.person }
					times={ this.state.times }
					>
					{
						this.state.names.map((value, i) =>
							<div key={ i+1 } style={ style }>
								<img alt={ value } src={ namesMapper[value] }></img>
							</div>
						)
					}
				</Slot>
				<Slot
					className="slot"
					duration={ 4500 }
					target={ this.state.person }
					times={ this.state.times }
					>
					{
						this.state.names.map((value, i) =>
							<div key={ i+1 } style={ style }>
								<img alt={ value } src={ namesMapper[value] }></img>
							</div>
						)
					}
				</Slot>
			</div>
			<button onClick={this.onClick}></button>
			<div className="naughty-word">
				<b>{ this.state.result.word }</b>
				<p>{ this.state.result.definition }</p>
				{ this.state.result.example }
			</div>
			</div >
		);
	}
}

export default App;
