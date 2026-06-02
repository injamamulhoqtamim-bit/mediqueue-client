import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
   console.log("Navbar User:", user);
  const location = useLocation();

  // root checking function to apply active styles to nav links
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

  const userPhoto = user?.photoURL || user?.photo || user?.image;
  const userDisplayName = user?.displayName || user?.name || "Account";

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200/60 shadow-sm px-4 md:px-8 transition-all duration-300">
      
      {/* Navbar Start: Mobile Hamburger & Brand logo */}
      <div className="navbar-start">
        <div className="dropdown group"> {/*  */}
          
          {/* Hamburger icon */}
          <label 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden p-1 mr-2 hover:bg-base-200 rounded-xl swap swap-rotate"
          >
            {/* Hamburger icon */}
            <input type="checkbox" className="hidden" />
            
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-base-content block group-focus-within:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            {/*  Cross button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-base-content hidden group-focus-within:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
          
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow-2xl bg-base-100 border border-base-200 rounded-2xl w-56 gap-2 font-sans"
          >
            {navLinks}
          </ul>
        </div>
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1.5 group">
          <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight group-hover:opacity-90 transition-opacity">
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
            className="btn btn-primary btn-sm md:btn-md px-5 sm:px-6 rounded-xl font-bold shadow-md hover:shadow-primary/20 transition-all duration-300 normal-case"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-2 md:gap-3 bg-base-200/50 p-1 md:p-1.5 pr-2.5 md:pr-4 rounded-full border border-base-200/80 shadow-inner">
            
            {/* Avatar Section */}
            <div className="avatar tooltip tooltip-bottom" data-tip={userDisplayName}>
              {userPhoto ? (
                <div className="w-8 md:w-9 h-8 md:h-9 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1 shadow-sm overflow-hidden bg-base-300">
                  <img 
                    src={userPhoto} 
                    alt={userDisplayName} 
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userDisplayName)}&background=random&color=fff`;
                    }}
                  />
                </div>
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8 md:w-9 h-8 md:h-9 ring-2 ring-primary ring-offset-base-100 ring-offset-1 flex items-center justify-center">
                    <span className="text-xs font-bold uppercase">
                      {userDisplayName.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Name */}
            <span className="font-bold text-[11px] md:text-sm text-base-content/90 hidden sm:inline-block max-w-[100px] md:max-w-[140px] truncate">
              {userDisplayName}
            </span>

            {/* Premium Logout Button */}
            <button 
              onClick={logoutUser} 
              className="btn btn-error text-white btn-xs md:btn-sm px-2.5 md:px-4 rounded-full font-bold shadow-sm hover:scale-105 active:scale-95 transition-all normal-case"
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