import { Link } from "react-router-dom";

const Navbar = () => {
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

      <div className="flex gap-4">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>

        <Link to="/tutors" className="btn btn-ghost">
          Tutors
        </Link>

        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;