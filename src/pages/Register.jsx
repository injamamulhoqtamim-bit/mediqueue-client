import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Register = () => {
  useDocumentTitle('Create Account');

  const { loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-200 p-6 rounded-2xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Continue with Google to create your account.
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                await loginWithGoogle(
                  credentialResponse.credential
                );

                toast.success(
                  'Google authentication successful!'
                );

                navigate('/');
              } catch (err) {
                console.error(err);

                toast.error(
                  'Google authentication failed!'
                );
              }
            }}
            onError={() => {
              toast.error(
                'Google authentication failed!'
              );
            }}
          />
        </div>

        <p className="text-center text-sm mt-6">
          Already registered?
          <Link
            to="/login"
            className="text-primary font-bold link ml-1"
          >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;