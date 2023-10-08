import { UserAuth } from "../AuthContext";
import { useState, useEffect } from 'react';
 
const DeleteModal = () => {

    const { user, isDeleteModalOpen, setDeleteModalOpen, setDeleteModalInfo, deleteModalInfo, removeVisitor, DeleteModalUserAccount, DeleteUserAccount } = UserAuth();

    const [visitorModalName, setVisitorName] = useState('');

    const handleCancelDeletion = () => {
        setDeleteModalOpen(false);
        setDeleteModalInfo({});
    }

    const handleDeleteVisitor = () => {
        setDeleteModalOpen(false);
        removeVisitor(deleteModalInfo.id)
    }

    const handleDeleteAccount = () => {
        setDeleteModalOpen(false);
        DeleteUserAccount(user.accessToken)
    }

    useEffect(() => {
        if(Object.keys(deleteModalInfo).length > 0){
            deleteModalInfo.email ? setVisitorName(deleteModalInfo.email) : setVisitorName(deleteModalInfo.id)
        }
    },[deleteModalInfo])

    return (
        <>
            <div className={`${isDeleteModalOpen? 'absolute' : 'hidden'} z-50 left-0 right-0 w-full h-full flex flex-row justify-center items-center bg-black bg-opacity-20`}>
                <div className="w-[89%] lg:w-[23%] flex flex-col justify-center items-center p-2 bg-white bg-opacity-[88%] rounded-lg border-[1px] border-red-500 shadow-lg shadow-red-500">
                    <div className="flex flex-col justify-center items-center text-lg">
                        <h3 className="my-1">Are you sure ?</h3>
                        <span className="text-center">This action will permanently delete <span className="text-red-500">{DeleteModalUserAccount? 'Your Account' : visitorModalName}</span></span>
                    </div>
                    <div className="my-2 flex flex-row justify-around w-full my-2 text-2xl">
                        {
                            DeleteModalUserAccount? 
                            (
                                <>
                                    <button onClick={handleDeleteAccount}><i className="fa-solid fa-check text-[#4ef572]"></i></button>
                                    <button onClick={handleCancelDeletion}><i className="fa-sharp fa-solid fa-xmark text-[#f24b3f]"></i></button>
                                </>
                            )
                            :
                            (
                                <>
                                    <button onClick={handleDeleteVisitor}><i className="fa-solid fa-check text-[#4ef572]"></i></button>
                                    <button onClick={handleCancelDeletion}><i className="fa-sharp fa-solid fa-xmark text-[#f24b3f]"></i></button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal