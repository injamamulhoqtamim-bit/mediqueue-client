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

            console.log("Tutor Data:", res.data); setMyTutors(res.data);
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
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Managed Tutor Accounts</h2>
            
            {myTutors.length === 0 ? (
                <div className="text-center py-12 bg-base-200 rounded-2xl">
                    <p className="text-xl font-medium text-gray-500">No active tutor profiles hosted by your profile session yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-xl rounded-xl border border-base-200">
                    <table className="table w-full bg-base-100">
                        <thead className="bg-base-200">
                            <tr>
                                <th>Name</th>
                                <th>Subject Domain</th>
                                <th>Hourly Rate</th>
                                <th>Available Seats</th>
                                <th>Actions Matrix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myTutors.map(t => (
                                <tr key={t._id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar"><div className="mask mask-squircle w-12 h-12"><img src={t.photo} alt="" /></div></div>
                                            <div className="font-bold">{t.tutorName}</div>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-neutral">{t.subject}</span></td>
                                    <td>${t.hourlyFee}/hr</td>
                                    <td>{t.totalSlot} Slots</td>
                                    <td className="space-x-2">
                                        <button onClick={() => setEditingTutor(t)} className="btn btn-sm btn-warning">Update</button>
                                        <button onClick={() => handleDelete(t._id)} className="btn btn-sm btn-error text-white">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* In-Line Editing Modal Container Backdrop element */}
            {editingTutor && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl bg-base-100">
                        <h3 className="font-bold text-2xl mb-4 text-center">Modify Profile Node: {editingTutor.tutorName}</h3>
                        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Tutor Name</span></label>
                                <input type="text" name="tutorName" defaultValue={editingTutor.tutorName} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Photo URL</span></label>
                                <input type="text" name="photo" defaultValue={editingTutor.photo} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Subject Set</span></label>
                                <input type="text" name="subject" defaultValue={editingTutor.subject} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Available Days Window</span></label>
                                <input type="text" name="availableDays" defaultValue={editingTutor.availableDays} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Hourly Pricing Matrix</span></label>
                                <input type="number" name="hourlyFee" defaultValue={editingTutor.hourlyFee} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Total Live Slots</span></label>
                                <input type="number" name="totalSlot" defaultValue={editingTutor.totalSlot} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Session Date Marker</span></label>
                                <input type="date" name="sessionStartDate" defaultValue={editingTutor.sessionStartDate} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Institution Track</span></label>
                                <input type="text" name="institution" defaultValue={editingTutor.institution} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Location Base</span></label>
                                <input type="text" name="location" defaultValue={editingTutor.location} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Teaching Mode Map</span></label>
                                <input type="text" name="teachingMode" defaultValue={editingTutor.teachingMode} className="input input-bordered" required />
                            </div>
                            <div className="md:col-span-2 modal-action">
                                <button type="submit" className="btn btn-success text-white">Save Database Changes</button>
                                <button type="button" onClick={() => setEditingTutor(null)} className="btn btn-ghost">Dismiss</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTutors;


