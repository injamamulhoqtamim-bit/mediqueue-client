import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 relative overflow-hidden px-4 select-none">
      
      {/* ✨ background blur decoration  */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center z-10 max-w-md mx-auto">
        {/* 🚀 Giant 404 Header */}
        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-base-content via-base-content/80 to-base-content/20 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
          404
        </h1>

        {/* 💎 Subtitle Section */}
        <div className="mt-2 space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-base-content">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
            Oops! The digital pathway you are looking for has been moved, archived, or never existed in this matrix.
          </p>
        </div>

        {/* 🏠 Interactive  Home Button */}
        <div className="mt-8">
          <Link
            to="/"
            className="btn btn-primary sm:btn-md btn-sm rounded-xl px-6 font-bold tracking-wide shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 active:scale-95 group"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
              ⬅️
            </span>{" "}
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;