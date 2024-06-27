import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {getPets, deletePet} from "../../services/PetsService";
import {Button, ButtonToolbar} from "react-bootstrap";
import "../../App.css";
import AddPetModal from "./AddPetModal";
import UpdatePetModal from "./UpdatePetModal";

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updatePet, setUpdatePet] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (pets.length && !isUpdated) {
            return;
        }
        getPets().then((data) => {
            if (isMounted) {
                setPets(data);
            }
        });
        return () => {
            isMounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, pets]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, pet) => {
        e.preventDefault();
        setUpdateModalShow(true);
        setUpdatePet(pet);
    };

    const handleDelete = (e, id) => {
        if (window.confirm("Are you sure?")) {
            e.preventDefault();
            deletePet(id)
            .then((result)=>{
                alert('Pet deleted successfully');
                setIsUpdated(true);
            })
            .catch((error)=>{
                alert('Failed to delete Pet');
                console.error('Error deleting pet:', error);
            });
        }
    }

    let AddModalClose = () => setAddModalShow(false);
    let updateModalClose = () => setUpdateModalShow(false);

  return (
    <div className="row side-row">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
                <tr key={pet.id}>
                    <td>{pet.id}</td>
                    <td>{pet.name}</td>
                    <td>{pet.species}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.age}</td>
                    <td>{pet.gender}</td>
                    <td>{pet.owner}</td>
                    <td>
                        <Button className="mr-2" variant="primary"
                            onClick={event => handleUpdate(event, pet)}>Update</Button>
                        <UpdatePetModal show={updateModalShow} onHide={updateModalClose}
                            pet={updatePet}
                            setUpdated={setIsUpdated}>
                        </UpdatePetModal>
                        <Button className="mr-2" variant="danger" onClick={event => handleDelete(event, pet.id)}>Delete</Button>
                    </td>
                </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
            <Button variant="success" onClick={handleAdd}>Add Pet</Button>
        </ButtonToolbar>
        <AddPetModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>

        </AddPetModal>
    </div>
  );
}

export default Pets;