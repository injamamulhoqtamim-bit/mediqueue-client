import { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';

const MyTutors = () => {
    useDocumentTitle('My Tutor Submissions');
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const [myTutors, setMyTutors] = useState([]);
    const [editingTutor, setEditingTutor] = useState(null);
    const [deletingTutor, setDeletingTutor] = useState(null); 
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(() => {
        if (!user?.email) return;
        
        setLoading(true);
        axiosSecure.get(`/my-tutors?email=${user.email}`)
            .then(res => {
                setMyTutors(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching tutors:", err);
                toast.error("Failed to load your tutor roster.");
                setLoading(false);
            });
    }, [user?.email, axiosSecure]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const confirmDelete = () => {
        if (!deletingTutor) return;

        axiosSecure.delete(`/tutors/${deletingTutor._id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success(`${deletingTutor.tutorName}'s profile permanently dropped.`);
                    setDeletingTutor(null);
                    loadData();
                }
            })
            .catch(err => {
                console.error(err);
                toast.error(err.response?.data?.message || "Unauthorized or failed to delete.");
                setDeletingTutor(null);
            });
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
                if (res.data.modifiedCount > 0) {
                    toast.success("Document tracking records updated seamlessly!");
                    setEditingTutor(null);
                    loadData();
                } else {
                    toast.info("No changes were made to the document.");
                    setEditingTutor(null);
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to update tutor records.");
            });
    };

    // input styles (Light & Dark mode robust layout)
    const inputClasses = "input input-bordered input-sm md:input-md rounded-xl w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-600 focus:border-primary focus:outline-none";

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl min-h-screen">
            {/* ✨ Premium Header Section */}
            <div className="text-center mb-10 md:mb-16">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-base-content bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    Managed Tutor Accounts
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2 md:mt-4 max-w-xl mx-auto px-4">
                    Supercharge your teaching roster. Monitor rates, check available seats, and fine-tune your tutor database.
                </p>
            </div>
            
            {/* 🔄 Loading State */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : myTutors.length === 0 ? (
                <div className="text-center py-12 md:py-20 bg-base-200/50 backdrop-blur-md rounded-2xl max-w-xl mx-auto border border-dashed border-base-300 shadow-inner px-6">
                    <div className="text-4xl md:text-6xl mb-4">👨‍🏫</div>
                    <h3 className="text-lg md:text-2xl font-extrabold mb-2 text-base-content">No Active Tutor Profiles Located</h3>
                    <p className="text-gray-400 text-xs md:text-sm max-w-sm mx-auto">No active tutor profiles are hosted by your profile session yet.</p>
                </div>
            ) : (
                /* 💎 Premium Card Grid Layout */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {myTutors.map(t => (
                        <div 
                            key={t._id} 
                            className="bg-base-100 rounded-2xl border border-base-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group sm:hover:-translate-y-1.5"
                        >
                            <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
                                {/* Profile Header */}
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="avatar shrink-0">
                                        <div className="mask mask-squircle w-14 h-14 ring-2 ring-primary/20 group-hover:ring-primary transition-all duration-300">
                                            <img src={t.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} alt={t.tutorName} className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Instructor</p>
                                        <h3 className="text-base md:text-lg font-black text-base-content group-hover:text-primary transition-colors duration-200 truncate" title={t.tutorName}>
                                            {t.tutorName}
                                        </h3>
                                        <div className="mt-1">
                                            <span className="badge badge-neutral text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 h-auto inline-block max-w-full truncate">
                                                {t.subject}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-base-200 w-full"></div>

                                {/* Metrics Row */}
                                <div className="grid grid-cols-2 gap-3 bg-base-200/40 p-3 rounded-xl border border-base-200/60">
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 truncate">Hourly Rate</p>
                                        <p className="text-sm md:text-base font-extrabold text-primary mt-0.5 truncate">
                                            ${t.hourlyFee}<span className="text-xs text-gray-400 font-normal">/hr</span>
                                        </p>
                                    </div>
                                    <div className="border-l border-base-200 pl-3 min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 truncate">Available Seats</p>
                                        <p className="text-sm md:text-base font-extrabold text-secondary mt-0.5 truncate">
                                            {t.totalSlot} Slots
                                        </p>
                                    </div>
                                </div>

                                {/* Metadata Traces (Premium SVG Icons) */}
                                <div className="text-xs text-base-content/70 space-y-2.5 flex-1 mt-1">
                                    {/* Institution */}
                                    <div className="flex items-center gap-2.5 min-w-0" title={t.institution}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-primary shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                                        </svg>
                                        <span className="font-medium text-base-content/90 truncate">{t.institution || 'N/A'}</span>
                                    </div>
                                    
                                    {/* Location */}
                                    <div className="flex items-center gap-2.5 min-w-0" title={t.location}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-secondary shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        <span className="font-medium text-base-content/90 truncate">{t.location || 'Remote'}</span>
                                    </div>

                                    {/* Availability */}
                                    <div className="flex items-center gap-2.5 min-w-0" title={t.availableDays}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-accent shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>
                                        <span className="font-medium text-base-content/90 truncate">{t.availableDays || 'N/A'}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <button 
                                        onClick={() => setEditingTutor(t)} 
                                        className="group/btn btn btn-sm md:btn-md bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-500 font-bold tracking-wide text-xs rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 text-amber-600 hover:text-amber-950 py-2.5 h-auto"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.3} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        <span>Update</span>
                                    </button>

                                    <button 
                                        onClick={() => setDeletingTutor(t)} 
                                        className="group/btn btn btn-sm md:btn-md bg-rose-500/10 hover:bg-rose-500 border border-rose-500/30 hover:border-rose-500 text-rose-600 hover:text-white font-bold tracking-wide text-xs rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95 py-2.5 h-auto"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.3} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 🔒 Editing Modal */}
            {editingTutor && (
                <div className="modal modal-open backdrop-blur-md transition-all duration-300 p-4 z-50">
                    <div className="modal-box max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 md:p-8 relative max-h-[90vh] flex flex-col w-full overflow-hidden text-slate-800 dark:text-slate-100 rounded-2xl">
                        <button type="button" onClick={() => setEditingTutor(null)} className="btn btn-sm btn-circle btn-ghost text-slate-700 dark:text-slate-300 absolute right-4 top-4 z-10">✕</button>
                        
                        <div className="text-center mb-5 shrink-0">
                            <h3 className="font-black text-xl md:text-2xl text-slate-800 dark:text-slate-100">Modify Profile Node</h3>
                            <p className="text-xs text-primary font-mono mt-1 truncate px-4">{editingTutor.tutorName}</p>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleUpdateSubmit} className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Tutor Name</span></label>
                                <input type="text" name="tutorName" defaultValue={editingTutor.tutorName} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Photo URL</span></label>
                                <input type="text" name="photo" defaultValue={editingTutor.photo} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Subject Set</span></label>
                                <input type="text" name="subject" defaultValue={editingTutor.subject} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Available Days Window</span></label>
                                <input type="text" name="availableDays" defaultValue={editingTutor.availableDays} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Hourly Pricing Matrix</span></label>
                                <input type="number" step="any" name="hourlyFee" defaultValue={editingTutor.hourlyFee} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Total Live Slots</span></label>
                                <input type="number" name="totalSlot" defaultValue={editingTutor.totalSlot} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Session Date Marker</span></label>
                                <input type="date" name="sessionStartDate" defaultValue={editingTutor.sessionStartDate} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Institution Track</span></label>
                                <input type="text" name="institution" defaultValue={editingTutor.institution} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Location Base</span></label>
                                <input type="text" name="location" defaultValue={editingTutor.location} className={inputClasses} required />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-xs font-bold text-slate-500 dark:text-slate-400">Teaching Mode Map</span></label>
                                <input type="text" name="teachingMode" defaultValue={editingTutor.teachingMode} className={inputClasses} required />
                            </div>
                            
                            {/* Sticky Modal Actions */}
                            <div className="sm:col-span-2 modal-action grid grid-cols-2 gap-4 mt-6 w-full pt-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                                <button type="submit" className="btn btn-sm sm:btn-md btn-success text-white font-bold rounded-xl shadow-md py-2.5 h-auto text-sm">Save Changes</button>
                                <button type="button" onClick={() => setEditingTutor(null)} className="btn btn-sm sm:btn-md btn-outline border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl py-2.5 h-auto text-sm">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 🔴 Delete Confirmation Modal */}
            {deletingTutor && (
                <div className="modal modal-open backdrop-blur-md transition-all duration-300 p-4 z-50">
                    <div className="modal-box max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-error/30 shadow-[0_0_40px_rgba(239,68,68,0.15)] p-6 text-center relative">
                        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-error/10 text-error flex items-center justify-center rounded-2xl mb-4 border border-error/20 text-2xl sm:text-3xl shadow-inner">
                            <span className="animate-pulse">⚠️</span>
                        </div>
                        
                        <h3 className="font-black text-xl text-slate-800 dark:text-slate-100 mt-1">
                            Are you sure you want to delete your profile?
                        </h3>
                        
                        <p className="text-xs text-gray-400 mt-2 mb-6 font-medium tracking-wide px-2 break-words">
                            This will permanently remove <span className="text-error font-bold font-mono">"{deletingTutor.tutorName}"</span> from the global tracking system.
                        </p>

                        <div className="grid grid-cols-2 gap-3 w-full">
                            <button type="button" onClick={() => setDeletingTutor(null)} className="btn btn-sm sm:btn-md btn-outline border-slate-300 dark:border-slate-700 rounded-xl transition-all duration-200 active:scale-95 py-2.5 h-auto font-bold text-sm text-slate-700 dark:text-slate-300">
                                No
                            </button>
                            <button onClick={confirmDelete} className="btn btn-sm sm:btn-md btn-error text-white font-bold rounded-xl shadow-md transition-all duration-200 active:scale-95 py-2.5 h-auto text-sm">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTutors;