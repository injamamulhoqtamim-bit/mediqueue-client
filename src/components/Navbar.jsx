import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  // কোন রুট একটিভ আছে তা চেক করার ফাংশন (ডিজাইন সুন্দর করার জন্য)
  const isActive = (path) => location.pathname === path;

  // Nav items block with premium active/hover indicators
  const navLinks = (
    <>
      <li>
        <Link 
          to="/" 
          className={`px-4 py-2 font-medium rounded-xl transition-all duration-300 ${
            isActive('/') 
              ? 'bg-primary text-primary-content shadow-md shadow-primary/20' 
              : 'text-base-content/80 hover:bg-base-200 hover:text-primary'
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link 
          to="/tutors" 
          className={`px-4 py-2 font-medium rounded-xl transition-all duration-300 ${
            isActive('/tutors') 
              ? 'bg-primary text-primary-content shadow-md shadow-primary/20' 
              : 'text-base-content/80 hover:bg-base-200 hover:text-primary'
          }`}
        >
          Tutors
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link 
              to="/add-tutor" 
              className={`px-4 py-2 font-medium rounded-xl transition-all duration-300 ${
                isActive('/add-tutor') 
                  ? 'bg-primary text-primary-content shadow-md shadow-primary/20' 
                  : 'text-base-content/80 hover:bg-base-200 hover:text-primary'
              }`}
            >
              Add Tutor
            </Link>
          </li>
          <li>
            <Link 
              to="/my-tutors" 
              className={`px-4 py-2 font-medium rounded-xl transition-all duration-300 ${
                isActive('/my-tutors') 
                  ? 'bg-primary text-primary-content shadow-md shadow-primary/20' 
                  : 'text-base-content/80 hover:bg-base-200 hover:text-primary'
              }`}
            >
              My Tutors
            </Link>
          </li>
          <li>
            <Link 
              to="/my-bookings" 
              className={`px-4 py-2 font-medium rounded-xl transition-all duration-300 ${
                isActive('/my-bookings') 
                  ? 'bg-primary text-primary-content shadow-md shadow-primary/20' 
                  : 'text-base-content/80 hover:bg-base-200 hover:text-primary'
              }`}
            >
              My Bookings
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    /* sticky top-0 z-50: স্ক্রোল করার সময় ন্যাভবারটি উপরে ফিক্সড রাখবে।
       backdrop-blur-md bg-base-100/80: স্ক্রোল করার সময় পেছনের কন্টেন্ট হালকা ব্লার দেখাবে।
    */
    <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200/60 shadow-sm px-4 md:px-8 transition-all duration-300">
      
      {/* Navbar Start: Mobile Hamburger & Brand logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-1 mr-2 hover:bg-base-200 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-base-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                 d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow-2xl bg-base-100 border border-base-200 rounded-2xl w-56 gap-2 font-sans"
          >
            {navLinks}
          </ul>
        </div>
        
        {/* Brand Logo with Premium Styling */}
        <Link to="/" className="flex items-center gap-1.5 group">
          <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight group-hover:opacity-90 transition-opacity">
            Teachers Finding
          </span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-1.5">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End: User Profiles / Auth Status */}
      <div className="navbar-end">
        {!user ? (
          <Link 
            to="/login" 
            className="btn btn-primary btn-sm md:btn-md px-6 rounded-xl font-bold shadow-md hover:shadow-primary/20 transition-all duration-300"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-3 bg-base-200/50 p-1.5 pr-3 rounded-full border border-base-200/80 shadow-inner">
            {/* Avatar Section */}
            {user.photoURL ? (
              <div className="avatar">
                <div className="w-8 md:w-9 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1 shadow-sm">
                  <img src={user.photoURL} alt={user.name || "User"} />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8 md:w-9">
                  <span className="text-xs">{user.name?.charAt(0) || "U"}</span>
                </div>
              </div>
            )}
            
            {/* User Name */}
            <span className="font-semibold text-xs md:text-sm text-base-content/90 hidden sm:inline max-w-[120px] truncate">
              {user.name || "Account"}
            </span>

            {/* Premium Logout Button */}
            <button 
              onClick={logoutUser} 
              className="btn btn-error btn-xs md:btn-sm text-white px-3 md:px-4 rounded-full font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;