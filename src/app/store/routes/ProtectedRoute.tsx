import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer'; // Adjust the path

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
