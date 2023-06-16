import React from 'react';
import axios from 'axios';
import WeatherModal from './WeatherModal';
import MoviesModal from './MoviesModal';
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
      showMoviesModal: false,
      movies: [],
    };
  }

  handleGetCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  handleGetWeatherInfo = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.locationData.latitude}&lon=${this.state.locationData.longitude}&searchQuery=${this.state.city}`;
      let weatherDataFromAxios = await axios.get(url);
      let weatherData = weatherDataFromAxios.data;

      this.setState({
        forecastData: weatherData,
        error: false,
        errorMsg: '',
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: 'Error fetching data, ' + error.message,
      });
    }
  };

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
      const MovieData = movieDataFromAxios.data;
      this.setState({
        movies: MovieData,
        showMoviesModal: true,
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

        this.setState(
          {
            locationData,
            mapImageUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API}&center=${locationData.latitude},${locationData.longitude}&zoom=10`,
            error: false,
            errorMsg: '',
          },
          () => {
            this.handleGetWeatherInfo();
          }
        );
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
  };

  render() {
    return (
      <div>
        <header className="header">City Explorer</header>
        <div className="container">
          <form onSubmit={this.handleGetCityInfo} className="form-container">
            <div className="label-field-container">
              <label htmlFor="">Enter a City Name:</label>
              <input type="text" onChange={this.handleGetCityInput} />
              <button type="submit" className="submit-button">
                Exploration Time!
              </button>
            </div>
          </form>
          {this.state.error ? (
            <div className="error-message">Error: {this.state.errorMsg}</div>
          ) : (
            <div className="content">
              <div className="card-placeholder">
                <Card>
                    {this.state.mapImageUrl && (
                      <Card.Img src={this.state.mapImageUrl} alt="City Map" className="city-map" />
                    )}
                  <Card.Body>
                    <Card.Title className="location-info">
                      {this.state.locationData.display_name}
                    </Card.Title>
                    <Card.Text className="location-info">
                      Latitude: {this.state.locationData.latitude} Longitude: {this.state.locationData.longitude}
                    </Card.Text>
                    <div className="button-container">
                      <Button onClick={this.handleWeatherButtonClick} variant="primary">
                        Show Weather
                      </Button>
                      <Button onClick={this.handleMoviesButtonClick} variant="secondary">
                        Show Movies
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="carousel-placeholder">
                {this.state.showWeatherModal && (
                  <WeatherModal
                    show={this.state.showWeatherModal}
                    onClose={() => this.setState({ showWeatherModal: false })}
                    forecastData={this.state.forecastData}
                  />
                )}
                {this.state.showMoviesModal && (
                  <MoviesModal
                    show={this.state.showMoviesModal}
                    onClose={() => this.setState({ showMoviesModal: false })}
                    movies={this.state.movies}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
