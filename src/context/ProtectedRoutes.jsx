import { Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const ProtectedRoutes =  ({ children }) => {
    const { user } = UserAuth();
    
    if(user === null || !user){
        return <Navigate to="/login"/>
    }
    return children
}

export default ProtectedRoutes;