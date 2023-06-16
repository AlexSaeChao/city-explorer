import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const WeatherModal = ({ show, onClose, forecastData }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Weather</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Low Temperature</th>
              <th>Hi Temperature</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {forecastData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.lowTemperature}</td>
                <td>{item.highTemperature}</td>
                <td>{item.description}</td>
              </tr>
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

export default WeatherModal;
