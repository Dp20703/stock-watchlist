const SymbolTable = ({ onDelete, data, onUpdate }) => {

    return (
        <>
            <div className="text-center">
                <h1 className='mt-5 mb-2'>Your Watchlist</h1>
                <div className='h-1/2 w-1/2 m-auto rounded-lg'>
                    <div className='p-5 h-full w-full '>
                        <table className="bg-blue-900 rounded-lg h-full w-full table-auto border-separate border-spacing-x-4 border-spacing-y-2">
                            <thead >
                                <tr>
                                    <th className="p-2">Sr</th>
                                    <th className="p-2">Symbol</th>
                                    <th className="p-2" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((elem, idx) => {
                                        return <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{elem.symbol}</td>
                                            <td className='w-1/6 bg-red-500 rounded-full  hover:bg-red-600 cursor-pointer' onClick={() => onDelete(elem._id)}>Delete</td>
                                            <td className='w-1/6 bg-green-500 rounded-full  hover:bg-green-600 cursor-pointer' onClick={() => onUpdate(elem._id, elem.symbol)}>Update</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SymbolTable