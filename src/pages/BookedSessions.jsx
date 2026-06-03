import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';
// রিয়াল আইকন ব্যবহারের জন্য Lucide Icons ইমপোর্ট করা হয়েছে
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';

const BookedSessions = () => {
    useDocumentTitle('My Booked Classes');
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // কাস্টম রিয়াল পপআপ (Modal) এর জন্য স্টেটসমূহ
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);

    const fetchUserBookings = () => {
        setIsLoading(true);
        axiosSecure.get(`/my-bookings?email=${user.email}`)
            .then(res => {
                // শুরুতে শুধুমাত্র যেগুলো একটিভ (cancelled নয়) সেগুলো ফিল্টার করে রাখতে পারেন
                // যদি আপনার ব্যাকএন্ড সব ডেটাই পাঠায়
                const activeBookings = res.data.filter(b => b.status !== 'cancelled');
                setBookings(activeBookings);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load your booked sessions.");
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (user?.email) {
            fetchUserBookings();
        }
    }, [user]);

    // ক্যান্সেল বাটন ক্লিক করলে পপআপ ওপেন হবে
    const openCancelModal = (id) => {
        setSelectedBookingId(id);
        setIsModalOpen(true);
    };

    // পপআপ এর ভেতরে 'Yes, Cancel' কনফার্ম করলে এই ফাংশনটি চলবে
    const handleConfirmCancel = () => {
        if (!selectedBookingId) return;
        
        setIsCancelling(true);
        axiosSecure.patch(`/bookings/${selectedBookingId}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Booking session has been successfully removed.");
                    
                    // 🔥 মূল পরিবর্তন: স্টেট থেকে ক্যানসেল হওয়া আইডি-র কার্ডটি সাথে সাথে একদম মুছে ফেলা হলো
                    setBookings(prevBookings => prevBookings.filter(b => b._id !== selectedBookingId));
                }
                setIsModalOpen(false); // পপআপ বন্ধ হবে
            })
            .catch(() => {
                toast.error("System connection trace timed out. Failure patching database resource.");
            })
            .finally(() => {
                setIsCancelling(false);
                setSelectedBookingId(null);
            });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-base-300/20">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 md:py-16 max-w-6xl min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-base-content bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    My Reserved Learning Sessions
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2 md:mt-3 max-w-md mx-auto px-2">
                    Manage and keep track of your active premium tutor block reservations and slots.
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-12 md:py-16 bg-base-200/50 backdrop-blur-md rounded-2xl md:rounded-3xl max-w-2xl mx-auto border border-dashed border-base-300 shadow-inner px-4">
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">📅</div>
                    <h3 className="text-lg md:text-xl font-extrabold mb-1.5 md:mb-2 text-base-content">No Scheduled Sessions Located</h3>
                    <p className="text-gray-400 text-xs md:text-sm max-w-sm mx-auto">Your account does not currently trace any premium tutor block reservations.</p>
                </div>
            ) : (
                /* Card Grid Layout */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {bookings.map(b => (
                        <div 
                            key={b._id} 
                            className="bg-base-100 rounded-xl md:rounded-2xl border border-base-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group sm:hover:-translate-y-1"
                        >
                            {/* Decorative Top Accent Layer */}
                            <div className="h-1.5 md:h-2 w-full bg-success"></div>
                            
                            {/* Card Body */}
                            <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col gap-4 md:gap-5">
                                
                                {/* Instructor Profile Header */}
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 truncate">Instructor Target</p>
                                        <h3 className="text-lg md:text-xl font-black text-primary mt-0.5 md:mt-1 group-hover:text-secondary transition-colors duration-200 truncate">
                                            {b.tutorName}
                                        </h3>
                                    </div>
                                    
                                    {/* Allocation Status Badge */}
                                    <span className="text-[9px] md:text-[10px] font-extrabold px-2.5 py-0.5 md:py-1 rounded-full tracking-wider uppercase shadow-sm shrink-0 bg-success/10 text-success border border-success/20">
                                        {b.status}
                                    </span>
                                </div>

                                <div className="h-[1px] bg-base-200 w-full"></div>

                                {/* Attendee Metadata */}
                                <div className="space-y-2.5 md:space-y-3 flex-1">
                                    {/* Student Name */}
                                    <div>
                                        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400">Student Attendee</p>
                                        <p className="text-xs md:text-sm font-semibold text-base-content/90 mt-0.5 flex items-center gap-1.5 truncate">
                                            👨‍🎓 {b.studentName}
                                        </p>
                                    </div>

                                    {/* Registered Email */}
                                    <div>
                                        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400">Registered Email</p>
                                        <div className="max-w-full block">
                                            <p className="text-[11px] md:text-xs font-mono text-base-content/70 mt-0.5 bg-base-200/50 px-2 py-0.5 md:py-1 rounded-md inline-block max-w-full truncate break-all">
                                                ✉️ {b.studentEmail}
                                            </p>
                                        </div>
                                    </div>

                                    {b.specialNote && (
                                        <div>
                                            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-400">Special Note</p>
                                            <p className="text-xs text-base-content/70 mt-0.5 bg-base-200/40 p-2 rounded-lg italic break-words">
                                                "{b.specialNote}"
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Operational Trigger Button */}
                                <div className="mt-1 md:mt-2">
                                    <button 
                                        onClick={() => openCancelModal(b._id)}
                                        className="w-full py-2.5 md:py-3 px-4 rounded-lg md:rounded-xl font-bold tracking-wide text-xs md:text-sm transition-all duration-200 shadow-sm md:shadow-md flex items-center justify-center gap-1.5 md:gap-2 bg-red-50 text-error hover:bg-error hover:text-white border border-error/20 active:scale-95"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> 
                                        Cancel Session Slot
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ————————————————————————————————————————————————————————— */}
            {/* কাস্টম রিয়াল পপআপ মডাল (DaisyUI / Tailwind Modal) */}
            {/* ————————————————————————————————————————————————————————— */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* ব্যাকড্রপ ব্লার লেয়ার */}
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => !isCancelling && setIsModalOpen(false)}
                    ></div>

                    {/* মডাল কন্টেন্ট বক্স */}
                    <div className="bg-base-100 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-base-300 relative z-10 transform scale-100 transition-all text-center animate-fade-in">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-error mb-4">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        
                        <h3 className="text-xl font-black text-base-content mb-2">
                            Confirm Cancellation
                        </h3>
                        
                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to cancel this lesson slot? This update will immediately remove the session from your view.
                        </p>

                        {/* অ্যাকশন বাটনসমূহ */}
                        <div className="flex gap-3 justify-center">
                            <button
                                type="button"
                                disabled={isCancelling}
                                className="px-4 py-2.5 rounded-xl bg-base-200 hover:bg-base-300 text-base-content text-sm font-bold transition-all"
                                onClick={() => setIsModalOpen(false)}
                            >
                                No, Keep It
                            </button>
                            <button
                                type="button"
                                disabled={isCancelling}
                                className="px-5 py-2.5 rounded-xl bg-error hover:bg-red-700 text-white text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                                onClick={handleConfirmCancel}
                            >
                                {isCancelling ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Removing...
                                    </>
                                ) : (
                                    'Yes, Cancel Slot'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookedSessions;