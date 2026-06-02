import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
// 🌟 GoogleLogin এর পরিবর্তে useGoogleLogin ইমপোর্ট করা হয়েছে
import { useGoogleLogin } from '@react-oauth/google'; 
import useDocumentTitle from '../hooks/useDocumentTitle';

// আইকনের জন্য react-icons ব্যবহার করা হয়েছে
import { FaUser, FaLock } from 'react-icons/fa';
// 🌟 গুগল লোগো আইকনটি ইমপোর্ট করা হয়েছে
import { FcGoogle } from 'react-icons/fc'; 

const Login = () => {
  useDocumentTitle('User Core Authentication');

  const { loginWithGoogle, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const executionRedirectTarget = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      await loginUser(form.email.value, form.password.value);
      toast.success('Login Successful');
      navigate(executionRedirectTarget, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error('Invalid Credentials');
    }
  };

  // 🌟 গুগল লগইনের কাস্টম ট্রিগার (UX Mode সহ)
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // টোকেন রেসপন্স থেকে সরাসরি এক্সেস টোকেন পাঠানো হচ্ছে
        await loginWithGoogle(tokenResponse.access_token);
        toast.success('Google Login Successful');
        navigate(executionRedirectTarget, { replace: true });
      } catch (err) {
        console.error(err);
        toast.error('Google Login Failed');
      }
    },
    onError: () => {
      toast.error('Google Login Failed');
    },
    ux_mode: 'popup', // নিশ্চিত করে পপআপ উইন্ডো হ্যান্ডলার অন করা
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-[#13113c] via-[#2b0c54] to-[#1a3fa8] px-4 py-12">
      
      {/* ওয়েলকাম টেক্সট */}
      <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 tracking-wide">
        Welcome to the website
      </h1>

      {/* গ্লাস-মরফিজম লগইনカード */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] text-white">
        
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-10 tracking-wider">
          User Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto">
          
          {/* ইমেইল/ইউজারনেম ইনপুট ফিল্ড */}
          <div className="relative flex items-center">
            <FaUser className="absolute left-6 text-gray-500 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="User Name"
              required
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-base md:text-lg transition-all"
            />
          </div>

          {/* পাসওয়ার্ড ইনপুট ফিল্ড */}
          <div className="relative flex items-center">
            <FaLock className="absolute left-6 text-gray-500 text-lg" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-base md:text-lg transition-all"
            />
          </div>

          {/* রিমেম্বার মি এবং ফরগট পাসওয়ার্ড লিন্ক */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-200/90 px-2 font-medium">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="checkbox checkbox-xs border-white/40 [--chkbg:theme(colors.blue.600)] [--chkfg:white] rounded" 
              />
              <span>Remember me</span>
            </label>
            <Link to="#" className="hover:underline transition-all">
              Forgot password?
            </Link>
          </div>

          {/* লগইন বাটন */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full sm:w-3/5 py-3.5 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-100 active:scale-95 transition-all text-lg shadow-lg hover:shadow-white/10"
            >
              Login
            </button>
          </div>
        </form>

        {/* সোশ্যাল লগইন অংশ */}
        <div className="divider before:bg-white/20 after:bg-white/20 my-8 text-sm text-gray-300">OR</div>

        {/* 🎯 শুধুমাত্র বৃত্তাকার "G" বাটন */}
        <div className="flex justify-center">
          <button
            onClick={() => handleGoogleLogin()}
            type="button"
            title="Sign in with Google"
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-90 hover:scale-105 transition-all cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
          </button>
        </div>

        {/* রেজিস্টার লিন্ক */}
        <p className="text-center text-sm text-gray-300 mt-8">
          New user?{' '}
          <Link
            to="/register"
            className="text-white font-bold underline hover:text-blue-200 ml-1 transition-colors"
          >
            Register Here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;