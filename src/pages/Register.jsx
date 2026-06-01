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
        'https://mediqueue-server-zl2f.onrender.com/register',
        userData
      );

      toast.success('Registration Successful. Please Login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('Registration Failed');
    }
  };

  return (
    <div className="min-h-screen sm:min-h-[85vh] flex justify-center items-center px-4 py-8 md:py-12 bg-base-100 relative overflow-hidden select-none">
      
      {/* ✨ Subtle  Ambient Background Reflector */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 💎  Card Container */}
      <div className="card w-full max-w-md shadow-xl sm:shadow-2xl bg-base-100 border border-base-200/60 p-5 sm:p-8 rounded-2xl md:rounded-3xl z-10 backdrop-blur-sm">
        
        {/* Header Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-base-content bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-xs text-gray-400 mt-1 sm:mt-1.5">
            Join us today! Set up your credentials to get started.
          </p>
        </div>

        {/* 📝 Main Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4 mb-6">
          
          {/* Full Name Input */}
          <div className="form-control w-full">
            <label className="input input-bordered flex items-center gap-3 rounded-xl input-sm sm:input-md focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
              👤
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                required 
                className="grow text-sm sm:text-base"
              />
            </label>
          </div>

          {/* Email Input */}
          <div className="form-control w-full">
            <label className="input input-bordered flex items-center gap-3 rounded-xl input-sm sm:input-md focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
              ✉️
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                required 
                className="grow text-sm sm:text-base"
              />
            </label>
          </div>

          {/* Password Input */}
          <div className="form-control w-full">
            <label className="input input-bordered flex items-center gap-3 rounded-xl input-sm sm:input-md focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
              🔒
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                required 
                className="grow text-sm sm:text-base"
              />
            </label>
          </div>

          {/* Photo URL Input */}
          <div className="form-control w-full">
            <label className="input input-bordered flex items-center gap-3 rounded-xl input-sm sm:input-md focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
              🖼️
              <input 
                type="url" 
                name="photo" 
                placeholder="Photo URL" 
                required 
                className="grow text-sm sm:text-base"
              />
            </label>
          </div>

          {/*  Form Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full btn-sm sm:btn-md rounded-xl font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] mt-2 text-xs sm:text-sm"
          >
            Sign Up
          </button>
        </form>

        {/* Custom Divider */}
        <div className="divider text-[10px] sm:text-xs font-bold tracking-widest text-gray-400">OR CONTINUE WITH</div>

        {/* 🌐 Fully Center Aligned Google Login Container */}
        <div className="flex justify-center my-4 overflow-hidden max-w-full">
          <div className="w-full max-w-[240px] sm:max-w-xs flex justify-center scale-90 sm:scale-100 transition-transform">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  await loginWithGoogle(credentialResponse.credential);
                  toast.success('Google authentication successful!');
                  navigate('/');
                } catch (err) {
                  console.error(err);
                  toast.error('Google authentication failed!');
                }
              }}
              onError={() => {
                toast.error('Google authentication failed!');
              }}
            />
          </div>
        </div>

        {/* Footer Link Tracking */}
        <p className="text-center text-xs sm:text-sm mt-6 text-gray-500 font-medium">
          Already registered?
          <Link
            to="/login"
            className="text-primary font-bold link link-hover ml-1.5 transition-colors duration-200"
          >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;