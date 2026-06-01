import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  // nav items block to avoid repetition
  const navLinks = (
    <>
      <li>
        <Link to="/" className="btn btn-ghost btn-sm md:btn-md">
          Home
        </Link>
      </li>
      <li>
        <Link to="/tutors" className="btn btn-ghost btn-sm md:btn-md">
          Tutors
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/add-tutor" className="btn btn-ghost btn-sm md:btn-md">
              Add Tutor
            </Link>
          </li>
          <li>
            <Link to="/my-tutors" className="btn btn-ghost btn-sm md:btn-md">
              My Tutors
            </Link>
          </li>
          <li>
            <Link to="/my-bookings" className="btn btn-ghost btn-sm md:btn-md">
              My Bookings
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-6">
      {/* Navbar Start: Hamburger menu for mobile & Brand logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                 d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-1"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-xl md:text-2xl font-bold text-primary ml-2 lg:ml-0">
          MediQueue
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End: User Auth status */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-primary btn-sm md:btn-md">
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-2 md:gap-3">
            <span className="font-medium text-xs md:text-base hidden sm:inline">
              {user.name}
            </span>
            {user.photoURL && (
              <div className="avatar">
                <div className="w-8 md:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt={user.name} />
                </div>
              </div>
            )}
            <button 
              onClick={logoutUser} 
              className="btn bg-red-600 hover:bg-red-700 text-white border-none btn-xs md:btn-sm"
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