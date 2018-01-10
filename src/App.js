import React, { Component } from 'react';
import './App.css';
import Demo from './Geolocation';

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
        <Demo />
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


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log('L ' + latitude);
        console.log('L' + longitude);

        if (latitude && longitude) {

          // geocoder.reverse({lat:45.767, lon:4.833}, function(err, res) {
          //   console.log(res);
          // });

          geocoder.reverse({lat:latitude, lon:longitude}, function (geocoderError, geocoderResponse) {
            console.log(geocoderError);
            console.log(geocoderResponse);
            var zipCode = getZipCode(geocoderResponse) || DEFAULT_ZIP_CODE;
            fetch('http://spinnerapi-env.syswtxnkfe.us-west-2.elasticbeanstalk.com/restaurants/' + zipCode,
            )
              .then((result) => {
                return result.json();
              }).then((jsonResult) => {
                that.setState({ restaurants: jsonResult })
              })
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
      <img src={props.image} alt='restaurant' />
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
