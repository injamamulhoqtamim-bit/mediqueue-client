import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

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
        <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen flex items-center justify-center">
            {/* Main Form Container - Styled with the Yellow Theme from Image */}
            <div className="rounded-3xl shadow-2xl border border-transparent overflow-hidden w-full 
                            animate-[fadeInUp_0.6s_ease-out] transition-all duration-300">
                
                {/* Premium Gradient Header Banner */}
                <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-md">
                            Create Premium Tutor Card
                        </h2>
                        <p className="text-white/80 text-xs md:text-sm mt-2 max-w-md mx-auto">
                            Fill up the specialized metrics layer to dispatch your profile onto the active live stream networks.
                        </p>
                    </div>
                </div>

                {/* 🎨 Yellow Background Form Wrapper - Styled Like the Image */}
                <form onSubmit={handleAddTutor} className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f0d64d]">
                    
                    {/* Tutor Name */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Tutor Full Name</span>
                        </label>
                        <input 
                            type="text" 
                            name="tutorName" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner" 
                            placeholder="Ex: Dr. John Doe" 
                        />
                    </div>

                    {/* Image URL */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Tutor Image URL</span>
                        </label>
                        <input 
                            type="url" 
                            name="photo" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner" 
                            placeholder="https://imgbb.com/your-image-link" 
                        />
                    </div>

                    {/* Subject Expertise */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Subject Expertise Dropdown</span>
                        </label>
                        <select 
                            name="subject" 
                            className="select w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 min-h-0 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer"
                        >
                            <option value="Mathematics">🧮 Mathematics</option>
                            <option value="English">🔤 English</option>
                            <option value="Physics">⚛️ Physics</option>
                            <option value="Chemistry">🧪 Chemistry</option>
                            <option value="Biology">🧬 Biology</option>
                            <option value="Bangla">🇧🇩 Bangla</option>
                            <option value="History">📜 History</option>
                            <option value="Geography">🌍 Geography</option>
                            <option value="Computer Science">💻 Computer Science</option>
                        </select>
                    </div>

                    {/* Timing Window */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Timing Window</span>
                        </label>
                        <input 
                            type="text" 
                            name="availableDays" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner" 
                            placeholder="Ex: Sun-Thu 5:00 PM - 8:00 PM" 
                        />
                    </div>

                    {/* Hourly Fee */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Hourly Fee (USD $)</span>
                        </label>
                        <input 
                            type="number" 
                            name="hourlyFee" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner" 
                            placeholder="Ex: 25" 
                        />
                    </div>

                    {/* Total Seats */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Total Seats / Slots Available</span>
                        </label>
                        <input 
                            type="number" 
                            name="totalSlot" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner" 
                            placeholder="Ex: 5" 
                        />
                    </div>

                    {/* Session Launch Date */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Session Launch Date</span>
                        </label>
                        <input 
                            type="date" 
                            name="sessionStartDate" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer" 
                        />
                    </div>

                    {/* Institution */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Institution & Past History</span>
                        </label>
                        <input 
                            type="text" 
                            name="institution" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner" 
                            placeholder="Ex: Dhaka University, 3 Yrs Exp" 
                        />
                    </div>

                    {/* Location */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Location Coverage Area</span>
                        </label>
                        <input 
                            type="text" 
                            name="location" 
                            required 
                            className="input w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner" 
                            placeholder="Ex: Dhanmondi, Dhaka" 
                        />
                    </div>

                    {/* Teaching Mode */}
                    <div className="form-control w-full">
                        <label className="label pb-1">
                            <span className="label-text font-semibold text-sm md:text-base text-[#2d2a1e] tracking-wide">Teaching Mode Selection</span>
                        </label>
                        <select 
                            name="teachingMode" 
                            className="select w-full bg-[#fffcf5] border-none focus:outline-none focus:ring-2 focus:ring-black/20 rounded-2xl h-12 min-h-0 transition-all duration-200 text-sm md:text-base font-medium text-gray-800 shadow-inner cursor-pointer"
                        >
                            <option value="Online">🌐 Online Only</option>
                            <option value="Offline">🏫 Offline Physical Only</option>
                            <option value="Both">🔄 Hybrid Architecture (Both)</option>
                        </select>
                    </div>

                    {/* Submit Button Styled Exactly Like the Image */}
                    <div className="md:col-span-2 mt-6 px-2 md:px-6">
                        <button 
                            type="submit" 
                            className="btn btn-primary w-full rounded-full border-none normal-case tracking-wide text-white text-base md:text-lg font-medium py-3 h-auto min-h-0 bg-[#0f52d6] hover:bg-[#0c44b3] shadow-md transition-all duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTutor;