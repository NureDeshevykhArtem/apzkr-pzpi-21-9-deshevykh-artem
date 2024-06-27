import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { updatePetMateRequest } from "../../services/PetMateRequestsService";

const UpdatePetMateRequestModal = (props) => {
    const [requestInfo, setRequestInfo] = useState({
        requester: '',
        pet: '',
        description: '',
        status: 'pending',
    });

    const [availableUsers, setAvailableUsers] = useState([]);
    const [availablePets, setAvailablePets] = useState([]);

    useEffect(() => {
        const fetchUsersAndPets = async () => {
            const usersResponse = await fetch("http://127.0.0.1:8000/api/Users/");
            const petsResponse = await fetch("http://127.0.0.1:8000/api/Pets/");
            const usersData = await usersResponse.json();
            const petsData = await petsResponse.json();
            setAvailableUsers(usersData);
            setAvailablePets(petsData);
        };

        fetchUsersAndPets();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        updatePetMateRequest(props.request.id, requestInfo)
        .then((result)=>{
            alert('Request updated successfully');
            props.setUpdated(true);
            props.onHide();
        })
        .catch((error)=>{
            alert('Failed to Update Request');
            console.error('Error updating request:', error);
        });
    };

    useEffect(() => {
        if (props.show) {
            setRequestInfo({
                requester: props.request.requester.id || '',
                pet: props.request.pet.id || '',
                description: props.request.description || '',
                status: props.request.status || 'pending',
            });
        }
    }, [props.show, props.request]);

    return (
        <div className='container'>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Update Pet Mate Request Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRequester">
                            <Form.Label>Requester</Form.Label>
                            <Form.Control
                                as="select"
                                name="requester"
                                value={requestInfo.requester}
                                onChange={handleChange}>
                                <option value=''>Select requester</option>
                                {availableUsers.map((user) => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPet">
                            <Form.Label>Pet</Form.Label>
                            <Form.Control
                                as="select"
                                name="pet"
                                value={requestInfo.pet}
                                onChange={handleChange}>
                                <option value=''>Select pet</option>
                                {availablePets.map((pet) => (
                                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={requestInfo.description}
                                onChange={handleChange}
                                placeholder="Enter description"
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={requestInfo.status}
                                onChange={handleChange}>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
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

export default UpdatePetMateRequestModal;