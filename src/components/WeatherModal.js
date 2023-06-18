import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import WeatherDay from './WeatherDay';


class WeatherModal extends React.Component {
  render() {
    const { show, onClose, forecastData } = this.props;

    return (
      <Modal show={show} onHide={onClose} >
        <Modal.Header closeButton>
          <Modal.Title>Weather</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date (YYYY-MM-DD)</th>
                <th>Low Temp (c)</th>
                <th>High Temp (c)</th>
                <th>Weather Description</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((item, index) => (
                <WeatherDay item={item} index={index} key={index} />
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
  };
}

export default WeatherModal;
