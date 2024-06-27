import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addPetMateMatch } from "../../services/PetMateMatchService";

const AddPetMateMatchModal = (props) => {
    const [matchInfo, setMatchInfo] = useState({
        request: '',
        partner: ''
    });

    const [availableRequests, setAvailableRequests] = useState([]);
    const [availablePartners, setAvailablePartners] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/Pet-mate-requests/");
            const data = await response.json();
            setAvailableRequests(data);
        };

        const fetchPartners = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/Users/");
            const data = await response.json();
            setAvailablePartners(data);
        };

        fetchRequests();
        fetchPartners();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMatchInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        addPetMateMatch(matchInfo)
        .then((result) => {
            alert('Match added successfully');
            props.setUpdated(true);
            props.onHide();
        })
        .catch((error) => {
            alert('Failed to Add Match');
            console.error('Error adding match:', error);
        });
    };

    useEffect(() => {
        if (!props.show) {
            setMatchInfo({
                request: '',
                partner: ''
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
                    <Modal.Title id="contained-modal-title-vcenter">Fill in Match Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRequest">
                            <Form.Label>Request</Form.Label>
                            <Form.Control
                                as="select"
                                name="request"
                                value={matchInfo.request}
                                onChange={handleChange}>
                                {availableRequests.map((request) => (
                                    <option key={request.id} value={request.id}>{request.description}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPartner">
                            <Form.Label>Partner</Form.Label>
                            <Form.Control
                                as="select"
                                name="partner"
                                value={matchInfo.partner}
                                onChange={handleChange}>
                                {availablePartners.map((partner) => (
                                    <option key={partner.id} value={partner.id}>{partner.username}</option>
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

export default AddPetMateMatchModal;