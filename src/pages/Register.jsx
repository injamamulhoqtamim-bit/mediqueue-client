import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

const Register = () => {
  useDocumentTitle('Create Account');

  const { loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      photo: form.photo.value,
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/register',
        userData
      );

      toast.success(
  'Registration Successful. Please Login.'
);

navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Registration Failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-200 p-6 rounded-2xl">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form
          onSubmit={handleRegister}
          className="space-y-4 mb-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="input input-bordered w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="input input-bordered w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input input-bordered w-full"
          />

          <input
            type="url"
            name="photo"
            placeholder="Photo URL"
            required
            className="input input-bordered w-full"
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Register
          </button>
        </form>

        <div className="divider">OR</div>

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