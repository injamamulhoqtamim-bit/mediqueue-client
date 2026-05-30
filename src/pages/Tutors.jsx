import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

const Tutors = () => {
    useDocumentTitle('Browse Tutors');
    const [tutors, setTutors] = useState([]);
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchTutors = () => {
        setLoading(true);
        axios.get(`http://localhost:5000/tutors?search=${search}&startDate=${startDate}&endDate=${endDate}`)
            .then(res => {
                setTutors(res.data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTutors();
    }, []);

    const handleSearchAndFilter = (e) => {
        e.preventDefault();
        fetchTutors();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">All Available Tutors</h2>
            
            {/* Search and Date Filter Panel */}
            <form onSubmit={handleSearchAndFilter} className="flex flex-col md:flex-row gap-4 mb-8 justify-center bg-base-200 p-4 rounded-xl">
                <input 
                    type="text" 
                    placeholder="Search by Tutor Name..." 
                    className="input input-bordered w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input 
                    type="date" 
                    className="input input-bordered"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input 
                    type="date" 
                    className="input input-bordered"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search & Filter</button>
            </form>

            {loading ? (
                <div className="flex justify-center my-12"><span className="loading loading-spinner loading-lg"></span></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tutors.map(tutor => (
                        <div key={tutor._id} className="card bg-base-100 shadow-xl border border-base-200 flex flex-col justify-between">
                            <figure className="px-4 pt-4">
                                <img src={tutor.photo} alt={tutor.tutorName} className="rounded-xl h-48 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title text-xl font-bold">{tutor.tutorName}</h3>
                                <div className="badge badge-secondary">{tutor.subject}</div>
                                <p className="text-sm"><strong>Experience:</strong> {tutor.institution}</p>
                                <p className="text-sm"><strong>Hourly Rate:</strong> ${tutor.hourlyFee}/hr</p>
                                <p className="text-sm"><strong>Slots Remaining:</strong> {tutor.totalSlot}</p>
                                <div className="card-actions mt-4">
                                    <Link to={`/tutors/${tutor._id}`} className="btn btn-primary btn-block">Book Session</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tutors;