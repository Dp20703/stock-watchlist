import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddSymbol from '../components/AddSymbol';
import { DeleteSymbol } from '../components/DeleteSymbol';
import SymbolTable from '../components/SymbolTable'
import UpdateModal from '../components/UpdateModal';

const Watchlist = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [updateModal, setUpdateModal] = useState(false);
    const [id, setId] = useState(false);
    const [symbol, setSymbol] = useState(false);

    const fetchData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/watchlist/get`)
        if (res.data.length === 0) {
            setMessage("No data found")
        };
        setData(res.data);
    }
    useEffect(() => {
        fetchData();
    }, [])
    const handleDelete = async (id) => {
        const data = await DeleteSymbol(id);
        setMessage("✅ Symbol " + data.deleted.symbol + ' deleted');
        fetchData();
    }

    const handleUpdate = async (symbolId, symbol) => {
        if (symbolId) {
            setUpdateModal(true);
            setId(symbolId);
            setSymbol(symbol);
        }
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
            <div className=' bg-zinc-900 min-h-screen text-white overflow-x-hidden'>
                <h1 className='text-center text-2xl text-white font-bolder my-2 bg-zinc-800 w-3/5 m-auto rounded-lg mt-5 py-1'>Watchlist Manager</h1>
                <AddSymbol refreshData={fetchData} />
                <SymbolTable data={data} onDelete={handleDelete} onUpdate={handleUpdate} />
                {message && <div className='bg-waring-300 text-center mt-5 w-1/2 m-auto'>{message}</div>}
                {updateModal && <UpdateModal id={id} setUpdateModal={setUpdateModal} symbol={symbol} refreshData={fetchData}/>}
            </div>
        </>
    )
}
export default Watchlist