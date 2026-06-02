import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

// Lucide Icons
import { 
    User, 
    Image, 
    BookOpen, 
    Calendar, 
    CircleDollarSign, 
    Users, 
    CalendarDays, 
    GraduationCap, 
    MapPin, 
    Video,
    X,
    Loader2
} from 'lucide-react';

const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY_HERE"; 

const AddTutor = () => {
    useDocumentTitle('Add Tutor Listing');
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);

    const handleAddTutor = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const imageFile = form.photo.files[0];
        if (!imageFile) {
            toast.error("Please select a tutor image!");
            return;
        }

        try {
            setIsUploading(true);

            const formData = new FormData();
            formData.append('image', imageFile);

            const imgbbRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, 
                formData
            );

            const photoUrl = imgbbRes.data.data.display_url;

            const tutorPayload = {
                tutorName: form.tutorName.value,
                photo: photoUrl,
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

            const res = await axiosSecure.post('/tutors', tutorPayload);
            if (res.data.insertedId) {
                toast.success("Tutor database card inserted successfully!");
                form.reset();
                navigate('/my-tutors');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image or database connection failure.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-3 sm:px-4 py-6 md:py-12 lg:py-16 max-w-5xl min-h-screen flex items-center justify-center">
            {/* Main Form Container */}
            <div className="rounded-2xl md:rounded-3xl shadow-2xl border border-transparent overflow-hidden w-full 
                            animate-[fadeInUp_0.6s_ease-out] transition-all duration-300 relative">
                
                {/* Premium Gradient Header Banner */}
                <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 sm:p-8 md:p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"></div>
                    
                    {/* Floating "X" Cancel Button */}
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="absolute top-3 right-3 sm:top-4 right-4 z-20 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all duration-200 shadow-md backdrop-blur-sm group active:scale-95"
                        title="Cancel and go Home"
                    >
                        <X size={18} className="sm:size-5 transition-transform duration-200 group-hover:rotate-90" />
                    </button>

                    <div className="relative z-10">
                        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-wide drop-shadow-md">
                            Launch Your Tutor Profile
                        </h2>
                        <p className="text-white/90 text-[11px] sm:text-xs md:text-sm lg:text-base mt-2 max-w-xl mx-auto leading-relaxed font-medium">
                            Fill up the specialized metrics layer to dispatch your profile onto the active live stream networks.
                        </p>
                    </div>
                </div>

                {/* Highly Responsive Yellow Background Form Wrapper */}
                <form 
                    onSubmit={handleAddTutor} 
                    className="p-4 sm:p-6 md:p-8 lg:p-12 grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-5 md:gap-y-6 bg-[#f0d64d]"
                >
                    
                    {/* Tutor Name */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <User size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Tutor Full Name</span>
                        </label>
                        <input 
                            type="text" 
                            name="tutorName" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-3 sm:px-4" 
                            placeholder="Ex: Dr. John Doe" 
                        />
                    </div>

                    {/* Image Upload - Fully Optimized Mobile Styles */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <Image size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Upload Tutor Image</span>
                        </label>
                        <input 
                            type="file" 
                            name="photo" 
                            accept="image/*"
                            required 
                            className="file-input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-3 sm:px-4 
                            file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer flex items-center" 
                        />
                    </div>

                    {/* Subject Expertise */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <BookOpen size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Subject Expertise</span>
                        </label>
                        <select 
                            name="subject" 
                            className="select w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 min-h-0 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer px-3 sm:px-4"
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
                        <label className="label py-1 flex items-center gap-2">
                            <Calendar size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Timing Window</span>
                        </label>
                        <input 
                            type="text" 
                            name="availableDays" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-3 sm:px-4" 
                            placeholder="Ex: Sun-Thu 5:00 PM - 8:00 PM" 
                        />
                    </div>

                    {/* Monthly Fee */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <CircleDollarSign size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Monthly Fee (TK ৳)</span>
                        </label>
                        <input 
                            type="number" 
                            name="hourlyFee" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-3 sm:px-4" 
                            placeholder="Ex: 5000" 
                        />
                    </div>

                    {/* Total Seats */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <Users size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Total Slots Available</span>
                        </label>
                        <input 
                            type="number" 
                            name="totalSlot" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-3 sm:px-4" 
                            placeholder="Ex: 5" 
                        />
                    </div>

                    {/* Session Launch Date */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <CalendarDays size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Session Launch Date</span>
                        </label>
                        <input 
                            type="date" 
                            name="sessionStartDate" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer px-3 sm:px-4" 
                        />
                    </div>

                    {/* Institution */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <GraduationCap size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Institution & Background</span>
                        </label>
                        <input 
                            type="text" 
                            name="institution" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-3 sm:px-4" 
                            placeholder="Ex: Dhaka University, 3 Yrs Exp" 
                        />
                    </div>

                    {/* Location */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <MapPin size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Location Coverage Area</span>
                        </label>
                        <input 
                            type="text" 
                            name="location" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner px-3 sm:px-4" 
                            placeholder="Ex: Dhanmondi, Dhaka" 
                        />
                    </div>

                    {/* Teaching Mode */}
                    <div className="form-control w-full">
                        <label className="label py-1 flex items-center gap-2">
                            <Video size={15} className="text-[#2d2a1e] shrink-0" />
                            <span className="label-text font-bold text-xs sm:text-sm text-[#2d2a1e] tracking-wide">Teaching Mode</span>
                        </label>
                        <select 
                            name="teachingMode" 
                            className="select w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/30 rounded-xl h-10 sm:h-11 md:h-12 min-h-0 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer px-3 sm:px-4"
                        >
                            <option value="Online">Online Only</option>
                            <option value="Offline">Offline Physical Only</option>
                            <option value="Both">Hybrid Architecture (Both)</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="sm:col-span-2 mt-2 sm:mt-4 md:mt-6">
                        <button 
                            type="submit" 
                            disabled={isUploading} 
                            className="btn btn-primary w-full rounded-full border-none normal-case tracking-wide text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold py-2.5 sm:py-3.5 md:py-4 h-auto min-h-0 bg-[#0f52d6] hover:bg-[#0c44b3] shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:transform-none disabled:cursor-not-allowed"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="animate-spin size-4 sm:size-5" />
                                    Uploading Profile Image...
                                </>
                            ) : (
                                "Submit Profile"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTutor;