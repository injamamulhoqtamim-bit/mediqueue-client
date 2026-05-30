import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';

const BookedSessions = () => {
    useDocumentTitle('My Booked Classes');
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [bookings, setBookings] = useState([]);

    const fetchUserBookings = () => {
        axiosSecure.get(`/my-bookings?email=${user.email}`)
            .then(res => setBookings(res.data));
    };

    useEffect(() => {
        if (user?.email) {
            fetchUserBookings();
        }
    }, [user]);

    const handleCancelBooking = (id) => {
        if (window.confirm("Are you sure you want to cancel this lesson slot? This update cannot be undone.")) {
            axiosSecure.patch(`/bookings/${id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        toast.success("Booking structural status changed to cancelled.");
                        fetchUserBookings(); // Hot reloads internal list structure matrix
                    }
                })
                .catch(() => toast.error("System connection trace timed out. Failure patching database resource."));
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">My Reserved Learning Sessions</h2>

            {bookings.length === 0 ? (
                <div className="text-center py-16 bg-base-200 rounded-3xl max-w-2xl mx-auto border border-dashed border-base-300">
                    <h3 className="text-xl font-bold mb-2">No Scheduled Sessions Located</h3>
                    <p className="text-gray-500 text-sm">Your account does not currently trace any premium tutor block reservations.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-200 max-w-5xl mx-auto">
                    <table className="table w-full bg-base-100">
                        <thead className="bg-base-200 text-base-content font-semibold">
                            <tr>
                                <th>Instructor Target</th>
                                <th>Student Attendee</th>
                                <th>Registered Email</th>
                                <th>Allocation Status</th>
                                <th>Operational Triggers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b._id} className="hover transition-colors">
                                    <td className="font-bold text-primary">{b.tutorName}</td>
                                    <td>{b.studentName}</td>
                                    <td className="text-xs font-mono">{b.studentEmail}</td>
                                    <td>
                                        <span className={`badge font-bold px-3 py-2 uppercase text-xs ${
                                            b.status === 'cancelled' ? 'badge-error text-white' : 'badge-success text-white'
                                        }`}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            disabled={b.status === 'cancelled'}
                                            onClick={() => handleCancelBooking(b._id)}
                                            className="btn btn-sm btn-outline btn-error hover:text-white"
                                        >
                                            Cancel Session
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookedSessions;