import { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
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

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await loginWithGoogle(tokenResponse.access_token);
        toast.success('Google authentication successful!');
        navigate('/');
      } catch (err) {
        console.error(err);
        toast.error('Google authentication failed!');
      }
    },
    onError: () => {
      toast.error('Google authentication failed!');
    }
  });

  return (
    // Background Gradient Container with Responsive Padding and Centering
    <div className="min-h-screen flex justify-center items-center px-4 py-6 sm:py-10 md:py-14 bg-gradient-to-b from-[#0A1828] to-[#172A45] relative overflow-hidden select-none">
      
      {/*  Card Container:  */}
      <div className="w-full max-w-md bg-[#0D1F38]/40 border border-white/5 shadow-2xl p-5 xs:p-6 sm:p-10 rounded-2xl md:rounded-3xl z-10 backdrop-blur-md">
        
        {/*  Header Title */}
        <div className="text-left mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-wide text-gray-200 font-sans opacity-90">
            Registration form
          </h2>
        </div>

        {/*  Main Registration Form */}
        <form onSubmit={handleRegister} className="space-y-3.5 sm:space-y-4 mb-5 sm:mb-6">
          
          {/* Full Name Input */}
          <div className="form-control w-full">
            <input 
              type="text" 
              name="name" 
              placeholder="Full name" 
              required 
              className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 rounded-xl py-3 px-5 sm:py-3.5 sm:px-6 text-xs sm:text-sm md:text-base outline-none focus:bg-[#15294A] transition-all duration-200"
            />
          </div>

          {/* Email Input */}
          <div className="form-control w-full">
            <input 
              type="email" 
              name="email" 
              placeholder="E-mail" 
              required 
              className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 rounded-xl py-3 px-5 sm:py-3.5 sm:px-6 text-xs sm:text-sm md:text-base outline-none focus:bg-[#15294A] transition-all duration-200"
            />
          </div>

          {/* Photo URL Input */}
          <div className="form-control w-full">
            <input 
              type="url" 
              name="photo" 
              placeholder="Photo URL" 
              required 
              className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 rounded-xl py-3 px-5 sm:py-3.5 sm:px-6 text-xs sm:text-sm md:text-base outline-none focus:bg-[#15294A] transition-all duration-200"
            />
          </div>

          {/* Password Input */}
          <div className="form-control w-full">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 rounded-xl py-3 px-5 sm:py-3.5 sm:px-6 text-xs sm:text-sm md:text-base outline-none focus:bg-[#15294A] transition-all duration-200"
            />
          </div>

          {/* 🔵 Sign Up Button */}
          <div className="pt-1 sm:pt-2">
            <button
              type="submit"
              className="w-full bg-[#4A7BC7] hover:bg-[#3D6BB3] text-white font-semibold uppercase tracking-wider rounded-full shadow-lg shadow-black/20 transition-all duration-200 active:scale-[0.98] py-2.5 sm:py-3 text-xs sm:text-sm md:text-base"
            >
              SIGN UP
            </button>
          </div>
        </form>

        {/* Custom Divider */}
        <div className="divider text-[9px] sm:text-xs font-bold tracking-widest text-gray-500 my-4 sm:my-5">OR CONTINUE WITH</div>

        {/* 🟠 Custom Google Login Button */}
        <div className="w-full flex justify-center my-3 sm:my-4">
          <button
            type="button"
            onClick={() => handleGoogleSignIn()}
            className="w-full bg-[#FF9F29] hover:bg-[#E88F1F] text-[#1F2937] font-semibold rounded-full shadow-md transition-all duration-200 active:scale-[0.98] py-2.5 sm:py-3 px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3"
          >
            {/* White Circle Background for Google Icon */}
            <div className="bg-white p-1 rounded-full flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 shrink-0 shadow-sm">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.65-5.17 3.65-8.58z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
                <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.79 1.21 5.49l4.11-3.25z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.49l4.11 3.25c.94-2.85 3.57-4.99 6.68-4.99z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm md:text-base tracking-wide font-medium">
              Sign in with Google
            </span>
          </button>
        </div>

        {/* Footer Link Tracking */}
        <p className="text-center text-xs sm:text-sm mt-5 sm:mt-6 text-gray-400 font-medium">
          Already registered?
          <RouterLink
            to="/login"
            className="text-primary font-bold link link-hover ml-1 sm:ml-1.5 transition-colors duration-200"
          >
            Login here
          </RouterLink>
        </p>

      </div>
    </div>
  );
};

export default Register;