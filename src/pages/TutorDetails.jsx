import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';
import { motion } from 'framer-motion'; // Importing framer-motion for animations

const TutorDetails = () => {
  useDocumentTitle('Tutor Details');

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [tutor, setTutor] = useState(null);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios
      .get(`https://mediqueue-server-zl2f.onrender.com/tutors/${id}`)
      .then((res) => {
        setTutor(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Tutor not found');
      });
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const bookingData = {
        tutorId: tutor._id,
        tutorName: tutor.tutorName,
        studentName: user?.name,
        studentEmail: user?.email,
        phone,
        status: "booked",
        bookingDate: new Date()
      };

      const res = await axios.post(
        "https://mediqueue-server-zl2f.onrender.com/bookings",
        bookingData
      );

      if (res.data.insertedId) {
        toast.success("Session booked successfully!");
        setPhone('');
      }
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
    }
  };

  if (!tutor) {
    return (
      <div className="min-h-screen bg-[#0A1828] flex justify-center items-center">
        <span className="loading loading-spinner text-[#4A7BC7] loading-lg"></span>
      </div>
    );
  }

  return (
    // 🌌 Full-page gradient background with padding and overflow handling
    <div className="min-h-screen bg-gradient-to-b from-[#0A1828] to-[#172A45] text-gray-200 py-8 sm:py-12 md:py-16 px-4 select-none overflow-hidden">
      
      <div className="container mx-auto max-w-5xl">
        
        {/* Main Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Tutor Profile Card */}
          <div className="lg:col-span-7 bg-[#0D1F38]/40 border border-white/5 shadow-2xl rounded-2xl md:rounded-3xl p-5 sm:p-8 backdrop-blur-md relative overflow-hidden">
            
            {/* Image Container with Hover Effect */}
            <div className="overflow-hidden rounded-xl mb-6 relative group border border-white/5">
              <img
                src={tutor.photo}
                alt={tutor.tutorName}
                className="w-full h-[280px] xs:h-[350px] sm:h-[450px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#4A7BC7] text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
                {tutor.subject}
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide text-gray-100 mb-4 font-sans opacity-95">
              {tutor.tutorName}
            </h2>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4 text-sm sm:text-base">
              <div className="bg-[#112240]/50 p-3.5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-xs uppercase tracking-wider mb-0.5">Institution</span>
                <strong className="text-gray-200 font-medium">{tutor.institution}</strong>
              </div>

              <div className="bg-[#112240]/50 p-3.5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-xs uppercase tracking-wider mb-0.5">Location</span>
                <strong className="text-gray-200 font-medium">{tutor.location}</strong>
              </div>

              <div className="bg-[#112240]/50 p-3.5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-xs uppercase tracking-wider mb-0.5">Teaching Mode</span>
                <strong className="text-gray-200 font-medium">{tutor.teachingMode}</strong>
              </div>

              <div className="bg-[#112240]/50 p-3.5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-xs uppercase tracking-wider mb-0.5">Available Days</span>
                <strong className="text-gray-200 font-medium">{tutor.availableDays}</strong>
              </div>

              <div className="bg-[#112240]/50 p-3.5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-xs uppercase tracking-wider mb-0.5">Total Slots</span>
                <strong className="text-gray-200 font-medium">{tutor.totalSlot} Slots</strong>
              </div>

              <div className="bg-[#112240]/50 p-3.5 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-xs uppercase tracking-wider mb-0.5">Session Start</span>
                <strong className="text-gray-200 font-medium">{tutor.sessionStartDate}</strong>
              </div>
            </div>

            {/* Hourly Remuneration */}
            <div className="mt-6 bg-gradient-to-r from-[#112240] to-[#15294A] p-4 rounded-xl flex justify-between items-center border border-white/5">
              <span className="text-sm sm:text-base text-gray-300 font-medium">Hourly Remuneration</span>
              <span className="text-xl sm:text-2xl font-bold text-[#FF9F29]">${tutor.hourlyFee}/hr</span>
            </div>

          </div>

          {/* Booking Form */}
          <div className="lg:col-span-5 bg-[#0D1F38]/40 border border-white/5 shadow-2xl rounded-2xl md:rounded-3xl p-5 sm:p-8 backdrop-blur-md sticky top-6">
            
            <div className="text-left mb-6">
              <h3 className="text-xl sm:text-2xl font-normal tracking-wide text-gray-200 font-sans opacity-90">
                Book Session
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Fill in the data below to reserve your slot.</p>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              
              {/* Student Name */}
              <div className="form-control w-full">
                <span className="text-xs text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Your Name</span>
                <input
                  type="text"
                  value={user?.name || ''}
                  readOnly
                  placeholder="Student Name"
                  className="w-full bg-[#112240]/70 text-gray-400 border border-white/5 rounded-xl py-3 px-5 text-xs sm:text-sm outline-none cursor-not-allowed opacity-70"
                />
              </div>

              {/* Student Email */}
              <div className="form-control w-full">
                <span className="text-xs text-gray-400 mb-1.5 ml-1 uppercase tracking-wider">Your Email</span>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  placeholder="Student Email"
                  className="w-full bg-[#112240]/70 text-gray-400 border border-white/5 rounded-xl py-3 px-5 text-xs sm:text-sm outline-none cursor-not-allowed opacity-70"
                />
              </div>

              {/* Phone Input */}
              <div className="form-control w-full">
                <span className="text-xs text-gray-300 mb-1.5 ml-1 uppercase tracking-wider">Contact Number</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 border border-white/5 rounded-xl py-3.5 px-5 text-xs sm:text-sm outline-none focus:bg-[#15294A] focus:border-[#4A7BC7]/50 transition-all duration-200"
                />
              </div>

              {/* Confirm Booking Button */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-[#FF9F29] hover:bg-[#E88F1F] text-[#1F2937] font-semibold uppercase tracking-wider rounded-full shadow-lg shadow-black/20 transition-all duration-200 py-3 text-xs sm:text-sm"
                >
                  Confirm Booking
                </motion.button>
              </div>

            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default TutorDetails;