import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';

const MyTutors = () => {
    useDocumentTitle('My Tutor Submissions');
    const { user } = useContext(AuthContext);
    console.log("Current User:", user);
    console.log("User Email:", user?.email);
    const axiosSecure = useAxiosSecure();
    const [myTutors, setMyTutors] = useState([]);
    const [editingTutor, setEditingTutor] = useState(null);

    const loadData = () => {
        console.log("Fetching Tutors For:", user?.email);
        axiosSecure.get(`/my-tutors?email=${user.email}`)
            .then(res => {
                console.log("Tutor Data:", res.data); 
                setMyTutors(res.data);
            });
    };

    useEffect(() => {
        if(user?.email) loadData();
    }, [user]);

    const handleDelete = (id) => {
        if(window.confirm("Are you absolutely sure you want to delete this resource entry?")) {
            axiosSecure.delete(`/tutors/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0) {
                        toast.success("Tutor record permanently dropped.");
                        loadData();
                    }
                });
        }
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedDoc = {
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
        };

        axiosSecure.put(`/tutors/${editingTutor._id}`, updatedDoc)
            .then(res => {
                if(res.data.modifiedCount > 0) {
                    toast.success("Document tracking records updated seamlessly!");
                    setEditingTutor(null);
                    loadData();
                }
            });
    };

    return (
        <div className="container mx-auto px-4 py-6 md:py-16 max-w-6xl min-h-screen">
            {/* ✨ Premium Header Section - Responsive Typography */}
            <div className="text-center mb-8 md:mb-14">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-base-content bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    Managed Tutor Accounts
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2 md:mt-3 max-w-md mx-auto px-2">
                    Supercharge your teaching roster. Monitor rates, check available seats, and fine-tune your tutor database.
                </p>
            </div>
            
            {myTutors.length === 0 ? (
                <div className="text-center py-12 md:py-16 bg-base-200/50 backdrop-blur-md rounded-2xl md:rounded-3xl max-w-2xl mx-auto border border-dashed border-base-300 shadow-inner px-4">
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">👨‍🏫</div>
                    <h3 className="text-lg md:text-xl font-extrabold mb-1.5 md:mb-2 text-base-content">No Active Tutor Profiles Located</h3>
                    <p className="text-gray-400 text-xs md:text-sm max-w-sm mx-auto">No active tutor profiles are hosted by your profile session yet.</p>
                </div>
            ) : (
                /* 💎 Premium Fully Responsive Card Grid Layout */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {myTutors.map(t => (
                        <div 
                            key={t._id} 
                            className="bg-base-100 rounded-xl md:rounded-2xl border border-base-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group sm:hover:-translate-y-1.5"
                        >
                            {/* Card Body with Fluid Padding */}
                            <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col gap-3 md:gap-4">
                                
                                {/* Profile Header (Image + Name + Subject Matrix) */}
                                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                    <div className="avatar shrink-0">
                                        <div className="mask mask-squircle w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300">
                                            <img src={t.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} alt={t.tutorName} />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Name</p>
                                        <h3 className="text-sm sm:text-base md:text-lg font-black text-base-content group-hover:text-primary transition-colors duration-200 truncate">
                                            {t.tutorName}
                                        </h3>
                                        <div className="mt-0.5 md:mt-1">
                                            <span className="badge badge-neutral text-[9px] md:text-[10px] font-bold tracking-wider uppercase px-2 py-1.5 h-auto whitespace-nowrap">
                                                {t.subject}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-base-200 w-full"></div>

                                {/* Metrics Row (Hourly Rate & Available Seats) */}
                                <div className="grid grid-cols-2 gap-2 bg-base-200/40 p-2.5 md:p-3 rounded-xl border border-base-200/60">
                                    <div className="min-w-0">
                                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-400 truncate">Hourly Rate</p>
                                        <p className="text-xs sm:text-sm md:text-base font-extrabold text-primary mt-0.5 truncate">
                                            ${t.hourlyFee}<span className="text-[10px] text-gray-400 font-normal">/hr</span>
                                        </p>
                                    </div>
                                    <div className="border-l border-base-200 pl-2.5 md:pl-3 min-w-0">
                                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-gray-400 truncate">Available Seats</p>
                                        <p className="text-xs sm:text-sm md:text-base font-extrabold text-secondary mt-0.5 truncate">
                                            {t.totalSlot} Slots
                                        </p>
                                    </div>
                                </div>

                                {/* Optional Metadata Traces (Institution & Location Base) */}
                                <div className="text-[10px] md:text-xs text-base-content/70 space-y-1 flex-1">
                                    <p className="truncate">🏫 <span className="font-medium text-base-content/90">{t.institution || 'N/A'}</span></p>
                                    <p className="truncate">📍 <span className="font-medium text-base-content/90">{t.location || 'Remote'}</span></p>
                                </div>

                                {/* Operational Action Matrix Buttons */}
                                <div className="grid grid-cols-2 gap-2 mt-1 md:mt-2">
                                    <button 
                                        onClick={() => setEditingTutor(t)} 
                                        className="btn btn-sm md:btn-md btn-warning font-bold tracking-wide text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 active:scale-95 text-amber-950 py-2 h-auto"
                                    >
                                        ✏️ Update
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(t._id)} 
                                        className="btn btn-sm md:btn-md btn-error text-white font-bold tracking-wide text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 active:scale-95 py-2 h-auto"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 🔒 Premium Fluid Glassmorphism Editing Modal - Full Screen Mobile Layout */}
            {editingTutor && (
                <div className="modal modal-open backdrop-blur-md transition-all duration-300 p-2 sm:p-4">
                    <div className="modal-box max-w-2xl bg-base-100 rounded-xl md:rounded-2xl border border-base-300/50 shadow-2xl p-4 sm:p-6 md:p-8 relative overflow-y-auto max-h-[95vh] sm:max-h-[90vh] w-full">
                        <button 
                            type="button"
                            onClick={() => setEditingTutor(null)}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 sm:right-4 sm:top-4 z-10"
                        >
                            ✕
                        </button>
                        
                        <div className="text-center mb-4 md:mb-6 mt-2 sm:mt-0">
                            <h3 className="font-black text-lg sm:text-xl md:text-2xl text-base-content">
                                Modify Profile Node
                            </h3>
                            <p className="text-[11px] sm:text-xs text-primary font-mono mt-0.5 truncate px-4">{editingTutor.tutorName}</p>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Tutor Name</span></label>
                                <input type="text" name="tutorName" defaultValue={editingTutor.tutorName} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Photo URL</span></label>
                                <input type="text" name="photo" defaultValue={editingTutor.photo} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Subject Set</span></label>
                                <input type="text" name="subject" defaultValue={editingTutor.subject} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Available Days Window</span></label>
                                <input type="text" name="availableDays" defaultValue={editingTutor.availableDays} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Hourly Pricing Matrix</span></label>
                                <input type="number" name="hourlyFee" defaultValue={editingTutor.hourlyFee} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Total Live Slots</span></label>
                                <input type="number" name="totalSlot" defaultValue={editingTutor.totalSlot} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Session Date Marker</span></label>
                                <input type="date" name="sessionStartDate" defaultValue={editingTutor.sessionStartDate} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Institution Track</span></label>
                                <input type="text" name="institution" defaultValue={editingTutor.institution} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Location Base</span></label>
                                <input type="text" name="location" defaultValue={editingTutor.location} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-0.5 md:py-1"><span className="label-text text-[11px] md:text-xs font-bold text-gray-500">Teaching Mode Map</span></label>
                                <input type="text" name="teachingMode" defaultValue={editingTutor.teachingMode} className="input input-bordered input-sm md:input-md rounded-xl w-full" required />
                            </div>
                            
                            {/* Actions Group - Grid Stacked on Extra Small Devices */}
                            <div className="sm:col-span-2 modal-action grid grid-cols-2 gap-3 mt-4 w-full">
                                <button type="submit" className="btn btn-sm sm:btn-md btn-success text-white font-bold rounded-xl shadow-md py-2 h-auto text-xs sm:text-sm">Save Changes</button>
                                <button type="button" onClick={() => setEditingTutor(null)} className="btn btn-sm sm:btn-md btn-outline border-base-300 rounded-xl py-2 h-auto text-xs sm:text-sm">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTutors;