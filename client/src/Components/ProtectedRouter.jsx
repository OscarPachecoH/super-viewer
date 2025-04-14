import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Spinner from '../Components/SpinnerLoading';

export const ProtectedRouter = ({ children, requiresAuth = true, redirectTo = "/dashboard" }) => {
    const { user, loading } = useAuth()
    if(loading){
        return (<Spinner/>);
    }

    if(requiresAuth && !user){
        return <Navigate to='/login'/>
    }

    if(!requiresAuth && user){
        return <Navigate to={redirectTo}/>
    }

    return children;
}

export default ProtectedRouter;