import React, { Component } from 'react';
import './App.css';

var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
};

var geocoder = NodeGeocoder(options);

const defaultImage = 'https://raw.githubusercontent.com/jchadhowell/LunchSpinner/master/public/images/lunch.jpeg';

const DEFAULT_ZIP_CODE = '78665';

const buttonDisplay = 'Give it a Spin!';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: defaultImage,
      restaurants: [],
      city: "Your City"
    }
  }

  onClick() {

    let index = Math.floor(Math.random() * (10));
    this.setState({
      image: this.state.restaurants[index].image_url,
      name: this.state.restaurants[index].name,
      url: this.state.restaurants[index].mobile_url,

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
        <h1 style={{ textAlign: 'center' }} >What's For Lunch in {this.state.city}?</h1>
        <Restaurant
          image={this.state.image}
          name={this.state.name}
          url={this.state.url} />
        <Spinner
          display={buttonDisplay}
          onClick={() => this.onClick()} />

      </div>
    );
  }

  componentDidMount() {

    var that = this;

    function getZipCode(res) {
      if (res && res.length && res[0].zipcode) {
        return res[0].zipcode;
      }
      return null;
    }



    function logResult(result) {
      console.log(result);
      that.setState({ restaurants: result });
    }

    function logError(error) {
      console.log('Looks like there was a problem: \n', error);
    }

    function validateResponse(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    function readResponseAsJSON(response) {
      console.log(response);
      return response.json();
    }

    function fetchJSON(pathToResource) {
      fetch(pathToResource)
        .then(validateResponse)
        .then(readResponseAsJSON)
        .then(logResult)
        .catch(logError);
    }


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        if (latitude && longitude) {

          geocoder.reverse({ lat: latitude, lon: longitude }, function (geocoderError, geocoderResponse) {
            that.setState({ city: geocoderResponse[0].city });
            var zipCode = getZipCode(geocoderResponse) || DEFAULT_ZIP_CODE;

            fetchJSON("https://api.lunch-spinner.com/restaurants/" + zipCode);
          });

        } else {
          console.log("no lattitude or longitude");
        }
      }, function (error) {
        console.log(error);
      }, { timeout: 10000 });
    }
  }
}

function Restaurant(props) {
  return (
    <div>

      <a href={props.url}>
        <img src={props.image} alt="restaurant" />
      </a>
      <div style={{ textAlign: 'center' }}>{props.name}</div>
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
