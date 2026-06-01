import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

const TutorDetails = () => {
  useDocumentTitle('Tutor Details');

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [tutor, setTutor] = useState(null);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tutors/${id}`)
      .then((res) => {
        setTutor(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Tutor not found');
      });
  }, [id]);

 const handleBooking = async (e) => {
  e.preventDefault();

  try {

    const bookingData = {
      tutorId: tutor._id,
      tutorName: tutor.tutorName,
      studentName: user?.name,
      studentEmail: user?.email,
      phone,
      status: "booked",
      bookingDate: new Date()
    };

    const res = await axios.post(
      "https://mediqueue-server-zl2f.onrender.com/bookings",
      bookingData
    );

    if (res.data.insertedId) {

      toast.success(
        "Session booked successfully!"
      );

      setPhone('');

    }

  } catch (error) {

    console.error(error);

    toast.error(
      "Booking failed"
    );

  }
};

  if (!tutor) {
    return (
      <div className="text-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  console.log("Tutor Data:", tutor);
console.log("User Data:", user);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 border">

        <img
  src={tutor.photo}
  alt={tutor.tutorName}
  className="w-full h-[500px] object-cover object-top rounded-xl mb-6"
/>

        <h2 className="text-3xl font-bold mb-3">
          {tutor.tutorName}
        </h2>

        <div className="badge badge-primary mb-4">
          {tutor.subject}
        </div>

        <div className="space-y-2 mb-6">
          <p>
            <strong>Institution:</strong>{' '}
            {tutor.institution}
          </p>

          <p>
            <strong>Location:</strong>{' '}
            {tutor.location}
          </p>

          <p>
            <strong>Teaching Mode:</strong>{' '}
            {tutor.teachingMode}
          </p>

          <p>
            <strong>Available:</strong>{' '}
            {tutor.availableDays}
          </p>

          <p>
            <strong>Hourly Fee:</strong> $
            {tutor.hourlyFee}
          </p>

          <p>
            <strong>Total Slots:</strong>{' '}
            {tutor.totalSlot}
          </p>

          <p>
            <strong>Session Start:</strong>{' '}
            {tutor.sessionStartDate}
          </p>
        </div>

        <div className="divider">
          Book Session
        </div>

        <form
          onSubmit={handleBooking}
          className="space-y-4"
        >
          <input
            type="text"
            value={user?.name || ''}
            readOnly
            placeholder="Student Name"
            className="input input-bordered w-full"
          />

          <input
            type="email"
            value={user?.email || ''}
            readOnly
            placeholder="Student Email"
            className="input input-bordered w-full"
          />

          <input
            type="tel"
            required
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="01XXXXXXXXX"
            className="input input-bordered w-full"
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Confirm Booking
          </button>
        </form>

      </div>
    </div>
  );
};

export default TutorDetails;