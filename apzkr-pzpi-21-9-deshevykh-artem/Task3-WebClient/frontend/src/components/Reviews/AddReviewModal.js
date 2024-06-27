import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addReview } from "../../services/ReviewService";
import { getUsers } from "../../services/UsersService";

const AddReviewModal = (props) => {
    const [reviewInfo, setReviewInfo] = useState({
        reviewer: '',
        reviewed_partner: '',
        review_text: '',
        rating: ''
    });

    const [users, setUsers] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        getUsers().then((data) => {
            if (isMounted) {
                setUsers(data);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [isUpdated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        addReview(reviewInfo)
        .then((result) => {
            alert('Review added successfully');
            props.setUpdated(true);
            props.onHide();
        })
        .catch((error) => {
            alert('Failed to Add Review');
            console.error('Error adding review:', error);
        });
    };

    useEffect(() => {
        if (!props.show) {
            setReviewInfo({
                reviewer: '',
                reviewed_partner: '',
                review_text: '',
                rating: ''
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
                    <Modal.Title id="contained-modal-title-vcenter">Fill in Review Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formReviewer">
                            <Form.Label>Reviewer</Form.Label>
                            <Form.Control
                                as="select"
                                name="reviewer"
                                value={reviewInfo.reviewer}
                                onChange={handleChange}>
                                <option value="">Select reviewer</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formReviewedPartner">
                            <Form.Label>Reviewed Partner</Form.Label>
                            <Form.Control
                                as="select"
                                name="reviewed_partner"
                                value={reviewInfo.reviewed_partner}
                                onChange={handleChange}>
                                <option value="">Select reviewed partner</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.username}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formReviewText">
                            <Form.Label>Review Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="review_text"
                                value={reviewInfo.review_text}
                                onChange={handleChange}
                                placeholder="Enter review text"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="rating"
                                value={reviewInfo.rating}
                                onChange={handleChange}
                                placeholder="Enter rating"
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

export default AddReviewModal;