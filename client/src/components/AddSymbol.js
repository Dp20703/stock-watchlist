import { useEffect, useState } from 'react'
import axios from 'axios'

const AddSymbol = ({ refreshData }) => {
    const [symbol, setSymbol] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/watchlist/add/`, {
                symbol
            })
            if (res.status === 200 || res.status === 201) {
                setMessage(`✅ Symbol "${symbol}" added successfully.`)
                setSymbol('');
                refreshData();
            }
            else {
                setMessage('⚠️ Unexpected response.');
            }
        } catch (error) {
            setMessage(`❌ Error: ${error.response?.data?.error || error.message}`)
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
        <div className='h-1/3 w-1/2 m-auto text-center p-5'>
            <h1 className='p-5'>Add Symbol to Watchlist</h1>
            <form onSubmit={handleSubmit} className='bg-slate-800 w-full rounded-lg h-48 flex flex-col gap-5 justify-center items-center'>
                <div className='flex items-center justify-center w-full'>
                    <label className='text-white mx-2 w-1/4'>Enter symbol name:</label>
                    <input type="text" name="symbol" placeholder='Enter symbol name' className='p-2 rounded-lg text-black  w-3/5 mr-5' onChange={(e) => setSymbol(e.target.value)} value={symbol} />
                </div>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 '>Submit</button>
            </form>
            {message && <p className='mt-4 text-yellow-300 text-sm'>{message}</p>}
        </div>
    );
}

export default AddSymbol