import { useContext, useState } from 'react'; 
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google'; 
import useDocumentTitle from '../hooks/useDocumentTitle';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { FcGoogle } from 'react-icons/fc'; 

const Login = () => {
  useDocumentTitle('User Core Authentication');

  const { loginWithGoogle, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showPassword, setShowPassword] = useState(false);

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

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
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
    ux_mode: 'popup', 
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-[#13113c] via-[#2b0c54] to-[#1a3fa8] px-4 py-8 md:py-12">
      
      {/* Title Section - Scaled font sizes for perfect mobile view */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center mb-6 md:mb-8 tracking-wide max-w-xl">
        Welcome to the website
      </h1>

      {/* Main Container - Adjusted max-width for look and feel consistency */}
      <div className="w-full max-w-md sm:max-w-lg bg-white/10 backdrop-blur-md shadow-2xl border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.5rem] text-white">
        
        {/* Updated Subtitle Section */}
        <h2 className="text-sm sm:text-base md:text-lg font-medium text-center mb-6 md:mb-8 text-gray-200/90 tracking-wide">
          Please enter your details to Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6 w-full">
          
          {/* Email Input Field */}
          <div className="relative flex items-center">
            <FaUser className="absolute left-5 text-gray-500 text-base sm:text-lg" />
            <input
              type="email"
              name="email"
              placeholder="User Name / Email"
              required
              className="w-full pl-12 pr-5 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-sm sm:text-base md:text-lg transition-all"
            />
          </div>

          {/* Password Input Field */}
          <div className="relative flex items-center">
            <FaLock className="absolute left-5 text-gray-500 text-base sm:text-lg" />
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="Password"
              required
              className="w-full pl-12 pr-5 py-3.5 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-sm sm:text-base md:text-lg transition-all"
            />
          </div>

          {/* Eye Icon Area - Positioned right above Remember me */}
          <div className="flex justify-end px-2 -mb-2 sm:-mb-3">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors focus:outline-none"
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <>
                  <FaEyeSlash className="text-sm sm:text-base" />
                  <span>Hide Password</span>
                </>
              ) : (
                <>
                  <FaEye className="text-sm sm:text-base" />
                  <span>Show Password</span>
                </>
              )}
            </button>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex flex-row justify-between items-center text-xs sm:text-sm text-gray-200/90 px-2 font-medium gap-2">
            <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none structure-fix">
              <input 
                type="checkbox" 
                className="checkbox checkbox-xs border-white/40 [--chkbg:theme(colors.blue.600)] [--chkfg:white] rounded sm:w-4 sm:h-4" 
              />
              <span className="truncate">Remember me</span>
            </label>
            <Link to="#" className="hover:underline transition-all whitespace-nowrap">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-100 active:scale-[0.98] transition-all text-base sm:text-lg shadow-lg hover:shadow-white/10"
            >
              Login
            </button>
          </div>
        </form>

        {/* Custom Divider */}
        <div className="flex items-center my-6 sm:my-8 w-full">
          <div className="grow h-[1px] bg-white/20"></div>
          <span className="px-4 text-[11px] sm:text-xs font-bold tracking-widest text-gray-300 uppercase whitespace-nowrap">
            Or Continue With
          </span>
          <div className="grow h-[1px] bg-white/20"></div>
        </div>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <button
            onClick={() => handleGoogleLogin()}
            type="button"
            title="Sign in with Google"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-90 hover:scale-105 transition-all cursor-pointer"
          >
            <FcGoogle className="text-2xl sm:text-3xl" />
          </button>
        </div>

        {/* Updated Registration Link */}
        <p className="text-center text-xs sm:text-sm text-gray-300 mt-6 sm:mt-8">
          Don't have an account?{' '}
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