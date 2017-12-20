import React, { Component } from 'react';
import './App.css';

const defaultImage = 'https://raw.githubusercontent.com/jchadhowell/LunchSpinner/master/public/images/lunch.jpeg';
const images = [
  'https://media.cntraveler.com/photos/599374c130e0b978de5929d7/master/w_775,c_limit/Ithaa-Undersea-Restaurant.jpg',
  'https://santabarbaraca.com/content/uploads/2015/08/restaurants-santa-barbara.jpg',
  'https://media.cntraveler.com/photos/589a20129b67416638b3bf3a/master/pass/best-restaurants-london-dinner-2017.jpg',
  'https://now-here-this.timeout.com/wp-content/uploads/2014/03/7138287747_6fefd52f74_b-528x352.jpg'


]


const buttonDisplay = 'Give it a Spin!';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: defaultImage,
    }
  }

  onClick() {
    let index = Math.floor( Math.random() * (3));
    this.setState({
      image: images[index],
    })
  }

  render() {
    return (
      <div>
        <h1>What's For Lunch?</h1>
        <Restaurant
          image={this.state.image} />
        <Spinner
          display={buttonDisplay}
          onClick={() => this.onClick()} />
      </div>
    );
  }
}

function Restaurant(props) {
  return (
    <img src={props.image} alt='restaurant' height='300' width='300' />
  )
}

function Spinner(props) {
  return <button onClick={props.onClick} >{props.display}</button>
}

export default App;
