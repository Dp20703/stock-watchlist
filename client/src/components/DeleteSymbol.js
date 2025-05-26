import axios from "axios"

export const DeleteSymbol = async (id) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/watchlist/delete/${id}`);
        if (res.status === 200) return res.data
    } catch (error) {
        console.log("error:", error);
    }
}