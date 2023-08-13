import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';

interface ProtectedRouteProps {
    children: React.ReactNode;
    isLoginOrSignup?: boolean; // New prop to check if it's login or signup route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isLoginOrSignup }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    if (isLoginOrSignup) {
        return isLoggedIn ? <Navigate to="/home" replace /> : <>{children}</>;
    } else {
        return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
