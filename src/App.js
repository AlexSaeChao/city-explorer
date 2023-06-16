import React from 'react';
import axios from 'axios';
import WeatherModal from './WeatherModal';
import MoviesCarousel from './MoviesCarousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
      forecastData: [],
      showWeatherModal: false,
      showMoviesCarousel: false,
      movies: [],
    };
  }

  handleGetCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleGetWeatherInfo = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.locationData.latitude}&lon=${this.state.locationData.longitude}&searchQuery=${this.state.city}`;
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

  handleWeatherButtonClick = () => {
    this.setState({
      showWeatherModal: true,
    });
  };

  handleMoviesButtonClick = async () => {
    try {
      const movieKeywordFromFrontend = this.state.city;
      const url = `${process.env.REACT_APP_SERVER}/movie?mov=${movieKeywordFromFrontend}`;
      const movieDataFromAxios = await axios.get(url);
      const groomedMovieData = movieDataFromAxios.data;
      this.setState({
        movies: groomedMovieData,
        showMoviesCarousel: true,
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: 'Error fetching movie data, ' + error.message,
      });
    }
  };

  handleGetCityInfo = async (event) => {
    event.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${this.state.city}&format=json`;
      let cityDataFromAxios = await axios.get(url);
      let data = cityDataFromAxios.data;

      if (data.length > 0) {
        const locationData = {
          latitude: data[0].lat,
          longitude: data[0].lon,
          display_name: data[0].display_name,
        };

        this.setState({
          locationData,
          mapImageUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API}&center=${locationData.latitude},${locationData.longitude}&zoom=10`,
          error: false,
          errorMsg: ''
        }, () => {
          this.handleGetWeatherInfo();
          this.handleMoviesButtonClick();
        });
      } else {
        this.setState({
          error: true,
          errorMsg: 'No Results',
          mapImageUrl: '',
        });
      }
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
          <>
            <Card className="content">
              <Card.Body>
                <Card.Title className="location-info">{this.state.locationData.display_name}</Card.Title>
                <Card.Text className="location-info">
                  Latitude: {this.state.locationData.latitude} Longitude: {this.state.locationData.longitude}
                </Card.Text>
                <div className="button-container">
                  <Button onClick={this.handleWeatherButtonClick} variant="primary">
                    Show Weather
                  </Button>
                </div>
                {this.state.mapImageUrl && <Card.Img src={this.state.mapImageUrl} alt="City Map" className="city-map" />}
              </Card.Body>
            </Card>
            {this.state.showWeatherModal && (
              <WeatherModal
                show={this.state.showWeatherModal}
                onClose={() => this.setState({ showWeatherModal: false })}
                forecastData={this.state.forecastData}
              />
            )}
            {this.state.showMoviesCarousel && (
              <MoviesCarousel movies={this.state.movies} />
            )}
          </>
        )}
        <footer className="footer">Author: Alex Chao</footer>
      </div>
    );
  }

}
export default App;
