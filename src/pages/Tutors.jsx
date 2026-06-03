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
        axios.get(`https://mediqueue-server-zl2f.onrender.com/tutors?search=${search}&startDate=${startDate}&endDate=${endDate}`)
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
        <div className="container mx-auto px-4 py-12 max-w-7xl min-h-screen text-base-content dark:text-gray-100">
            {/* Header Section */}
            <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary dark:from-indigo-400 dark:to-pink-500 bg-clip-text text-transparent mb-3">
                    Find Your Perfect Tutor
                </h2>
                <p className="text-base-content/70 dark:text-gray-400 text-lg">Discover expert tutors tailored to your schedule and learning goals.</p>
            </div>
            
            {/* Search and Date Filter Panel - ডার্ক মোডে ভিজিবিলিটি ফিক্স করা হয়েছে */}
            <form 
                onSubmit={handleSearchAndFilter} 
                className="flex flex-col lg:flex-row gap-4 mb-12 items-end justify-center bg-base-200/60 dark:bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-base-300 dark:border-slate-700"
            >
                <div className="w-full lg:w-2/5">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content/80 dark:text-gray-300">Search by Name</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="e.g. John Doe..." 
                        className="input input-bordered w-full focus:input-primary bg-base-100 dark:bg-slate-900 text-base-content dark:text-white border-base-300 dark:border-slate-600 transition-all duration-300 shadow-inner"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="w-full sm:w-1/2 lg:w-1/5">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content/80 dark:text-gray-300">From Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full focus:input-primary bg-base-100 dark:bg-slate-900 text-base-content dark:text-white border-base-300 dark:border-slate-600 transition-all duration-300 color-scheme-dark"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ colorScheme: 'dark light' }}
                    />
                </div>

                <div className="w-full sm:w-1/2 lg:w-1/5">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content/80 dark:text-gray-300">To Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full focus:input-primary bg-base-100 dark:bg-slate-900 text-base-content dark:text-white border-base-300 dark:border-slate-600 transition-all duration-300"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ colorScheme: 'dark light' }}
                    />
                </div>

                <button type="submit" className="btn btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white w-full lg:w-auto px-8 shadow-md hover:shadow-primary/30 transition-all duration-300">
                    Search & Filter
                </button>
            </form>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center my-24">
                    <span className="loading loading-spinner loading-lg text-primary dark:text-indigo-400"></span>
                </div>
            ) : (
                /* Card Grid System - ডার্ক থিম ম্যাচিং কার্ড */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutors.map(tutor => (
                        <div 
                            key={tutor._id} 
                            className="card bg-base-100 dark:bg-slate-800 shadow-md hover:shadow-2xl border border-base-200/80 dark:border-slate-700/60 flex flex-col justify-between transition-all duration-500 ease-out transform hover:-translate-y-2 group overflow-hidden"
                        >
                            {/* Image Section */}
                            <figure className="relative overflow-hidden aspect-[4/3]">
                                <img 
                                    src={tutor.photo} 
                                    alt={tutor.tutorName} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="badge badge-secondary font-semibold p-3 shadow-md backdrop-blur-sm bg-secondary/90 dark:bg-pink-600/90 dark:text-white border-none">
                                        {tutor.subject}
                                    </span>
                                </div>
                            </figure>

                            {/* Card Body */}
                            <div className="card-body p-6 text-base-content dark:text-gray-200">
                                <h3 className="card-title text-2xl font-bold group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors duration-300">
                                    {tutor.tutorName}
                                </h3>
                                
                                <p className="text-sm text-base-content/70 dark:text-gray-400 mt-1 flex items-center gap-1">
                                    <span className="font-semibold text-base-content dark:text-white">Institution:</span> {tutor.institution}
                                </p>

                                <div className="divider my-2 opacity-50 dark:opacity-20"></div>

                                <div className="flex justify-between items-center mt-2">
                                    {/* Monthly Fee */}
                                    <div>
                                        <p className="text-xs text-base-content/50 dark:text-gray-400 uppercase tracking-wider font-semibold">Monthly Fee</p>
                                        <p className="text-xl font-extrabold text-primary dark:text-indigo-400">৳ {tutor.hourlyFee} <span className="text-xs font-normal text-base-content/60 dark:text-gray-400">BDT</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-base-content/50 dark:text-gray-400 uppercase tracking-wider font-semibold">Available Slots</p>
                                        <p className={`text-lg font-bold ${tutor.totalSlot > 0 ? 'text-success dark:text-emerald-400' : 'text-error dark:text-rose-400'}`}>
                                            {tutor.totalSlot} slots
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="card-actions mt-6">
                                    <Link 
                                        to={`/tutors/${tutor._id}`} 
                                        className="btn btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white border-none btn-block transition-all duration-300 group-hover:btn-active shadow-md"
                                    >
                                        Book Session
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && tutors.length === 0 && (
                <div className="text-center py-16 bg-base-200/30 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-base-300 dark:border-slate-700">
                    <p className="text-xl text-base-content/60 dark:text-gray-400 font-medium">No tutors found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Tutors;