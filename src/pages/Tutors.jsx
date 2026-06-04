import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

const Tutors = () => {
    useDocumentTitle('Browse Tutors');
    const [tutors, setTutors] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('latest'); // Default sorting
    const [loading, setLoading] = useState(true);

    // 
    const fetchTutors = () => {
        setLoading(true);
        axios.get(`https://mediqueue-server-zl2f.onrender.com/tutors?search=${search}`)
            .then(res => {
                setTutors(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching tutors:", err);
                setLoading(false);
            });
    };

    // 
    useEffect(() => {
        fetchTutors();
    }, [search]);

    // 
    const getSortedTutors = () => {
        const tutorsCopy = [...tutors]; 
        
        if (sortBy === 'lowToHigh') {
            return tutorsCopy.sort((a, b) => a.hourlyFee - b.hourlyFee);
        }
        if (sortBy === 'highToLow') {
            return tutorsCopy.sort((a, b) => b.hourlyFee - a.hourlyFee);
        }
        if (sortBy === 'mostBooked') {
            return tutorsCopy.sort((a, b) => (b.bookedCount || 0) - (a.bookedCount || 0));
        }
        return tutorsCopy;
    };

    const sortedTutors = getSortedTutors();

    return (
        <div className="container mx-auto px-4 py-6 md:py-12 max-w-7xl min-h-screen text-base-content dark:text-gray-100">
            {/* Header Section */}
            <div className="text-center mb-8 md:mb-12 animate-fade-in">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary dark:from-indigo-400 dark:to-pink-500 bg-clip-text text-transparent mb-3 leading-tight">
                    Find Your Perfect Tutor
                </h2>
                <p className="text-base-content/70 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                    Discover expert tutors tailored to your schedule and learning goals.
                </p>
            </div>
            
            {/* Search and Sort Panel */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch md:items-end justify-center bg-base-200/60 dark:bg-slate-800/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg border border-base-300 dark:border-slate-700">
                
                {/* Search Field */}
                <div className="w-full md:w-3/5">
                    <label className="label py-1">
                        <span className="label-text font-semibold text-base-content/80 dark:text-gray-300 text-sm sm:text-base">Search by Name</span>
                    </label>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="e.g. John Doe..." 
                            className="input input-bordered w-full focus:input-primary bg-base-100 dark:bg-slate-900 text-base-content dark:text-white border-base-300 dark:border-slate-600 transition-all duration-300 shadow-inner pl-10 text-sm h-11 sm:h-12"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Sorting Dropdown */}
                <div className="w-full md:w-2/5">
                    <label className="label py-1">
                        <span className="label-text font-semibold text-base-content/80 dark:text-gray-300 text-sm sm:text-base">Sort Tutors</span>
                    </label>
                    <select 
                        className="select select-bordered w-full focus:select-primary bg-base-100 dark:bg-slate-900 text-base-content dark:text-white border-base-300 dark:border-slate-600 transition-all duration-300 text-sm h-11 sm:h-12 min-h-[44px]"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="latest">Sort: Latest first</option>
                        <option value="lowToHigh">Price: Low to high</option>
                        <option value="highToLow">Price: High to low</option>
                        <option value="mostBooked">Most booked</option>
                    </select>
                </div>
            </div>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center my-24">
                    <span className="loading loading-spinner loading-lg text-primary dark:text-indigo-400"></span>
                </div>
            ) : (
                /* Card Grid System - Responsive Breakpoints Improved */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {sortedTutors.map(tutor => (
                        <div 
                            key={tutor._id} 
                            className="card bg-base-100 dark:bg-slate-800 shadow-md hover:shadow-2xl border border-base-200/80 dark:border-slate-700/60 flex flex-col justify-between transition-all duration-500 ease-out transform hover:-translate-y-1 sm:hover:-translate-y-2 group overflow-hidden rounded-2xl"
                        >
                            {/* Image Section */}
                            <figure className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3]">
                                <img 
                                    src={tutor.photo} 
                                    alt={tutor.tutorName} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                                <div className="absolute top-3 right-3 sm:top-4 right-4">
                                    <span className="badge badge-secondary font-semibold p-2.5 sm:p-3 text-xs sm:text-sm shadow-md backdrop-blur-sm bg-secondary/90 dark:bg-pink-600/90 dark:text-white border-none">
                                        {tutor.subject}
                                    </span>
                                </div>
                            </figure>

                            {/* Card Body */}
                            <div className="card-body p-5 sm:p-6 text-base-content dark:text-gray-200">
                                <h3 className="card-title text-xl sm:text-2xl font-bold group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-1">
                                    {tutor.tutorName}
                                </h3>
                                
                                <p className="text-xs sm:text-sm text-base-content/70 dark:text-gray-400 mt-1 flex items-center gap-1 line-clamp-1">
                                    <span className="font-semibold text-base-content dark:text-white">Institution:</span> {tutor.institution}
                                </p>

                                <div className="divider my-2 opacity-50 dark:opacity-20"></div>

                                {/* Fee & Slots container */}
                                <div className="flex justify-between items-center mt-2 gap-2">
                                    {/* Monthly Fee */}
                                    <div className="min-w-0">
                                        <p className="text-[10px] sm:text-xs text-base-content/50 dark:text-gray-400 uppercase tracking-wider font-semibold truncate">Monthly Fee</p>
                                        <p className="text-lg sm:text-xl font-extrabold text-primary dark:text-indigo-400 truncate">
                                            ৳ {tutor.hourlyFee} <span className="text-[10px] sm:text-xs font-normal text-base-content/60 dark:text-gray-400">BDT</span>
                                        </p>
                                    </div>
                                    {/* Available Slots */}
                                    <div className="text-right min-w-0">
                                        <p className="text-[10px] sm:text-xs text-base-content/50 dark:text-gray-400 uppercase tracking-wider font-semibold truncate">Available Slots</p>
                                        <p className={`text-base sm:text-lg font-bold truncate ${tutor.totalSlot > 0 ? 'text-success dark:text-emerald-400' : 'text-error dark:text-rose-400'}`}>
                                            {tutor.totalSlot} slots
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="card-actions mt-5 sm:mt-6">
                                    <Link 
                                        to={`/tutors/${tutor._id}`} 
                                        className="btn btn-primary dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white border-none btn-block transition-all duration-300 group-hover:btn-active shadow-md text-sm h-10 sm:h-12 min-h-[40px]"
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
            {!loading && sortedTutors.length === 0 && (
                <div className="text-center py-12 sm:py-16 bg-base-200/30 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-base-300 dark:border-slate-700 px-4">
                    <p className="text-lg sm:text-xl text-base-content/60 dark:text-gray-400 font-medium">No tutors found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Tutors;