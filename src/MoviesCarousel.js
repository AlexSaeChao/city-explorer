import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const MoviesCarousel = ({ movies }) => {
  return (
    <div className="movies-carousel">
      <h2>Movies</h2>
      <Carousel>
        {movies.map((movie, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={movie.image_url} alt={movie.title} />
            <Carousel.Caption>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MoviesCarousel;
