import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { updateUser } from "../../services/UsersService";

const UpdateUserModal = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        location: '',
        pets: []
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
        if (name === "pets") {
            const selectedPets = Array.from(e.target.selectedOptions, option => option.value);
            setUserInfo(prevState => ({
                ...prevState,
                [name]: selectedPets
            }));
        } else {
            setUserInfo(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        updateUser(props.user.id, userInfo)
        .then((result)=>{
            alert('User updated successfully');
            props.setUpdated(true);
            props.onHide();
        })
        .catch((error)=>{
            alert('Failed to Update User');
            console.error('Error updating user:', error);
        });
    };

    useEffect(() => {
        if (props.show) {
            setUserInfo({
                username: props.user.username || '',
                email: props.user.email || '',
                password: '',
                location: props.user.location || '',
                pets: props.user.pets || []
            });
        }
    }, [props.show, props.user]);

    return (
        <div className='container'>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Update User Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                required
                                value={userInfo.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                value={userInfo.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                            />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                required
                                value={userInfo.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPets">
                            <Form.Label>Pets</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                name="pets"
                                value={userInfo.pets}
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
    )
}

export default UpdateUserModal;