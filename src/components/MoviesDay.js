import React from 'react';

class MoviesDay extends React.Component {
  render() {
    return (
      <tr key={this.props.index}>
        <td>{this.props.movie.title}</td>
        <td>{this.props.movie.overview}</td>
      </tr>
    )
  }
}

export default MoviesDay;