import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

// ⚙️ ImgBB API Key (Replace with your actual key)
const IMGBB_API_KEY = "0d5bb04602de817396a13eccc827e53f";

const Register = () => {
  useDocumentTitle('Create Account');

  const { loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [animateIn, setAnimateIn] = useState(false);
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setUploading(true); 

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.photo.files[0]; 

    
    if (!imageFile) {
      toast.error('Please upload a profile picture.');
      setUploading(false);
      return;
    }

    try {
      // 
      const formData = new FormData();
      formData.append('image', imageFile);

      const imgBbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );

      // 
      const photoUrl = imgBbRes.data.data.display_url;

      // 
      const userData = {
        name,
        email,
        password,
        photo: photoUrl, 
      };

      // registration API
      const res = await axios.post(
        'https://mediqueue-server-zl2f.onrender.com/register',
        userData
      );

      toast.success('Registration Successful. Please Login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration Failed');
    } finally {
      setUploading(false); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-6 sm:py-10 md:py-14 bg-gradient-to-b from-[#0A1828] to-[#172A45] relative overflow-hidden select-none">
      
      <div className={`w-full max-w-md bg-[#0D1F38]/40 border border-white/5 shadow-2xl p-5 xs:p-6 sm:p-10 rounded-2xl md:rounded-3xl z-10 backdrop-blur-md transform transition-all duration-700 ease-out ${
        animateIn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        
        <div className="text-left mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-wide text-gray-200 font-sans opacity-90">
            Registration form
          </h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-3.5 sm:space-y-4 mb-5 sm:mb-6">
          
          {/* Full Name Input */}
          <div className="form-control w-full">
            <input 
              type="text" 
              name="name" 
              placeholder="Full name" 
              required 
              className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 rounded-xl py-3 px-5 sm:py-3.5 sm:px-6 text-xs sm:text-sm md:text-base outline-none focus:bg-[#15294A] transition-all duration-200 text-center sm:text-left"
            />
          </div>

          {/* Email Input */}
          <div className="form-control w-full">
            <input 
              type="email" 
              name="email" 
              placeholder="E-mail" 
              required 
              className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 rounded-xl py-3 px-5 sm:py-3.5 sm:px-6 text-xs sm:text-sm md:text-base outline-none focus:bg-[#15294A] transition-all duration-200 text-center sm:text-left"
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text text-gray-400 text-xs sm:text-sm">Upload Profile Picture</span>
            </label>
            <input 
              type="file" 
              name="photo" 
              accept="image/*" 
              required 
              className="file-input file-input-bordered w-full bg-[#112240] text-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:bg-[#15294A] transition-all duration-200 border-white/10 file-input-primary"
            />
          </div>

          {/* Password Input */}
          <div className="form-control w-full">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
              className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 rounded-xl py-3 px-5 sm:py-3.5 sm:px-6 text-xs sm:text-sm md:text-base outline-none focus:bg-[#15294A] transition-all duration-200 text-center sm:text-left"
            />
          </div>

          {/* SIGN UP Button  */}
          <div className="pt-1 sm:pt-2">
            <button
              type="submit"
              disabled={uploading} 
              className="w-full bg-[#4A7BC7] hover:bg-[#3D6BB3] text-white font-semibold uppercase tracking-wider rounded-full shadow-lg shadow-black/20 transition-all duration-200 active:scale-[0.98] py-2.5 sm:py-3 text-xs sm:text-sm md:text-base disabled:bg-gray-600 flex justify-center items-center gap-2"
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                  REGISTERING...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>
          </div>
        </form>

        <div className="divider text-[9px] sm:text-xs font-bold tracking-widest text-gray-500 my-4 sm:my-5">OR CONTINUE WITH</div>

        <div className="flex justify-center my-3 sm:my-4 overflow-hidden max-w-full">
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

        <p className="text-center text-xs sm:text-sm mt-5 sm:mt-6 text-gray-400 font-medium">
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