import { UserAuth } from "../AuthContext";
import { useState, useEffect } from 'react';
 
const DeleteModal = () => {

    const { 
        user, 
        is_delete_modal_open, 
        setDeleteModalOpen, 
        setDeleteModalInfo, 
        delete_modal_info, 
        removeVisitor, 
        delete_modal_useraccount, 
        DeleteUserAccount 
    } = UserAuth();

    const [visitorModalName, setVisitorName] = useState('');

    const CancelDelete = () => {
        setDeleteModalOpen(false);
        setDeleteModalInfo({});
    }

    const DeleteVisitor = () => {
        setDeleteModalOpen(false);
        removeVisitor(delete_modal_info.id)
    }

    const DeleteAccount = () => {
        setDeleteModalOpen(false);
        DeleteUserAccount(user.accessToken)
    }

    useEffect(() => {
        if(Object.keys(delete_modal_info).length > 0){
            delete_modal_info.email ? setVisitorName(delete_modal_info.email) : setVisitorName(delete_modal_info.id)
        }
    },[delete_modal_info])

    return (
        <>
            <div className={`${is_delete_modal_open? 'absolute' : 'hidden'} z-50 left-0 right-0 w-full h-full flex flex-row justify-center items-center bg-black bg-opacity-20`}>
                <div className="w-[89%] md:w-[60%] lg:w-[23%] flex flex-col justify-center items-center p-2 bg-white bg-opacity-[88%] rounded-lg border-[1px] border-red-500 shadow-lg shadow-red-500">
                    <div className="flex flex-col justify-center items-center text-lg">
                        <h3 className="my-1">Are you sure ?</h3>
                        <span className="text-center">This action will permanently delete <span className="text-red-500">{delete_modal_useraccount? 'Your Account' : visitorModalName}</span></span>
                    </div>
                    <div className="my-2 flex flex-row justify-around w-full my-2 text-2xl">
                        {
                            delete_modal_useraccount? 
                            (
                                <>
                                    <button onClick={DeleteAccount}><i className="fa-solid fa-check text-[#4ef572]"></i></button>
                                    <button onClick={CancelDelete}><i className="fa-sharp fa-solid fa-xmark text-[#f24b3f]"></i></button>
                                </>
                            )
                            :
                            (
                                <>
                                    <button onClick={DeleteVisitor}><i className="fa-solid fa-check text-[#4ef572]"></i></button>
                                    <button onClick={CancelDelete}><i className="fa-sharp fa-solid fa-xmark text-[#f24b3f]"></i></button>
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