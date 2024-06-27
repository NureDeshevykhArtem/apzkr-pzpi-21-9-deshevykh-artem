export const getReviews = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/Reviews/`);
    return await response.json();
};

export const addReview = async (review) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Reviews/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });
    return await response.json();
};

export const updateReview = async (id, review) => {
    const response = await fetch(`http://127.0.0.1:8000/api/Reviews/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });
    return await response.json();
};

export const deleteReview = async (id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/Reviews/${id}/`, {
            method: "DELETE"
        });

        if (response.status === 204) {
            return;
        } else {
            throw new Error('Failed to delete review');
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};