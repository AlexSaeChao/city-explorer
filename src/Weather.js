import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
 
    return (
      <div className="weather-container">
        {this.props.forecastData.map((forecast, index) => (
          < div key={index} className="forecast-item" >
            <p className="forecast-date">{forecast.data}</p>
            <p className="forecast-description">{forecast.description}</p>
          </div>
        ))
        }
      </div >
    )
  }

}

export default Weather;
