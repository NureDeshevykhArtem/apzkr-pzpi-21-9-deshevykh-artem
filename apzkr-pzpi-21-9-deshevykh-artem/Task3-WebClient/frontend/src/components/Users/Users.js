import React, { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { getUsers, deleteUser } from "../../services/UsersService";
import "../../App.css";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateUser, setUpdateUser] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (users.length && !isUpdated) {
            return;
        }
        getUsers().then((data) => {
            if (isMounted) {
                setUsers(data);
            }
        });
        return () => {
            isMounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, users]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, user) => {
        e.preventDefault();
        setUpdateModalShow(true);
        setUpdateUser(user);
    };

    const handleDelete = (e, id) => {
        if (window.confirm("Are you sure?")) {
            e.preventDefault();
            deleteUser(id)
            .then((result) => {
                alert('User deleted successfully');
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
                        <th>Username</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Pets</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.location}</td>
                            <td>{user.pets.join(", ")}</td>
                            <td>
                                <Button className="mr-2" variant="primary"
                                    onClick={event => handleUpdate(event, user)}>Update</Button>
                                <UpdateUserModal show={updateModalShow} onHide={updateModalClose}
                                    user={updateUser}
                                    setUpdated={setIsUpdated}>
                                </UpdateUserModal>
                                <Button className="mr-2" variant="danger" onClick={event => handleDelete(event, user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="success" onClick={handleAdd}>Add User</Button>
            </ButtonToolbar>
            <AddUserModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated} />
        </div>
    );
};

export default Users;