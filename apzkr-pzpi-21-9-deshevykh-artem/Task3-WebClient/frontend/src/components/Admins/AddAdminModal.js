import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addAdmin } from "../../services/AdminsService";

const AddAdminModal = (props) => {
    const [adminInfo, setAdminInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        addAdmin(adminInfo)
        .then((result) => {
            alert('Admin added successfully');
            props.setUpdated(true);
            props.onHide();
        })
        .catch((error) => {
            alert('Failed to Add Admin');
            console.error('Error adding admin:', error);
        });
    };

    useEffect(() => {
        if (!props.show) {
            setAdminInfo({
                username: '',
                email: '',
                password: ''
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
                    <Modal.Title id="contained-modal-title-vcenter">Fill in Admin Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={adminInfo.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={adminInfo.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={adminInfo.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                            />
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

export default AddAdminModal;