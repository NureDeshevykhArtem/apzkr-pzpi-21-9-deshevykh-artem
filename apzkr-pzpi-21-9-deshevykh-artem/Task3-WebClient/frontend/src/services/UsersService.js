export const getUsers = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/Users/`);
    return await response.json();
};

export const addUser = async (user) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    return await response.json();
};

export const updateUser = async (id, user) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Users/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    return await response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Users/${id}/`, {
        method: "DELETE"
    });
    return await response.json();
};