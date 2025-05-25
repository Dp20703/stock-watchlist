import React from 'react'
import UpdateSymbol from './UpdateSymbol';


const UpdateModal = ({ id, setUpdateModal, symbol ,refreshData}) => {
    return (
        <>
            <div className="modal fixed h-screen w-full flex justify-center items-center top-0 left-0 z-50">
                <div className="modal-content w-1/3 bg-zinc-200 rounded-lg  h-72">
                    <span className="close text-zinc-900 cursor-pointer float-right mx-5 my-2 text-3xl" onClick={() => setUpdateModal(false)}>&times;</span>
                    <UpdateSymbol id={id} setUpdateModal={setUpdateModal} symbol={symbol} refreshData={refreshData} />
                </div>
            </div>

        </>
    );
}

export default UpdateModal