import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Login = () => {
  useDocumentTitle('User Core Authentication');

  const { loginWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const executionRedirectTarget =
    location.state?.from?.pathname || '/';

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-200 p-8 rounded-3xl">

        <h2 className="text-3xl font-black text-center mb-6">
          Login With Google
        </h2>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                await loginWithGoogle(
                  credentialResponse.credential
                );

                toast.success(
                  'Google Login Successful'
                );

                navigate(
                  executionRedirectTarget,
                  { replace: true }
                );
              } catch (err) {
                console.error(err);

                toast.error(
                  'Google Login Failed'
                );
              }
            }}
            onError={() => {
              toast.error(
                'Google Login Failed'
              );
            }}
          />
        </div>

        <p className="text-center text-sm mt-6 text-gray-500">
          Secure authentication powered by Google OAuth
        </p>

        <p className="text-center text-sm mt-4">
          New user?
          <Link
            to="/register"
            className="text-primary font-bold link ml-1"
          >
            Continue
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;