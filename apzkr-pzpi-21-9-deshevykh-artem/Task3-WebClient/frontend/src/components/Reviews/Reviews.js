import React, { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { getReviews, deleteReview } from "../../services/ReviewService";
import "../../App.css";
import AddReviewModal from "./AddReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateReview, setUpdateReview] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (reviews.length && !isUpdated) {
            return;
        }
        getReviews().then((data) => {
            if (isMounted) {
                setReviews(data);
            }
        });
        return () => {
            isMounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, reviews]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, review) => {
        e.preventDefault();
        setUpdateModalShow(true);
        setUpdateReview(review);
    };

    const handleDelete = (e, id) => {
        if (window.confirm("Are you sure?")) {
            e.preventDefault();
            deleteReview(id)
            .then((result) => {
                alert('Review deleted successfully');
                setIsUpdated(true);
            })
        }
    };

    let AddModalClose = () => setAddModalShow(false);
    let updateModalClose = () => setUpdateModalShow(false);

    return (
        <div className="row side-row">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Reviewer</th>
                        <th>Reviewed Partner</th>
                        <th>Review Text</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td>{review.id}</td>
                            <td>{review.reviewer}</td>
                            <td>{review.reviewed_partner}</td>
                            <td>{review.review_text}</td>
                            <td>{review.rating}</td>
                            <td>
                                <Button className="mr-2" variant="primary"
                                    onClick={event => handleUpdate(event, review)}>Update</Button>
                                <UpdateReviewModal show={updateModalShow} onHide={updateModalClose}
                                    review={updateReview}
                                    setUpdated={setIsUpdated}>
                                </UpdateReviewModal>
                                <Button className="mr-2" variant="danger" onClick={event => handleDelete(event, review.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add Review</Button>
            </ButtonToolbar>
            <AddReviewModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated} />
        </div>
    );
};

export default Reviews;