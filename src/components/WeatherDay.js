import React from 'react';

class WeatherDay extends React.Component {
  render() {
    return (
      <tr key={this.props.index}>
        <td>{this.props.item.date}</td>
        <td>{this.props.item.lowTemperature}</td>
        <td>{this.props.item.highTemperature}</td>
        <td>{this.props.item.description}</td>
      </tr>
    )
  }
}

export default WeatherDay;