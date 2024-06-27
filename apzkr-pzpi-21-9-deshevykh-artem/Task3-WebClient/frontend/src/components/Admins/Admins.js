import React, { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { getAdmins, deleteAdmin } from "../../services/AdminsService";
import AddAdminModal from "./AddAdminModal";
import UpdateAdminModal from "./UpdateAdminModal";

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateAdmin, setUpdateAdmin] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (admins.length && !isUpdated) {
            return;
        }
        getAdmins().then((data) => {
            if (isMounted) {
                setAdmins(data);
            }
        });
        return () => {
            isMounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, admins]);

    const handleAdd = () => {
        setAddModalShow(true);
    };

    const handleUpdate = (admin) => {
        setUpdateAdmin(admin);
        setUpdateModalShow(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await deleteAdmin(id);
            alert("Admin deleted successfully");
            setIsUpdated(true);
        }
    };

    return (
        <div className="row side-row">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>
                                <Button
                                    className="mr-2"
                                    variant="primary"
                                    onClick={() => handleUpdate(admin)}
                                >
                                    Update
                                </Button>{" "}
                                <Button
                                    className="mr-2"
                                    variant="danger"
                                    onClick={() => handleDelete(admin.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AddAdminModal
                show={addModalShow}
                onHide={() => setAddModalShow(false)}
                setUpdated={setIsUpdated}
            />

            <UpdateAdminModal
                show={updateModalShow}
                onHide={() => setUpdateModalShow(false)}
                admin={updateAdmin}
                setUpdated={setIsUpdated}
            />

            <ButtonToolbar className="mb-3">
                <Button variant="primary" onClick={handleAdd}>
                    Add Admin
                </Button>
            </ButtonToolbar>
        </div>
    );
};

export default Admins;