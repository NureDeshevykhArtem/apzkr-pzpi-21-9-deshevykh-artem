export const getManagers = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/Managers/`);
    return await response.json();
};

export const addManager = async (manager) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Managers/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(manager)
    });
    return await response.json();
};

export const updateManager = async (id, manager) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Managers/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(manager)
    });
    return await response.json();
};

export const deleteManager = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Managers/${id}/`, {
        method: "DELETE"
    });
    return await response.json();
};