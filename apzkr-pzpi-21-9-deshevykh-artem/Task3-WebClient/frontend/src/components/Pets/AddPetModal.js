import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addPet } from "../../services/PetsService";

const AddPetModal = (props) => {
    const [petInfo, setPetInfo] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        owner: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSave = (e) => {
        e.preventDefault();
        addPet(petInfo)
        .then((result)=>{
            alert('Pet added successfully');
            props.setUpdated(true);
            props.onHide();
        })
        .catch((error)=>{
            alert('Failed to Add Pet');
            console.error('Error adding pet:', error);
        });
    };

    useEffect(() => {
        if (!props.show) {
            setPetInfo({
                name: '',
                species: '',
                breed: '',
                age: '',
                gender: '',
                owner: ''
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
                    <Modal.Title id="contained-modal-title-vcenter">Fill in Pet Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPetName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={petInfo.name}
                                onChange={handleChange}
                                placeholder="Enter pet's name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPetSpecies">
                            <Form.Label>Species</Form.Label>
                            <Form.Control
                                type="text"
                                name="species"
                                value={petInfo.species}
                                onChange={handleChange}
                                placeholder="Enter pet's species"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPetBreed">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control
                                type="text"
                                name="breed"
                                value={petInfo.breed}
                                onChange={handleChange}
                                placeholder="Enter pet's breed"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPetAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={petInfo.age}
                                onChange={handleChange}
                                placeholder="Enter pet's age"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPetGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="text"
                                name="gender"
                                value={petInfo.gender}
                                onChange={handleChange}
                                placeholder="Enter pet's gender"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPetOwner">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                as="select"
                                name="owner"
                                value={petInfo.owner}
                                onChange={handleChange}>
                                <option value="">Select owner</option>
{/*                                {props.owners.map(owner => (
                                    <option key={owner.id} value={owner.id}>{owner.name}</option>
                                ))}*/}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddPetModal;