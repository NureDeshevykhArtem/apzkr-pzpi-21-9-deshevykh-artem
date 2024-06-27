import React, { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { getMessages, deleteMessage } from "../../services/MessagesService";
import "../../App.css";
import AddMessageModal from "./AddMessageModal";
import UpdateMessageModal from "./UpdateMessageModal";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const [updateMessage, setUpdateMessage] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if (messages.length && !isUpdated) {
            return;
        }
        getMessages().then((data) => {
            if (isMounted) {
                setMessages(data);
            }
        });
        return () => {
            isMounted = false;
            setIsUpdated(false);
        };
    }, [isUpdated, messages]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, message) => {
        e.preventDefault();
        setUpdateModalShow(true);
        setUpdateMessage(message);
    };

    const handleDelete = (e, id) => {
        if (window.confirm("Are you sure?")) {
            e.preventDefault();
            deleteMessage(id)
            .then((result) => {
                alert('Message deleted successfully');
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
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Message</th>
                        <th>Sent At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr key={message.id}>
                            <td>{message.id}</td>
                            <td>{message.sender}</td>
                            <td>{message.receiver}</td>
                            <td>{message.message_text}</td>
                            <td>{message.sent_at}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                        className="mr-2"
                                        variant="info"
                                        onClick={(event) => handleUpdate(event, message)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className="mr-2"
                                        variant="danger"
                                        onClick={(event) => handleDelete(event, message.id)}
                                    >
                                        Delete
                                    </Button>
                                    <UpdateMessageModal
                                        show={updateModalShow}
                                        message={updateMessage}
                                        onHide={updateModalClose}
                                        setUpdated={setIsUpdated}
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                    Compose Message
                </Button>
                <AddMessageModal
                    show={addModalShow}
                    onHide={AddModalClose}
                    setUpdated={setIsUpdated}
                />
            </ButtonToolbar>
        </div>
    );
};

export default Messages;