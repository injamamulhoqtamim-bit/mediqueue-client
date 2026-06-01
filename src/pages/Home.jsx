import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

const Home = () => {
    useDocumentTitle('Home - Premium Learning Network');
    const [topTutors, setTopTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Query database fetching data passing structural parameter limit=6
        axios.get('http://localhost:5000/tutors?limit=6')
            .then(res => {
                setTopTutors(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-16 pb-12">
            {/* 1. Banner Section (Carousel with 3 Meaningful Slides) */}
            <div className="carousel w-full h-[60vh] relative shadow-lg">
                <div id="slide1" className="carousel-item relative w-full h-full bg-gradient-to-r from-teal-800 to-emerald-900 flex flex-col justify-center items-center text-center p-6 text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Empower Your Academic Journey</h1>
                    <p className="text-lg max-w-2xl mb-6">Connect instantly with validated medical and science instructors mapped to your specific time zones without manual conflict overheads.</p>
                    <Link to="/tutors" className="btn btn-primary px-8 font-bold">Browse Live Tutors</Link>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle opacity-50">❮</a> 
                        <a href="#slide2" className="btn btn-circle opacity-50">❯</a>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full h-full bg-gradient-to-r from-blue-900 to-indigo-950 flex flex-col justify-center items-center text-center p-6 text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Eliminate Manual Scheduling Blocks</h1>
                    <p className="text-lg max-w-2xl mb-6"> Find available tutors and reserve your preferred learning slot in seconds. </p> <Link to="/tutors" className="btn btn-primary px-8 font-bold" > Reserve Now </Link> 
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                     <a href="#slide1" className="btn btn-circle opacity-50">❮</a> 
                     <a href="#slide3" className="btn btn-circle opacity-50">❯</a> 
                     </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full h-full bg-gradient-to-r from-violet-950 to-purple-900 flex flex-col justify-center items-center text-center p-6 text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Verified Credentials Architecture</h1>
                   <p className="text-lg max-w-2xl mb-6"> Discover tutors from different subjects and choose the perfect mentor. </p> 
                   <Link to="/tutors" className="btn btn-primary px-8 font-bold" > Explore Tutors </Link>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"> 
                    <a href="#slide2" className="btn btn-circle opacity-50">❮</a>
                     <a href="#slide1" className="btn btn-circle opacity-50">❯</a> 
                     </div>
                </div>
            </div>

            {/* 2. Available Tutors Grid Area ($limit 6 layout cards display) */}
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Featured Domain Experts</h2>
                <p className="text-center text-gray-500 max-w-md mx-auto mb-10">Handpicked certified listings showing active time configurations and tracking capacity limits metrics.</p>

                {loading ? (
                    <div className="flex justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topTutors.map(tutor => (
                            <div key={tutor._id} className="card bg-base-100 shadow-xl border border-base-200 flex flex-col justify-between">
                                <figure className="px-6 pt-6">
                                    <img src={tutor.photo} alt={tutor.tutorName} className="rounded-xl h-48 w-full object-cover" />
                                </figure>
                                <div className="card-body">
                                    <h3 className="card-title text-xl font-bold">{tutor.tutorName}</h3>
                                    <span className="badge badge-primary">{tutor.subject}</span>
                                    <p className="text-sm text-gray-500 mt-2"><strong>Timing:</strong> {tutor.availableDays}</p>
                                    <p className="text-sm font-semibold text-primary mt-1">${tutor.hourlyFee}/Hour</p>
                                    <div className="card-actions mt-4">
                                        <Link to={`/tutors/${tutor._id}`} className="btn btn-primary btn-block">Book Session</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Extra Meaningful Section A: System Operational Process Statistics */}
            <div className="bg-base-200 py-12 border-y border-base-300">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-10">Platform Operational Scale</h2>
                    <div className="stats shadow-xl w-full grid grid-cols-1 md:grid-cols-3 bg-base-100">
                        <div className="stat p-6">
                            <div className="stat-title text-md font-medium text-gray-400">Total Validated Slots</div>
                            <div className="stat-value text-primary text-4xl mt-2">14,240+</div>
                            <div className="stat-desc mt-1">Real-time allocation metrics</div>
                        </div>
                        <div className="stat p-6">
                            <div className="stat-title text-md font-medium text-gray-400">Conflict Mitigation Engine</div>
                            <div className="stat-value text-secondary text-4xl mt-2">100%</div>
                            <div className="stat-desc mt-1">Zero concurrent execution overlap</div>
                        </div>
                        <div className="stat p-6">
                            <div className="stat-title text-md font-medium text-gray-400">Active Learning Institutions</div>
                            <div className="stat-value text-accent text-4xl mt-2">480+</div>
                            <div className="stat-desc mt-1">Global campus mapping access</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Extra Meaningful Section B: Student Integrity Testimonials */}
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-10">Student Performance Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-base-100 shadow-md border-l-4 border-primary rounded-r-xl">
                        <p className="italic text-gray-600">"The absolute automation of matching available slots without standard timezone converter utilities reduced scheduling overhead cycles to practically zero. Immediate session validation codes rendered instantly."</p>
                        <h4 className="mt-4 font-bold text-base-content text-sm">— S. Chowdhury, Medical Student at DMC</h4>
                    </div>
                    <div className="p-6 bg-base-100 shadow-md border-l-4 border-secondary rounded-r-xl">
                        <p className="italic text-gray-600">"Excellent interface execution layer. The live filtering modules allowed narrow structural searching targeting specific session start dates seamlessly. Dynamic loading components are remarkably fast."</p>
                        <h4 className="mt-4 font-bold text-base-content text-sm">— T. Ahmed, Applied Biochemist Undergrad</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;