import React from 'react';
import axios from 'axios';
import Weather from './Weather';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: [],
      error: false,
      errorMsg: '',
      mapImageUrl: '',
    }
  }

  handleGetCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleGetWeatherInfo = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`;
      let weatherDataFromAxios = await axios.get(url);
      let weatherData = weatherDataFromAxios.data;



      this.setState({
        forecastData: weatherData,
        error: false,
        errorMsg: ''
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: 'Error fetching data, ' + error.message,
      })
    }
  }



  handleGetCityInfo = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${this.state.city}&format=json`;
      let cityDataFromAxios = await axios.get(url);
      let data = cityDataFromAxios.data;


      if (data.length > 0) {
        this.setState({
          locationData: {
            latitude: data[0].lat,
            longitude: data[0].lon,
            display_name: data[0].display_name,
          },
          mapImageUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API}&center=${data[0].lat},${data[0].lon}&zoom=10`,
          error: false,
          errorMsg: ''
        })
      } else {
        this.setState({
          error: true,
          errorMsg: 'No Results',
          mapImageUrl: '',
        });
      }

      this.handleGetWeatherInfo();

    } catch (error) {
      this.setState({
        error: true,
        errorMsg: 'Error fetching data, ' + error.message,
        mapImageUrl: '',
      });
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1>City Explorer</h1>
        <form onSubmit={this.handleGetCityInfo} className="form-container">
          <label htmlFor=""> Enter a City Name:
            <input type="text" onChange={this.handleGetCityInput} />
          </label>
          <button type="submit" className="submit-button">Exploration Time!</button>
        </form>
        {this.state.error ? (
          <div className="alert alert-danger" role="alert">
            Error: {this.state.errorMsg}
          </div>
        ) : (
          <Card className="content">
            <Card.Body>
              <Card.Title className="location-info">{this.state.locationData.display_name}</Card.Title>
              <Card.Text className="location-info">Latitude: {this.state.locationData.latitude} Longitude: {this.state.locationData.longitude}</Card.Text>
              {this.state.forecastData && this.state.forecastData.length > 0 && <Weather forecastData={this.state.forecastData} />}
              {this.state.mapImageUrl && <Card.Img src={this.state.mapImageUrl} alt="City Map" className="city-map" />}
            </Card.Body>
          </Card>
        )}
        <footer className="footer">Author: Alex Chao</footer>
      </div>
    )
  }
}


export default App;
