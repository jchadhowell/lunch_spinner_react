import React, { Component } from 'react';
import './App.css';
import Demo from './Geolocation';

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

    let index = Math.floor(Math.random() * (10));
    this.setState({
      image: this.state.restaurants[index].image_url,
      name: this.state.restaurants[index].name,

    })
  }

  render() {

    const divStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
      border: '3px solid green',
      padding: '10px',
    };


    return (


      <div style={divStyle} >
        <h1 style={{ textAlign: 'center' }} >What's For Lunch?</h1>
        <Restaurant
          image={this.state.image}
          name={this.state.name} />
        <Spinner
          display={buttonDisplay}
          onClick={() => this.onClick()} />
          <Demo/>
      </div>
    );
  }

  componentDidMount() {
    fetch('http://spinnerapi-env.syswtxnkfe.us-west-2.elasticbeanstalk.com/restaurants',
    )
      .then((result) => {
        return result.json();
      }).then((jsonResult) => {
        this.setState({ restaurants: jsonResult })
      })
  }
}

function Restaurant(props) {
  return (
    <div>
      <img src={props.image} alt='restaurant' />
      <div style={{textAlign:'center'}}>{props.name}</div>
    </div>
  )
}

const buttonStyle = {
  textAlign: 'center',
};


function Spinner(props) {
  return <div style={buttonStyle}>
    <button onClick={props.onClick} >{props.display}</button>
  </div>
}




export default App;
