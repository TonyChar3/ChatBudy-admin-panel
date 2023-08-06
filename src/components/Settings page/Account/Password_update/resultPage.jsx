import { UserAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PasswordUpdateResultPage = () => {

    const { LogOut } = UserAuth();

    const navigate = useNavigate();

    const handleRe_Sign = async() => {
        try{
            const logout = await LogOut()
            if(logout){
                navigate("/")
            }
        } catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <div>
                <h2>Update result page</h2>
                <button onClick={handleRe_Sign}>Go to Login page and sign-in again</button>
                {/** If the updates succeed the user will go back to the login page */}
                {/** If the update fails the user will go back to the account page */}
            </div>
        </>
    )
}

export default PasswordUpdateResultPage;