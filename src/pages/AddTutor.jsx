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
            userEmail: user.email // Mapping creation ownership data point
        };

        axiosSecure.post('/tutors', tutorPayload)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Tutor database card inserted successfully!");
                    form.reset();
                    navigate('/my-tutors');
                }
            })
            .catch(() => toast.error("Database connection failure drop. Please re-verify data format."));
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="bg-base-100 p-8 rounded-2xl shadow-xl border border-base-200">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Premium Tutor Card</h2>
                <form onSubmit={handleAddTutor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Tutor Full Name</span></label>
                        <input type="text" name="tutorName" required className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Tutor Image URL</span></label>
                        <input type="url" name="photo" required placeholder="https://imgbb.com/your-image-link" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Subject Expertise Dropdown</span></label>
                        <select name="subject" className="select select-bordered w-full">
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Biology">Biology</option>
                            <option value="Computer Science">Computer Science</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Timing Window (e.g. Sun - Thu 5:00 PM)</span></label>
                        <input type="text" name="availableDays" placeholder="Sun-Thu 5:00 PM - 8:00 PM" required className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Hourly Fee (USD $)</span></label>
                        <input type="number" name="hourlyFee" required className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Total Seats/Slots Available</span></label>
                        <input type="number" name="totalSlot" required className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Session Launch Date</span></label>
                        <input type="date" name="sessionStartDate" required className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Institution & Past History</span></label>
                        <input type="text" name="institution" placeholder="Ex: Dhaka University, 3 Yrs Exp" required className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Location Coverage Area</span></label>
                        <input type="text" name="location" placeholder="Ex: Dhanmondi, Dhaka" required className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Teaching Mode Selection</span></label>
                        <select name="teachingMode" className="select select-bordered w-full">
                            <option value="Online">Online Only</option>
                            <option value="Offline">Offline Physical Only</option>
                            <option value="Both">Hybrid Architecture (Both)</option>
                        </select>
                    </div>
                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="btn btn-primary w-full">Submit Tutor Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTutor;