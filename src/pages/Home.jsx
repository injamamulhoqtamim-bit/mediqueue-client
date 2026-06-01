import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

// online images for the carousel slides and the tutors grid (placeholders for now)
const studentGroupImg = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop"; 
const digitalCalendarImg = "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1468&auto=format&fit=crop"; 
const credentialsImg = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop"; 

const Home = () => {
    useDocumentTitle('Home - Premium Learning Network');
    const [topTutors, setTopTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Query database fetching data passing structural parameter limit=6
        axios.get('https://mediqueue-server-zl2f.onrender.com/tutors?limit=6') 
            .then(res => {
                setTopTutors(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-12 md:space-y-16 pb-12 bg-base-100 text-base-content overflow-hidden">
            {/* 1. Banner Section (Carousel with 3 Meaningful Slides and Pictures) */}
            <div className="carousel w-full h-[50vh] md:h-[60vh] relative shadow-lg overflow-hidden">
                
                {/* Slide 1 - Medical/Science Students */}
                <div id="slide1" className="carousel-item relative w-full h-full">
                    <img src={studentGroupImg} alt="Students collaborating" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4 md:p-6 text-white">
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 px-2">Empower Your Academic Journey</h1>
                        <p className="text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-4 hidden sm:block">Connect instantly with validated medical and science instructors mapped to your specific time zones without manual conflict overheads.</p>
                        <Link to="/tutors" className="btn btn-primary btn-sm md:btn-md px-6 md:px-8 font-bold">Browse Live Tutors</Link>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle btn-sm md:btn-md btn-ghost opacity-70 hover:opacity-100 text-white">❮</a> 
                        <a href="#slide2" className="btn btn-circle btn-sm md:btn-md btn-ghost opacity-70 hover:opacity-100 text-white">❯</a>
                    </div>
                </div> 

                {/* Slide 2 - Scheduling/Calendar Interface */}
                <div id="slide2" className="carousel-item relative w-full h-full">
                    <img src={digitalCalendarImg} alt="Digital scheduling calendar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4 md:p-6 text-white">
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 px-2">Eliminate Manual Scheduling</h1>
                        <p className="text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-4 hidden sm:block">Find available tutors and reserve your preferred learning slot in seconds.</p> 
                        <Link to="/tutors" className="btn btn-primary btn-sm md:btn-md px-6 md:px-8 font-bold">Reserve Now</Link> 
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle btn-sm md:btn-md btn-ghost opacity-70 hover:opacity-100 text-white">❮</a> 
                        <a href="#slide3" className="btn btn-circle btn-sm md:btn-md btn-ghost opacity-70 hover:opacity-100 text-white">❯</a> 
                    </div>
                </div> 

                {/* Slide 3 - Education/Learning Environment */}
                <div id="slide3" className="carousel-item relative w-full h-full">
                    <img src={credentialsImg} alt="Verified tutor credentials grid" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4 md:p-6 text-white">
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 px-2">Verified Credentials Architecture</h1>
                        <p className="text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-4 hidden sm:block">Discover tutors from different subjects and choose the perfect mentor.</p> 
                        <Link to="/tutors" className="btn btn-primary btn-sm md:btn-md px-6 md:px-8 font-bold">Explore Tutors</Link>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2"> 
                        <a href="#slide2" className="btn btn-circle btn-sm md:btn-md btn-ghost opacity-70 hover:opacity-100 text-white">❮</a>
                        <a href="#slide1" className="btn btn-circle btn-sm md:btn-md btn-ghost opacity-70 hover:opacity-100 text-white">❯</a> 
                    </div>
                </div>
            </div>

            {/* 2. Available Tutors Grid Area */}
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Featured Domain Experts</h2>
                <p className="text-center text-gray-500 max-w-md mx-auto mb-8 text-sm md:text-base">Handpicked certified listings showing active time configurations and tracking capacity limits metrics.</p>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {topTutors.map(tutor => (
                            <div key={tutor._id} className="card bg-base-200 shadow-xl border border-base-300 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
                                <figure className="px-4 pt-4 md:px-6 md:pt-6">
                                    <img src={tutor.photo} alt={tutor.tutorName} className="rounded-xl h-44 md:h-48 w-full object-cover" />
                                </figure>
                                <div className="card-body p-5 md:p-6">
                                    <h3 className="card-title text-lg md:text-xl font-bold">{tutor.tutorName}</h3>
                                    <div className="flex justify-start my-1">
                                        <span className="badge badge-primary badge-sm md:badge-md">{tutor.subject}</span>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1"><strong>Timing:</strong> {tutor.availableDays}</p>
                                    <p className="text-sm md:text-base font-semibold text-primary mt-1">${tutor.hourlyFee}/Hour</p>
                                    <div className="card-actions mt-4">
                                        <Link to={`/tutors/${tutor._id}`} className="btn btn-primary btn-block btn-sm md:btn-md">Book Session</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Extra Meaningful Section A: System Operational Process Statistics */}
            <div className="bg-base-200 py-10 md:py-12 border-y border-base-300 text-base-content">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">Platform Operational Scale</h2>
                    <div className="stats shadow-xl w-full flex flex-col md:flex-row bg-base-100 divide-y md:divide-y-0 md:divide-x divide-base-300">
                        <div className="stat p-5 md:p-6">
                            <div className="stat-title text-xs md:text-sm font-medium text-gray-400">Total Validated Slots</div>
                            <div className="stat-value text-primary text-2xl md:text-4xl mt-1">14,240+</div>
                            <div className="stat-desc mt-1 text-xs">Real-time allocation metrics</div>
                        </div>
                        <div className="stat p-5 md:p-6">
                            <div className="stat-title text-xs md:text-sm font-medium text-gray-400">Conflict Mitigation Engine</div>
                            <div className="stat-value text-secondary text-2xl md:text-4xl mt-1">100%</div>
                            <div className="stat-desc mt-1 text-xs">Zero concurrent execution overlap</div>
                        </div>
                        <div className="stat p-5 md:p-6">
                            <div className="stat-title text-xs md:text-sm font-medium text-gray-400">Active Learning Institutions</div>
                            <div className="stat-value text-accent text-2xl md:text-4xl mt-1">480+</div>
                            <div className="stat-desc mt-1 text-xs">Global campus mapping access</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Extra Meaningful Section B: Student Integrity Testimonials */}
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">Student Performance Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="p-5 md:p-6 bg-base-200 shadow-md border-l-4 border-primary rounded-r-xl">
                        <p className="italic text-gray-600 text-sm md:text-base">"The absolute automation of matching available slots without standard timezone converter utilities reduced scheduling overhead cycles to practically zero. Immediate session validation codes rendered instantly."</p>
                        <h4 className="mt-4 font-bold text-base-content text-xs md:text-sm">— S. Chowdhury, Medical Student at DMC</h4>
                    </div>
                    <div className="p-5 md:p-6 bg-base-200 shadow-md border-l-4 border-secondary rounded-r-xl">
                        <p className="italic text-gray-600 text-sm md:text-base">"Excellent interface execution layer. The live filtering modules allowed narrow structural searching targeting specific session start dates seamlessly. Dynamic loading components are remarkably fast."</p>
                        <h4 className="mt-4 font-bold text-base-content text-xs md:text-sm">— T. Ahmed, Applied Biochemist Undergrad</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;