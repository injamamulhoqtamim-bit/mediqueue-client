import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            /* responsive  */
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-[#13113c] via-[#2b0c54] to-[#1a3fa8] px-4">
                
                {/* spinner container */}
                <div className="relative flex items-center justify-center bg-white/5 backdrop-blur-md p-10 rounded-full border border-white/10 shadow-2xl animate-pulse">
                    
                    {/* glo effect */}
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"></div>
                    
                    {/* spinner */}
                    <span className="loading loading-spinner w-16 h-16 text-white relative z-10"></span>
                </div>

                {/* loading text */}
                <p className="mt-6 text-white/80 text-sm md:text-base font-medium tracking-widest uppercase animate-bounce">
                    Securing Session...
                </p>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;