import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addManager } from "../../services/ManagersService";

const AddManagerModal = (props) => {
    const [managerInfo, setManagerInfo] = useState({
        username: '',
        email: '',
        password: '',
        location: '',
        managed_pets: []
    });

    const [availablePets, setAvailablePets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/Pets/");
            const data = await response.json();
            setAvailablePets(data);
        };

        fetchPets();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "managed_pets") {
            const selectedPets = Array.from(e.target.selectedOptions, option => option.value);
            setManagerInfo(prevState => ({
                ...prevState,
                [name]: selectedPets
            }));
        } else {
            setManagerInfo(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        addManager(managerInfo)
        .then((result) => {
            alert('Manager added successfully');
            props.setUpdated(true);
            props.onHide();
        })
        .catch((error) => {
            alert('Failed to Add Manager');
            console.error('Error adding manager:', error);
        });
    };

    useEffect(() => {
        if (!props.show) {
            setManagerInfo({
                username: '',
                email: '',
                password: '',
                location: '',
                managed_pets: []
            });
        }
    }, [props.show]);

    return (
        <div className='container'>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Fill in Manager Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={managerInfo.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={managerInfo.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={managerInfo.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={managerInfo.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                            />
                        </Form.Group>
                        <Form.Group controlId="formManagedPets">
                            <Form.Label>Managed Pets</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                name="managed_pets"
                                value={managerInfo.managed_pets}
                                onChange={handleChange}>
                                {availablePets.map((pet) => (
                                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddManagerModal;