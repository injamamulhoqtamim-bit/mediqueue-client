import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          MediQueue
        </Link>
      </div>

      <div className="flex gap-2">

        <Link to="/" className="btn btn-ghost">
          Home
        </Link>

        <Link to="/tutors" className="btn btn-ghost">
          Tutors
        </Link>

        {user && (
          <>
            <Link
              to="/add-tutor"
              className="btn btn-ghost"
            >
              Add Tutor
            </Link>

            <Link
              to="/my-tutors"
              className="btn btn-ghost"
            >
              My Tutors
            </Link>

            <Link
              to="/my-bookings"
              className="btn btn-ghost"
            >
              My Bookings
            </Link>
          </>
        )}

        {!user ? (
          <Link
            to="/login"
            className="btn btn-primary"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <span className="font-medium">
              {user.name}
            </span>

            <button
              onClick={logoutUser}
              className="btn btn-error btn-sm"
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