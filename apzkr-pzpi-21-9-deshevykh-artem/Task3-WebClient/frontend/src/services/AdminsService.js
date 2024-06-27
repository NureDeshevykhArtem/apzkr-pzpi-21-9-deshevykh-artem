export const getAdmins = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/Admins/`);
    return await response.json();
};

export const addAdmin = async (admin) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Admins/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(admin)
    });
    return await response.json();
};

export const updateAdmin = async (id, admin) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Admins/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(admin)
    });
    return await response.json();
};

export const deleteAdmin = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/Admins/${id}/`, {
            method: "DELETE"
        });

        if (response.status === 204) {
            return;
        } else {
            throw new Error('Failed to delete admin');
        }
    } catch (error) {
        console.error('Error deleting admin:', error);
        throw error;
    }
};