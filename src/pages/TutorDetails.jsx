import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';
import { motion } from 'framer-motion';

const TutorDetails = () => {
  useDocumentTitle('Tutor Details');

  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [tutor, setTutor] = useState(null);
  
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNote, setSpecialNote] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setStudentName(user?.displayName || user?.name || '');
      setStudentEmail(user?.email || '');
    }
  }, [user]);

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
    setIsSubmitting(true);

    try {
      const bookingData = {
        tutorId: tutor._id,
        tutorName: tutor.tutorName,
        tutorPhoto: tutor.photo, // 🌟 এই প্রোপার্টিটি ডাটাবেজে টিউটরের ছবি সেভ করবে
        studentName: studentName || 'Anonymous Student', 
        studentEmail: studentEmail,                     
        phone,
        specialNote,                                    
        status: "booked",
        bookingDate: new Date()
      };

      const res = await axiosSecure.post("/bookings", bookingData);

      if (res.data.insertedId) {
        toast.success("Session booked successfully!");
        setPhone('');
        setSpecialNote('');
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setIsSubmitting(false);
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
    <div className="min-h-screen bg-gradient-to-b from-[#0A1828] to-[#172A45] text-gray-200 py-6 sm:py-12 md:py-16 px-3 sm:px-4 select-none overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start"
        >
          
          {/* Tutor Profile Card */}
          <div className="lg:col-span-7 bg-[#0D1F38]/40 border border-white/5 shadow-2xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
            <div className="overflow-hidden rounded-xl mb-6 relative group border border-white/5 bg-[#112240]/40 aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-video w-full">
              <img
                src={tutor.photo}
                alt={tutor.tutorName}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#4A7BC7] text-white text-[10px] sm:text-xs md:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md z-10">
                {tutor.subject}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-gray-100 mb-4 font-sans opacity-95">
              {tutor.tutorName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-white/5 pt-4 text-xs sm:text-sm md:text-base">
              <div className="bg-[#112240]/50 p-3 sm:p-4 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Institution</span>
                <strong className="text-gray-200 font-medium break-words">{tutor.institution}</strong>
              </div>
              <div className="bg-[#112240]/50 p-3 sm:p-4 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Location</span>
                <strong className="text-gray-200 font-medium break-words">{tutor.location}</strong>
              </div>
              <div className="bg-[#112240]/50 p-3 sm:p-4 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Teaching Mode</span>
                <strong className="text-gray-200 font-medium">{tutor.teachingMode}</strong>
              </div>
              <div className="bg-[#112240]/50 p-3 sm:p-4 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Available Days</span>
                <strong className="text-gray-200 font-medium break-words">{tutor.availableDays}</strong>
              </div>
              <div className="bg-[#112240]/50 p-3 sm:p-4 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Total Slots</span>
                <strong className="text-gray-200 font-medium">{tutor.totalSlot} Slots</strong>
              </div>
              <div className="bg-[#112240]/50 p-3 sm:p-4 rounded-xl border border-white/5">
                <span className="text-gray-400 block text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">Session Start</span>
                <strong className="text-gray-200 font-medium">{tutor.sessionStartDate}</strong>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 bg-gradient-to-r from-[#112240] to-[#15294A] p-3.5 sm:p-4 rounded-xl flex justify-between items-center border border-white/5 gap-2">
              <span className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">Monthly Subscription Fee</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF9F29] shrink-0">৳ {tutor.hourlyFee} BDT</span>
            </div>
          </div>

          {/* Booking Form Card */}
          <div className="lg:col-span-5 bg-[#0D1F38]/40 border border-white/5 shadow-2xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-md lg:sticky lg:top-6">
            
            <div className="text-left mb-5 sm:mb-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-normal tracking-wide text-gray-200 font-sans opacity-90">
                Book Session
              </h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 mt-1">Fill in the data below to reserve your slot.</p>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              
              {/* Student Name (Editable) */}
              <div className="form-control w-full">
                <span className="text-[10px] sm:text-xs text-gray-300 mb-1.5 ml-1 uppercase tracking-wider">Your Name</span>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 border border-white/5 rounded-xl py-2.5 sm:py-3.5 px-4 sm:px-5 text-xs sm:text-sm outline-none focus:bg-[#15294A] focus:border-[#4A7BC7]/50 transition-all duration-200"
                />
              </div>

              {/* Student Email (Editable) */}
              <div className="form-control w-full">
                <span className="text-[10px] sm:text-xs text-gray-300 mb-1.5 ml-1 uppercase tracking-wider">Your Email</span>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 border border-white/5 rounded-xl py-2.5 sm:py-3.5 px-4 sm:px-5 text-xs sm:text-sm outline-none focus:bg-[#15294A] focus:border-[#4A7BC7]/50 transition-all duration-200"
                />
              </div>

              {/* Contact Number */}
              <div className="form-control w-full">
                <span className="text-[10px] sm:text-xs text-gray-300 mb-1.5 ml-1 uppercase tracking-wider">Contact Number</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 border border-white/5 rounded-xl py-2.5 sm:py-3.5 px-4 sm:px-5 text-xs sm:text-sm outline-none focus:bg-[#15294A] focus:border-[#4A7BC7]/50 transition-all duration-200"
                />
              </div>

              {/* Special Note (Optional) */}
              <div className="form-control w-full">
                <span className="text-[10px] sm:text-xs text-gray-300 mb-1.5 ml-1 uppercase tracking-wider">Special Note (Optional)</span>
                <textarea
                  rows="3"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="Any specific requirements or topic you want to discuss..."
                  className="w-full bg-[#112240] text-gray-200 placeholder-gray-400/60 border border-white/5 rounded-xl py-2.5 sm:py-3 px-4 sm:px-5 text-xs sm:text-sm outline-none focus:bg-[#15294A] focus:border-[#4A7BC7]/50 transition-all duration-200 resize-none"
                />
              </div>

              {/* Confirm Booking Button */}
              <div className="pt-3 sm:pt-4">
                <motion.button
                  whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF9F29] hover:bg-[#E88F1F] disabled:bg-gray-600 text-[#1F2937] disabled:text-gray-300 font-semibold uppercase tracking-wider rounded-full shadow-lg shadow-black/20 transition-all duration-200 py-2.5 sm:py-3 text-xs sm:text-sm flex justify-center items-center cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
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