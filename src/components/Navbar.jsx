import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
// 
//  

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  console.log("Navbar User:", user);
  const location = useLocation();

  // Dark Mode State Management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme); 
    if (theme === "dark") {
      html.classList.add("dark"); 
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = (path) => location.pathname === path;

  // Nav items block 
  const navLinks = (
    <>
      <li>
        <Link 
          to="/" 
          className={`px-4 py-2 font-medium rounded-xl transition-all duration-300 ${
            isActive('/') 
              ? 'bg-primary dark:bg-indigo-600 text-primary-content dark:text-white shadow-md shadow-primary/20' 
              : 'text-base-content/80 dark:text-gray-300 hover:bg-base-200 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white'
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
              ? 'bg-primary dark:bg-indigo-600 text-primary-content dark:text-white shadow-md shadow-primary/20' 
              : 'text-base-content/80 dark:text-gray-300 hover:bg-base-200 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white'
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
                  ? 'bg-primary dark:bg-indigo-600 text-primary-content dark:text-white shadow-md shadow-primary/20' 
                  : 'text-base-content/80 dark:text-gray-300 hover:bg-base-200 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white'
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
                  ? 'bg-primary dark:bg-indigo-600 text-primary-content dark:text-white shadow-md shadow-primary/20' 
                  : 'text-base-content/80 dark:text-gray-300 hover:bg-base-200 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white'
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
                  ? 'bg-primary dark:bg-indigo-600 text-primary-content dark:text-white shadow-md shadow-primary/20' 
                  : 'text-base-content/80 dark:text-gray-300 hover:bg-base-200 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white'
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
    // Navbar background dark mode 
    <div className="navbar sticky top-0 z-50 bg-base-100/80 dark:bg-[#0f172a]/90 backdrop-blur-md border-b border-base-200/60 dark:border-gray-800 shadow-sm px-4 md:px-8 transition-all duration-300">
      
      {/* Navbar Start: Mobile Hamburger & Brand logo */}
      <div className="navbar-start">
        <div className="dropdown group">
          <label 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost lg:hidden p-1 mr-2 hover:bg-base-200 dark:hover:bg-gray-800 rounded-xl swap swap-rotate"
          >
            <input type="checkbox" className="hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-base-content dark:text-gray-200 block group-focus-within:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-base-content dark:text-gray-200 hidden group-focus-within:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
          
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow-2xl bg-base-100 dark:bg-[#1e293b] border border-base-200 dark:border-gray-700 rounded-2xl w-56 gap-2 font-sans text-gray-800 dark:text-gray-200"
          >
            {navLinks}
          </ul>
        </div>
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* লোগো ইমেজ ট্যাগ */}
          <img 
            src="/logo.png" // 
            alt="Teachers Finding Logo" 
            className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-primary to-secondary dark:from-indigo-400 dark:to-pink-500 bg-clip-text text-transparent tracking-tight group-hover:opacity-90 transition-opacity">
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

      {/* Navbar End: User Profiles / Auth Status & Dark Mode Toggle */}
      <div className="navbar-end gap-2 sm:gap-3">
        
        {/* Dark Mode Button */}
        <button
          onClick={toggleTheme}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 border active:scale-95 shadow-sm ${
            theme === "light" 
              ? "bg-white border-base-300 hover:bg-base-200 text-amber-500" 
              : "bg-gray-800 border-gray-700 hover:bg-gray-700 text-yellow-400"
          }`}
        >
          {theme === "light" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.591 1.591M16.591 16.591l1.591 1.591M21 12h-2.25m-13.5 0H3m16.591-6.591l-1.591 1.591M6.091 16.591l-1.591 1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>

        {/* User Session Condition */}
        {!user ? (
          <Link 
            to="/login" 
            className="btn btn-primary dark:bg-indigo-600 dark:border-indigo-600 dark:text-white btn-sm md:btn-md px-4 sm:px-6 rounded-xl font-bold shadow-md hover:shadow-primary/20 transition-all duration-300 normal-case"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-2 md:gap-3 bg-base-200/50 dark:bg-gray-800 p-1 md:p-1.5 pr-2.5 md:pr-4 rounded-full border border-base-200/80 dark:border-gray-700 shadow-inner">
            
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
            <span className="font-bold text-[11px] md:text-sm text-base-content/90 dark:text-gray-200 hidden sm:inline-block max-w-[80px] md:max-w-[140px] truncate">
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