import React, { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { getPetMateRequests, deletePetMateRequest } from "../../services/PetMateRequestsService";
import "../../App.css";
import AddPetMateRequestModal from "./AddPetMateRequestModal";
import UpdatePetMateRequestModal from "./UpdatePetMateRequestModal";

const PetMateRequests = () => {
    const [requests, setRequests] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateRequest, setUpdateRequest] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (requests.length && !isUpdated) {
            return;
        }
        getPetMateRequests().then((data) => {
            if (isMounted) {
                setRequests(data);
            }
        });
        return () => {
            isMounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, requests.length]);

    const handleUpdate = (request) => {
        setUpdateModalShow(true);
        setUpdateRequest(request);
    };

    const handleDelete = (requestId) => {
        if (window.confirm('Are you sure?')) {
            deletePetMateRequest(requestId)
                .then(() => {
                    alert('Request deleted successfully');
                    setIsUpdated(true);
                })
                .catch((error) => {
                    alert('Failed to delete request');
                    console.error('Error deleting request:', error);
                });
        }
    };

    const requestList = requests.map((request) => (
        <tr key={request.id}>
            <td>{request.id}</td>
            <td>{request.requester}</td>
            <td>{request.pet}</td>
            <td>{request.description}</td>
            <td>{request.status}</td>
            <td>
                <Button className="mr-2" variant="info" onClick={() => handleUpdate(request)}>
                    Update
                </Button>
                <Button className="mr-2" variant="danger" onClick={() => handleDelete(request.id)}>
                    Delete
                </Button>
            </td>
        </tr>
    ));

    let AddModalClose = () => setAddModalShow(false);
    let UpdateModalClose = () => setUpdateModalShow(false);

    return (
        <div className="row side-row">
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Requester</th>
                        <th>Pet</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{requestList}</tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={() => setAddModalShow(true)}>
                    Add Pet Mate Request
                </Button>
                <AddPetMateRequestModal
                    show={addModalShow}
                    onHide={AddModalClose}
                    setUpdated={setIsUpdated}
                />
                <UpdatePetMateRequestModal
                    show={updateModalShow}
                    onHide={UpdateModalClose}
                    request={updateRequest}
                    setUpdated={setIsUpdated}
                />
            </ButtonToolbar>
        </div>
    );
};

export default PetMateRequests;