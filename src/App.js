import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: [],
      error: false,
      errorMsg: '',
    }

  }
  handleGetCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleGetCityInfo = async (event) => {
    event.preventDefault();

    try {

      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${this.state.city}&format=json`;

      let cityDataFromAxios = await axios.get(url);
      let { data } = cityDataFromAxios;

      if (data.length > 0) {
        let { lat, lon, display_name } = data[0];

        this.setState({
          locationData: {
            latitude: lat,
            longitude: lon,
            display_name: display_name
          },
          error: false,
          errorMsg: ''
        })
      } else {
        this.setState({
          error: true,
          errorMsg: 'No Results'
        });
      }

    } catch (error) {
      this.setState({
        error: true,
        errorMsg: 'Error fetching data, ' + error.message

      });
    }
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleGetCityInfo}>
          <label htmlFor=""> Enter a City Name:
            <input type="text" onChange={this.handleGetCityInput} />
          </label>
          <button type="submit">Exploration Time!</button>
        </form>
        {
          this.state.error ? <p>{this.state.errorMsg}</p> :
            <div>
              <p>{this.state.locationData.display_name}</p>
              <p>Latitude: {this.state.locationData.latitude}</p>
              <p>Longitude: {this.state.locationData.longitude}</p>
            </div>
        }
      </>
    )
  }
}


export default App;
