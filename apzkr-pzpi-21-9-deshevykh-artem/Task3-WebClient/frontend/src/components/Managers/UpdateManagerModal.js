import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateManager } from "../../services/ManagersService";

const UpdateManagerModal = ({ show, onHide, manager, setUpdated }) => {
  const [managerInfo, setManagerInfo] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    managed_pets: []
  });

  const [availablePets, setAvailablePets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/Pets/");
        const data = await response.json();
        setAvailablePets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    if (manager) {
      setManagerInfo({
        username: manager.username || "",
        email: manager.email || "",
        password: "",
        location: manager.location || "",
        managed_pets: manager.managed_pets || []
      });
    }
  }, [manager]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "managed_pets") {
      const selectedPets = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setManagerInfo((prevState) => ({
        ...prevState,
        [name]: selectedPets
      }));
    } else {
      setManagerInfo((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateManager(manager.id, managerInfo);
      console.log("Manager updated:", response);
      alert("Manager updated successfully");
      setUpdated(true);
      onHide();
    } catch (error) {
      console.error("Error updating manager:", error);
      alert("Failed to update manager");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={managerInfo.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={managerInfo.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={managerInfo.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={managerInfo.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="managedPets">
            <Form.Label>Managed Pets</Form.Label>
            <Form.Control
              as="select"
              name="managed_pets"
              value={managerInfo.managed_pets}
              onChange={handleChange}
              multiple
            >
              {availablePets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Manager
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateManagerModal;