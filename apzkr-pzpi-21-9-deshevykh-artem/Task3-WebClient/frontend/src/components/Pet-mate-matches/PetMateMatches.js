import React, { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { getPetMateMatches, deletePetMateMatch } from "../../services/PetMateMatchService";
import "../../App.css";
import AddPetMateMatchModal from "./AddPetMateMatchModal";
import UpdatePetMateMatchModal from "./UpdatePetMateMatchModal";

const PetMateMatches = () => {
    const [matches, setMatches] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateMatch, setUpdateMatch] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (matches.length && !isUpdated) {
            return;
        }
        getPetMateMatches().then((data) => {
            if (isMounted) {
                setMatches(data);
            }
        });
        return () => {
            isMounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, matches]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, match) => {
        e.preventDefault();
        setUpdateModalShow(true);
        setUpdateMatch(match);
    };

    const handleDelete = (e, id) => {
        if (window.confirm("Are you sure?")) {
            e.preventDefault();
            deletePetMateMatch(id)
            .then((result) => {
                alert('Match deleted successfully');
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
                        <th>Request</th>
                        <th>Partner</th>
                        <th>Accepted At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match) => (
                        <tr key={match.id}>
                            <td>{match.id}</td>
                            <td>{match.request}</td>
                            <td>{match.partner}</td>
                            <td>{match.accepted_at}</td>
                            <td>
                                <Button className="mr-2" variant="info" onClick={(e) => handleUpdate(e, match)}>Update</Button>
                                <Button className="mr-2" variant="danger" onClick={(e) => handleDelete(e, match.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>Add Match</Button>
                <AddPetMateMatchModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated} />
                <UpdatePetMateMatchModal show={updateModalShow} onHide={updateModalClose} match={updateMatch} setUpdated={setIsUpdated} />
            </ButtonToolbar>
        </div>
    );
};

export default PetMateMatches;