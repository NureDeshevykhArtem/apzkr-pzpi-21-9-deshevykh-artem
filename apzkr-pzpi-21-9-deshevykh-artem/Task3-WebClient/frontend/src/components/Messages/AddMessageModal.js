import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addMessage } from "../../services/MessagesService";

const AddMessageModal = (props) => {
    const [messageInfo, setMessageInfo] = useState({
        sender: '',
        receiver: '',
        message_text: '',
    });

    const [availableUsers, setAvailableUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/Users/");
            const data = await response.json();
            setAvailableUsers(data);
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessageInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        addMessage(messageInfo)
        .then((result) => {
            alert('Message sent successfully');
            props.setUpdated(true);
            props.onHide();
        })
        .catch((error) => {
            alert('Failed to send message');
            console.error('Error sending message:', error);
        });
    };

    useEffect(() => {
        if (!props.show) {
            setMessageInfo({
                sender: '',
                receiver: '',
                message_text: '',
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
                    <Modal.Title id="contained-modal-title-vcenter">Compose Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formSender">
                            <Form.Label>Sender</Form.Label>
                            <Form.Control
                                as="select"
                                name="sender"
                                value={messageInfo.sender}
                                onChange={handleChange}>
                                <option value="">Select sender</option>
                                {availableUsers.map((user) => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formReceiver">
                            <Form.Label>Receiver</Form.Label>
                            <Form.Control
                                as="select"
                                name="receiver"
                                value={messageInfo.receiver}
                                onChange={handleChange}>
                                <option value="">Select receiver</option>
                                {availableUsers.map((user) => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMessageText">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message_text"
                                value={messageInfo.message_text}
                                onChange={handleChange}
                                placeholder="Enter message"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Send</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddMessageModal;