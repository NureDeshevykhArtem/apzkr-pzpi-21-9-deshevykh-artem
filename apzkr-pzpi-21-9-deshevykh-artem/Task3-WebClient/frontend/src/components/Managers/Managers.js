import React, { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { getManagers, deleteManager } from "../../services/ManagersService";
import "../../App.css";
import AddManagerModal from "./AddManagerModal";
import UpdateManagerModal from "./UpdateManagerModal";

const Managers = () => {
    const [managers, setManagers] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateManager, setUpdateManager] = useState(null);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (managers.length > 0 && !isUpdated) {
            return;
        }
        getManagers().then((data) => {
            if (isMounted) {
                setManagers(data);
            }
        }).catch((error) => {
            console.error('Error fetching managers:', error);
        });
        return () => {
            isMounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated]);

    const handleAdd = () => {
        setAddModalShow(true);
    };

    const handleUpdate = (manager) => {
        setUpdateManager(manager);
        setUpdateModalShow(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteManager(id)
            .then((result) => {
                alert('Manager deleted successfully');
                setIsUpdated(true);
            })
            .catch((error) => {
                console.error('Error deleting manager:', error);
            });
        }
    };

    const AddModalClose = () => {
        setAddModalShow(false);
    };

    const updateModalClose = () => {
        setUpdateModalShow(false);
    };

    return (
        <div className="row side-row">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Managed Pets</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map((manager) => (
                        <tr key={manager.id}>
                            <td>{manager.id}</td>
                            <td>{manager.username}</td>
                            <td>{manager.email}</td>
                            <td>{manager.location}</td>
                            <td>{manager.managed_pets.map(pet => pet.name).join(", ")}</td>
                            <td>
                                <Button className="mr-2" variant="primary"
                                    onClick={() => handleUpdate(manager)}>Update</Button>
                                <UpdateManagerModal show={updateModalShow} onHide={updateModalClose}
                                    manager={updateManager}
                                    setUpdated={setIsUpdated}>
                                </UpdateManagerModal>
                                <Button className="mr-2" variant="danger" onClick={() => handleDelete(manager.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add Manager</Button>
            </ButtonToolbar>
            <AddManagerModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated} />
        </div>
    );
};

export default Managers;