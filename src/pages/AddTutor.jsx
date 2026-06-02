import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

// অরিজিনাল মডার্ন আইকন ইমপোর্ট করা হলো
import { 
    User, 
    Image, 
    BookOpen, 
    Calendar, 
    DollarSign, 
    Users, 
    CalendarDays, 
    GraduationCap, 
    MapPin, 
    Video 
} from 'lucide-react';

const AddTutor = () => {
    useDocumentTitle('Add Tutor Listing');
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleAddTutor = (e) => {
        e.preventDefault();
        const form = e.target;
        
        const tutorPayload = {
            tutorName: form.tutorName.value,
            photo: form.photo.value,
            subject: form.subject.value,
            availableDays: form.availableDays.value,
            hourlyFee: parseFloat(form.hourlyFee.value),
            totalSlot: parseInt(form.totalSlot.value),
            sessionStartDate: form.sessionStartDate.value,
            institution: form.institution.value,
            location: form.location.value,
            teachingMode: form.teachingMode.value,
            userEmail: user?.email
        };

        axiosSecure.post('/tutors', tutorPayload)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Tutor database card inserted successfully!");
                    form.reset();
                    navigate('/my-tutors');
                }
            })
            .catch(() => toast.error("Database connection failure. Please re-verify data format."));
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-5xl min-h-screen flex items-center justify-center">
            {/* Main Form Container */}
            <div className="rounded-2xl md:rounded-3xl shadow-2xl border border-transparent overflow-hidden w-full 
                            animate-[fadeInUp_0.6s_ease-out] transition-all duration-300">
                
                {/* Premium Gradient Header Banner */}
                <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 md:p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-wide drop-shadow-md">
                            Launch Your Tutor Profile
                        </h2>
                        <p className="text-white/95 text-xs sm:text-sm md:text-base mt-2.5 max-w-xl mx-auto leading-relaxed font-medium">
                            Fill up the specialized metrics layer to dispatch your profile onto the active live stream networks.
                        </p>
                    </div>
                </div>

                {/* Highly Responsive Yellow Background Form Wrapper */}
                <form onSubmit={handleAddTutor} className="p-4 sm:p-6 md:p-10 lg:p-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 md:gap-y-6 bg-[#f0d64d]">
                    
                    {/* Tutor Name */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <User size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Tutor Full Name</span>
                        </label>
                        <input 
                            type="text" 
                            name="tutorName" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-4" 
                            placeholder="Ex: Dr. John Doe" 
                        />
                    </div>

                    {/* Image URL */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <Image size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Tutor Image URL</span>
                        </label>
                        <input 
                            type="url" 
                            name="photo" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-4" 
                            placeholder="https://imgbb.com/your-image-link" 
                        />
                    </div>

                    {/* Subject Expertise */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <BookOpen size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Subject Expertise</span>
                        </label>
                        <select 
                            name="subject" 
                            className="select w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 min-h-0 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer px-4"
                        >
                            <option value="Mathematics">Mathematics</option>
                            <option value="English">English</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Biology">Biology</option>
                            <option value="Bangla">Bangla</option>
                            <option value="History">History</option>
                            <option value="Geography">Geography</option>
                            <option value="Computer Science">Computer Science</option>
                        </select>
                    </div>

                    {/* Timing Window */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <Calendar size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Timing Window</span>
                        </label>
                        <input 
                            type="text" 
                            name="availableDays" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-4" 
                            placeholder="Ex: Sun-Thu 5:00 PM - 8:00 PM" 
                        />
                    </div>

                    {/* Hourly Fee */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <DollarSign size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Hourly Fee (USD $)</span>
                        </label>
                        <input 
                            type="number" 
                            name="hourlyFee" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-4" 
                            placeholder="Ex: 25" 
                        />
                    </div>

                    {/* Total Seats */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <Users size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Total Slots Available</span>
                        </label>
                        <input 
                            type="number" 
                            name="totalSlot" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-4" 
                            placeholder="Ex: 5" 
                        />
                    </div>

                    {/* Session Launch Date */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <CalendarDays size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Session Launch Date</span>
                        </label>
                        <input 
                            type="date" 
                            name="sessionStartDate" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer px-4" 
                        />
                    </div>

                    {/* Institution */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <GraduationCap size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Institution & Background</span>
                        </label>
                        <input 
                            type="text" 
                            name="institution" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-4" 
                            placeholder="Ex: Dhaka University, 3 Yrs Exp" 
                        />
                    </div>

                    {/* Location */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <MapPin size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Location Coverage Area</span>
                        </label>
                        <input 
                            type="text" 
                            name="location" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-4" 
                            placeholder="Ex: Dhanmondi, Dhaka" 
                        />
                    </div>

                    {/* Teaching Mode */}
                    <div className="form-control w-full">
                        <label className="label py-1.5 flex items-center gap-2">
                            <Video size={16} className="text-[#2d2a1e]" />
                            <span className="label-text font-bold text-xs sm:text-sm md:text-base text-[#2d2a1e] tracking-wide">Teaching Mode</span>
                        </label>
                        <select 
                            name="teachingMode" 
                            className="select w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl md:rounded-2xl h-11 md:h-12 min-h-0 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer px-4"
                        >
                            <option value="Online">Online Only</option>
                            <option value="Offline">Offline Physical Only</option>
                            <option value="Both">Hybrid Architecture (Both)</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="sm:col-span-2 mt-4 md:mt-6">
                        <button 
                            type="submit" 
                            className="btn btn-primary w-full rounded-full border-none normal-case tracking-wide text-white text-sm sm:text-base md:text-lg font-bold py-3 md:py-4 h-auto min-h-0 bg-[#0f52d6] hover:bg-[#0c44b3] shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            Submit Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTutor;