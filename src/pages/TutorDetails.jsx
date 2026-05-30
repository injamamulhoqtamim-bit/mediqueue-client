import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

const TutorDetails = () => {
    useDocumentTitle('Tutor Details');
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [tutor, setTutor] = useState(null);
    const [phone, setPhone] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/tutors/${id}`)
            .then(res => setTutor(res.data));
    }, [id]);

    if (!tutor) return <div className="text-center py-12"><span className="loading loading-spinner"></span></div>;

    const handleBooking = (e) => {
        e.preventDefault();
        
        // Strict Business Validations
        if (tutor.totalSlot <= 0) {
            return toast.error("No available slots left. This session is fully booked.");
        }

        const today = new Date().toISOString().split('T')[0];
        if (today < tutor.sessionStartDate) {
            return toast.error("Booking is not available yet for this tutor");
        }

        const bookingPayload = {
            tutorId: tutor._id,
            tutorName: tutor.tutorName,
            studentName: user.displayName,
            studentEmail: user.email,
            phone: phone,
            status: 'booked'
        };

        axiosSecure.post('/bookings', bookingPayload)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Session successfully booked!");
                    navigate('/my-bookings');
                }
            })
            .catch(err => {
                toast.error(err.response?.data?.message || "Booking creation failed.");
            });
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden p-6 md:p-12 border border-base-200">
                <img src={tutor.photo} alt={tutor.tutorName} className="w-full h-64 object-cover rounded-xl mb-6" />
                <h2 className="text-3xl font-bold mb-2">{tutor.tutorName}</h2>
                <span className="badge badge-lg badge-primary mb-4">{tutor.subject}</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <p><strong>Timing:</strong> {tutor.availableDays}</p>
                    <p><strong>Hourly Fee:</strong> ${tutor.hourlyFee}</p>
                    <p><strong>Session Starts:</strong> {tutor.sessionStartDate}</p>
                    <p><strong>Available Slots:</strong> {tutor.totalSlot}</p>
                </div>

                <div className="divider">Confirm Booking Instance</div>
                
                <form onSubmit={handleBooking} className="space-y-4 max-w-md mx-auto">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Student Name</span></label>
                        <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-base-200" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Student Email</span></label>
                        <input type="text" value={user?.email} readOnly className="input input-bordered bg-base-200" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Contact Phone Number</span></label>
                        <input type="tel" required placeholder="01XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="input input-bordered" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-4" disabled={tutor.totalSlot <= 0}>
                        {tutor.totalSlot <= 0 ? 'Fully Booked' : 'Confirm & Request Session'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TutorDetails;