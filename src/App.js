import React, { Component } from 'react';
import './App.css';

const defaultImage = 'https://raw.githubusercontent.com/jchadhowell/LunchSpinner/master/public/images/lunch.jpeg';

const buttonDisplay = 'Give it a Spin!';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: defaultImage,
      restaurants: [],
    }
  }

  onClick() {

    let index = Math.floor(Math.random() * (3));
    console.log("restaurants: " + this.state.restaurants);
    this.setState({
      image: this.state.restaurants[index].image_url,

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

  componentDidMount() {
    let restaurantsFetched = [];
    fetch('http://spinnerapi-env.syswtxnkfe.us-west-2.elasticbeanstalk.com/restaurants',
    )
      .then((result) => {
        return result.json();
      }).then((jsonResult) => {
        console.log("restaurants fetched: " + jsonResult);
        restaurantsFetched = jsonResult;
      })
      this.setState({restaurants:restaurantsFetched})
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
