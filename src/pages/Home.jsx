import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

const studentGroupImg = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop"; 
const digitalCalendarImg = "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1468&auto=format&fit=crop"; 
const credentialsImg = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop"; 

const Home = () => {
    useDocumentTitle('Home - Premium Learning Network');
    const [topTutors, setTopTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const gridRef = useRef(null);

    const testimonials = [
        { id: 1, text: "The absolute automation of matching available slots reduced scheduling overhead cycles to practically zero. Immediate session validation codes rendered instantly.", author: "S. Chowdhury, Medical Student at DMC", border: "border-primary" },
        { id: 2, text: "Excellent interface execution layer. The live filtering modules allowed narrow structural searching targeting specific session start dates seamlessly.", author: "T. Ahmed, Applied Biochemist Undergrad", border: "border-secondary" },
        { id: 3, text: "Finding an organic chemistry mentor late at night was never this easy. The time-zone auto mapping works like magic with zero configuration required.", author: "N. Sultana, Pharmacy Student at DU", border: "border-accent" },
        { id: 4, text: "Highly structured validation platform. I managed to book a bio-statistics crash course within 2 minutes. Peer-to-peer tutoring efficiency at its best.", author: "R. Hasan, Public Health Major", border: "border-info" },
        { id: 5, text: "As an engineering undergrad, timing conflict was my biggest nightmare. This platform completely bypasses double-booking system bugs.", author: "A. Rahman, BUET Student", border: "border-success" },
        { id: 6, text: "The response metric from domain mentors is lightning fast. No back-and-forth emails, just instant classroom link generations.", author: "F. Khan, Genetic Engineering Student", border: "border-warning" },
        { id: 7, text: "Amazing deployment of filtering tools. Sorted by hourly rates and institutions to find my ideal anatomy coach instantly.", author: "M. Islam, First Year MBBS", border: "border-error" },
        { id: 8, text: "The customer service system and active validation parameters provide high trust layers. Highly secure login and instant session locks.", author: "Z. Akter, Computer Science Major", border: "border-primary" },
        { id: 9, text: "Incredible UX architecture. The cards show exact tutor availability data updates in real-time. Saved weeks of manual searching.", author: "K. Al-Hadi, Biochemistry Researcher", border: "border-secondary" },
        { id: 10, text: "Peer-to-peer knowledge mapping done perfectly. Learned complex quantum mechanics equations easily in a single custom scheduled session.", author: "S. Jaman, Physics Undergraduate", border: "border-accent" }
    ];

    useEffect(() => {
        axios.get('https://mediqueue-server-zl2f.onrender.com/tutors?limit=6') 
            .then(res => {
                setTopTutors(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // 🚀 স্ক্রল অ্যানিমেশন ডিটেক্টর (Intersection Observer)
    useEffect(() => {
        if (loading || topTutors.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // কার্ড স্ক্রিনে আসলে এই ক্লাসগুলো যোগ হবে
                        entry.target.classList.remove('opacity-0', 'translate-y-16');
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                    }
                });
            },
            { threshold: 0.05 } // ছোট স্ক্রিনে স্মুথ অভিজ্ঞতার জন্য থ্রেশহোল্ড সামান্য অপ্টিমাইজ করা হয়েছে
        );

        const cards = gridRef.current?.querySelectorAll('.scroll-animate-card');
        cards?.forEach((card) => observer.observe(card));

        return () => cards?.forEach((card) => observer.unobserve(card));
    }, [loading, topTutors]);

    return (
        <div className="space-y-12 md:space-y-20 pb-12 bg-base-100 text-base-content overflow-hidden">
            {/* 1. Banner Section */}
            <div className="carousel w-full h-[55vh] md:h-[65vh] relative shadow-lg overflow-hidden">
                <div id="slide1" className="carousel-item relative w-full h-full">
                    <img src={studentGroupImg} alt="Students collaborating" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-65 flex flex-col justify-center items-center text-center p-4 md:p-6 text-white">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 px-2 max-w-4xl">Empower Your Academic Journey</h1>
                        <p className="text-xs sm:text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-4 line-clamp-3 sm:line-clamp-none opacity-90">Connect instantly with validated medical and science instructors mapped to your specific time zones without manual conflict overheads.</p>
                        <Link to="/tutors" className="btn btn-primary btn-sm md:btn-md px-6 md:px-8 font-bold">Browse Live Tutors</Link>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2 z-10">
                        <a href="#slide3" className="btn btn-circle btn-xs sm:btn-sm md:btn-md btn-ghost bg-black bg-opacity-20 text-white hover:bg-opacity-40">❮</a> 
                        <a href="#slide2" className="btn btn-circle btn-xs sm:btn-sm md:btn-md btn-ghost bg-black bg-opacity-20 text-white hover:bg-opacity-40">❯</a>
                    </div>
                </div> 

                <div id="slide2" className="carousel-item relative w-full h-full">
                    <img src={digitalCalendarImg} alt="Digital scheduling calendar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-65 flex flex-col justify-center items-center text-center p-4 md:p-6 text-white">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 px-2 max-w-4xl">Eliminate Manual Scheduling</h1>
                        <p className="text-xs sm:text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-4 line-clamp-3 sm:line-clamp-none opacity-90">Find available tutors and reserve your preferred learning slot in seconds.</p> 
                        <Link to="/tutors" className="btn btn-primary btn-sm md:btn-md px-6 md:px-8 font-bold">Reserve Now</Link> 
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2 z-10">
                        <a href="#slide1" className="btn btn-circle btn-xs sm:btn-sm md:btn-md btn-ghost bg-black bg-opacity-20 text-white hover:bg-opacity-40">❮</a> 
                        <a href="#slide3" className="btn btn-circle btn-xs sm:btn-sm md:btn-md btn-ghost bg-black bg-opacity-20 text-white hover:bg-opacity-40">❯</a> 
                    </div>
                </div> 

                <div id="slide3" className="carousel-item relative w-full h-full">
                    <img src={credentialsImg} alt="Verified tutor credentials grid" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-65 flex flex-col justify-center items-center text-center p-4 md:p-6 text-white">
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 px-2 max-w-4xl">Verified Credentials Architecture</h1>
                        <p className="text-xs sm:text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-4 line-clamp-3 sm:line-clamp-none opacity-90">Discover tutors from different subjects and choose the perfect mentor.</p> 
                        <Link to="/tutors" className="btn btn-primary btn-sm md:btn-md px-6 md:px-8 font-bold">Explore Tutors</Link>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2 z-10"> 
                        <a href="#slide2" className="btn btn-circle btn-xs sm:btn-sm md:btn-md btn-ghost bg-black bg-opacity-20 text-white hover:bg-opacity-40">❮</a>
                        <a href="#slide1" className="btn btn-circle btn-xs sm:btn-sm md:btn-md btn-ghost bg-black bg-opacity-20 text-white hover:bg-opacity-40">❯</a> 
                    </div>
                </div>
            </div>

            {/* 2. Available Tutors Grid Area (With Scroll Animation) */}
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Featured Domain Experts</h2>
                <p className="text-center text-gray-500 max-w-md mx-auto mb-8 text-xs sm:text-sm md:text-base px-2">Handpicked certified listings showing active time configurations and tracking capacity limits metrics.</p>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : (
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {topTutors.map((tutor, index) => (
                            <div 
                                key={tutor._id} 
                                // 🌟 প্রাথমিক অবস্হায় opacity-0 এবং নিচ থেকে নামানোর জন্য translate-y-16 দেওয়া হয়েছে
                                className="scroll-animate-card opacity-0 translate-y-16 transform transition-all duration-700 ease-out card bg-base-200 shadow-xl border border-base-300 flex flex-col justify-between hover:scale-[1.02]"
                                // ⏱️ একটি কার্ডের পর আরেকটি কার্ড আসার জন্য স্ট্যাগার্ড ডিলে (Staggered Delay)
                                style={{ transitionDelay: `${index * 80}ms` }}
                            >
                                <figure className="px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 md:pt-6">
                                    <img src={tutor.photo} alt={tutor.tutorName} className="rounded-xl h-40 sm:h-44 md:h-48 w-full object-cover" />
                                </figure>
                                <div className="card-body p-4 sm:p-5 md:p-6">
                                    <h3 className="card-title text-base sm:text-lg md:text-xl font-bold line-clamp-1">{tutor.tutorName}</h3>
                                    <div className="flex justify-start my-1">
                                        <span className="badge badge-primary badge-xs sm:badge-sm md:badge-md font-medium">{tutor.subject}</span>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1"><strong>Timing:</strong> {tutor.availableDays}</p>
                                    <p className="text-sm md:text-base font-bold text-primary mt-1">${tutor.hourlyFee}/Hour</p>
                                    <div className="card-actions mt-4">
                                        <Link to={`/tutors/${tutor._id}`} className="btn btn-primary btn-block btn-sm md:btn-md font-semibold">Book Session</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Extra Meaningful Section A */}
            <div className="bg-base-200 py-10 md:py-16 border-y border-base-300 text-base-content">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Platform Operational Scale</h2>
                    <div className="stats stats-vertical md:stats-horizontal shadow-xl w-full max-w-5xl mx-auto bg-base-100 divide-y md:divide-y-0 md:divide-x divide-base-300">
                        <div className="stat p-5 sm:p-6 md:p-8">
                            <div className="stat-title text-xs sm:text-sm font-medium text-gray-400">Total Validated Slots</div>
                            <div className="stat-value text-primary text-2xl sm:text-3xl md:text-4xl mt-1">14,240+</div>
                            <div className="stat-desc mt-1 text-xs">Real-time allocation metrics</div>
                        </div>
                        <div className="stat p-5 sm:p-6 md:p-8">
                            <div className="stat-title text-xs sm:text-sm font-medium text-gray-400">Conflict Mitigation Engine</div>
                            <div className="stat-value text-secondary text-2xl sm:text-3xl md:text-4xl mt-1">100%</div>
                            <div className="stat-desc mt-1 text-xs">Zero concurrent execution overlap</div>
                        </div>
                        <div className="stat p-5 sm:p-6 md:p-8">
                            <div className="stat-title text-xs sm:text-sm font-medium text-gray-400">Active Learning Institutions</div>
                            <div className="stat-value text-accent text-2xl sm:text-3xl md:text-4xl mt-1">480+</div>
                            <div className="stat-desc mt-1 text-xs">Global campus mapping access</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Extra Meaningful Section B */}
            <div className="w-full overflow-hidden py-4 bg-base-100">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Student Performance Feedback</h2>
                
                <div className="relative w-full flex overflow-x-hidden group">
                    <style>{`
                        @keyframes marqueeFast {
                            0% { transform: translateX(0%); }
                            100% { transform: translateX(-50%); }
                        }
                        .marquee-inner-loop {
                            display: flex;
                            width: max-content;
                            animation: marqueeFast 35s linear infinite;
                        }
                        .group:hover .marquee-inner-loop,
                        .group:active .marquee-inner-loop {
                            animation-play-state: paused;
                        }
                    `}</style>

                    <div className="marquee-inner-loop gap-4 sm:gap-6 px-4">
                        {testimonials.map((item) => (
                            <div 
                                key={`first-${item.id}`} 
                                className={`w-[280px] sm:w-[350px] md:w-[400px] flex-shrink-0 p-5 md:p-6 bg-base-200 shadow-lg border-l-4 ${item.border} rounded-r-xl flex flex-col justify-between transition-all duration-300 hover:bg-base-300`}
                            >
                                <p className="italic text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none">"{item.text}"</p>
                                <h4 className="mt-4 font-bold text-base-content text-xs sm:text-sm tracking-wide truncate">— {item.author}</h4>
                            </div>
                        ))}

                        {testimonials.map((item) => (
                            <div 
                                key={`second-${item.id}`} 
                                className={`w-[280px] sm:w-[350px] md:w-[400px] flex-shrink-0 p-5 md:p-6 bg-base-200 shadow-lg border-l-4 ${item.border} rounded-r-xl flex flex-col justify-between transition-all duration-300 hover:bg-base-300`}
                            >
                                <p className="italic text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none">"{item.text}"</p>
                                <h4 className="mt-4 font-bold text-base-content text-xs sm:text-sm tracking-wide truncate">— {item.author}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;