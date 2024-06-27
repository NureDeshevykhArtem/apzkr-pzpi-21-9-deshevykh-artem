export const getMessages = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/Messages/");
    return await response.json();
};

export const addMessage = async (message) => {
    const response = await fetch("http://127.0.0.1:8000/api/Messages/" , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });

    if (!response.ok) {
        throw new Error('Failed to add message');
    }

    return await response.json();
};

export const updateMessage = async (id, message) => {
    const response = await fetch("http://127.0.0.1:8000/api/Messages" + `/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });

    if (!response.ok) {
        throw new Error('Failed to update message');
    }

    return await response.json();
};

export const deleteMessage = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/Messages/${id}/`, {
            method: "DELETE"
        });

        if (response.status === 204) {
            return;
        } else {
            throw new Error('Failed to delete message');
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};