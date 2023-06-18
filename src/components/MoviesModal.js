import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import MoviesDay from './MoviesDay';

class MoviesModal extends React.Component {
  render() {
    const { show, onClose, movies } = this.props;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <MoviesDay movie={movie} index={index} key={index} />
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MoviesModal;
