import axios from "axios";
import { useEffect, useState } from "react";


const UpdateSymbol = ({ id, setUpdateModal, symbol, refreshData }) => {
    const sym = symbol;
    const [newSymbol, setNewSymbol] = useState(sym);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/watchlist/update/${id}`, {
            symbol: newSymbol
        })
        setMessage(`✅ Symbol ${sym} updated to ${newSymbol}`);
        refreshData();
        setNewSymbol('');
        setTimeout(() => {
            setUpdateModal(false);
        }, 3000);
    }

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message])
    return (
        <>
            <div>
                <h1 className="text-center text-2xl text-zinc-950 font-bolder my-2 border-b-2 pb-2 border-b-zinc-800">Enter Update Details</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5" >
                    <div className="flex justify-center items-center gap-5 mx-2 w-full pt-5">
                        <label htmlFor="symbol" className="text-zinc-950 w-1/2 text-center text-xl ml-2">Enter symbol:</label>
                        <input type="text" name="symbol" placeholder="enter symbol" className=" text-zinc-950 p-2 w-full mr-5 border-2 border-zinc-600 rounded-xl hover:placeholder-zinc-700 placeholder:text-center hover:border-zinc-900" value={newSymbol} onChange={(e) => setNewSymbol(e.target.value)} />
                    </div>
                    <button type="submit" className="text-xl w-1/2 m-auto mt-5 bg-green-500 text-white p-2 rounded-xl hover:bg-green-600">Submit</button>
                </form>
                {message && <p className="text-yellow-300 bg-zinc-950 text-center my-5 text-sm">{message}</p>}
            </div>
        </>
    )
}

export default UpdateSymbol