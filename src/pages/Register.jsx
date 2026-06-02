import { useContext, useState, useEffect } from 'react';
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

  // 🎬 অ্যানিমেশন স্টেট: প্রথমে পেজ লোড হওয়ার সময় ফর্মটি নিচে থাকবে
  const [animateIn, setAnimateIn] = useState(false);

  // পেজ মাউন্ট হওয়ার সাথে সাথে স্টেট ট্রু হবে এবং অ্যানিমেশন শুরু হবে
  useEffect(() => {
    setAnimateIn(true);
  }, []);

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
    // 🌌 py-6 থেকে md:py-14 ব্যবহার করে ছোট স্ক্রিনেও স্ক্রলিং ব্যালেন্স করা হয়েছে যেন কন্টেন্ট কেটে না যায়
    <div className="min-h-screen flex justify-center items-center px-4 py-6 sm:py-10 md:py-14 bg-gradient-to-b from-[#0A1828] to-[#172A45] relative overflow-hidden select-none">
      
      {/* 💎 Premium Card Container - এখানে নিচ থেকে উপরে আসার অ্যানিমেশন ক্লাস যুক্ত করা হয়েছে */}
      <div className={`w-full max-w-md bg-[#0D1F38]/40 border border-white/5 shadow-2xl p-5 xs:p-6 sm:p-10 rounded-2xl md:rounded-3xl z-10 backdrop-blur-md transform transition-all duration-700 ease-out ${
        animateIn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        
        {/* 📝 Header Title */}
        <div className="text-left mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-wide text-gray-200 font-sans opacity-90">
            Registration form
          </h2>
        </div>

        {/* 📝 Main Registration Form */}
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

          {/* Photo URL Input */}
          <div className="form-control w-full">
            <input 
              type="url" 
              name="photo" 
              placeholder="Photo URL" 
              required 
              className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 rounded-xl py-3 px-5 sm:py-3.5 sm:px-6 text-xs sm:text-sm md:text-base outline-none focus:bg-[#15294A] transition-all duration-200 text-center sm:text-left"
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

        {/* 🌐 Fully Center Aligned Google Login Container */}
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

        {/* Footer Link Tracking */}
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