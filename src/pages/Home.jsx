import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import axios from 'axios';

// 🎨 Bangladeshi / South Asian Teachers & Studying Vibe Images
const studentGroupImg = "https://www.dhakatutors.com/slider/ii2.jpg"; 
const digitalCalendarImg = "https://youthtuitioncenter.com/wp-content/uploads/2025/12/home_tutor.jpg";  
const credentialsImg = "https://content.jdmagicbox.com/v2/comp/chennai/c2/044pxx44.xx44.211130032512.t8c2/catalogue/home-shiksha-thoraipakkam-chennai-home-tutors-pmoz6uaj1l.jpg"; 

const subjectStyles = {
    "Mathematics": { bg: "bg-blue-100 text-blue-800 border-blue-200", cardBorder: "hover:border-blue-400" },
    "English": { bg: "bg-purple-100 text-purple-800 border-purple-200", cardBorder: "hover:border-purple-400" },
    "Physics": { bg: "bg-indigo-100 text-indigo-800 border-indigo-200", cardBorder: "hover:border-indigo-400" },
    "Chemistry": { bg: "bg-teal-100 text-teal-800 border-teal-200", cardBorder: "hover:border-teal-400" },
    "Biology": { bg: "bg-green-100 text-green-800 border-green-200", cardBorder: "hover:border-green-400" },
    "Bangla": { bg: "bg-emerald-100 text-emerald-800 border-emerald-200", cardBorder: "hover:border-emerald-400" },
    "History": { bg: "bg-amber-100 text-amber-800 border-amber-200", cardBorder: "hover:border-amber-400" },
    "Geography": { bg: "bg-orange-100 text-orange-800 border-orange-200", cardBorder: "hover:border-orange-400" },
    "Bio-Chemistry": { bg: "bg-pink-100 text-pink-800 border-pink-200", cardBorder: "hover:border-pink-400" },
    "Computer Science": { bg: "bg-rose-100 text-rose-800 border-rose-200", cardBorder: "hover:border-rose-400" },
    "default": { bg: "bg-gray-100 text-gray-800 border-gray-200", cardBorder: "hover:border-primary" }
};

const Home = () => {
    useDocumentTitle('Home - Premium Learning Network');
    const [topTutors, setTopTutors] = useState([]);
    const [totalTutorsCount, setTotalTutorsCount] = useState(0); 
    const [loading, setLoading] = useState(true);
    const gridRef = useRef(null);

    // 🔄 Slider State Control
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;
    const [isHovered, setIsHovered] = useState(false);

    const testimonials = [
        { id: 1, text: "The absolute automation of matching available slots reduced scheduling overhead cycles to practically zero. Immediate session validation codes rendered instantly.", author: "S. Chowdhury, Medical Student at DMC", border: "border-primary" },
        { id: 2, text: "Excellent interface execution layer. The live filtering modules allowed narrow structural searching targeting specific session start dates seamlessly.", author: "T. Ahmed, Applied Biochemist Undergrad", border: "border-secondary" },
        { id: 3, text: "Finding an organic chemistry mentor late at night was never this easy. The time-zone auto mapping works like magic with zero configuration required.", author: "N. Sultana, Pharmacy Student at DU", border: "border-accent" },
        { id: 4, text: "Highly structured validation platform. I managed to book a bio-statistics crash course within 2 minutes. Peer-to-peer tutoring efficiency at its best.", author: "R. Hasan, Public Health Major", border: "border-info" },
        { id: 5, text: "As an engineering undergrad, timing conflict was my biggest nightmare. This platform completely bypasses double-booking system bugs.", author: "A. Rahman, BUET Student", border: "border-success" },
        { id: 6, text: "The response metric from domain mentors is lightning fast. No back-and-forth emails, just instant classroom link generations.", author: "F. Khan, Genetic Engineering Student", border: "border-warning" },
        { id: 7, text: "Amazing deployment of filtering tools. Sorted by monthly fees and institutions to find my ideal anatomy coach instantly.", author: "M. Islam, First Year MBBS", border: "border-error" },
        { id: 8, text: "The customer service system and active validation parameters provide high trust layers. Highly secure login and instant session locks.", author: "Z. Akter, Computer Science Major", border: "border-primary" },
        { id: 9, text: "Incredible UX architecture. The cards show exact tutor availability data updates in real-time. Saved weeks of manual searching.", author: "K. Al-Hadi, Biochemistry Researcher", border: "border-secondary" },
        { id: 10, text: "Peer-to-peer knowledge mapping done perfectly. Learned complex quantum mechanics equations easily in a single custom scheduled session.", author: "S. Jaman, Physics Undergraduate", border: "border-accent" }
    ];

    // ⚡ Carousel Auto-play Logic
    useEffect(() => {
        if (isHovered) return; 

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        }, 4000); 

        return () => clearInterval(interval);
    }, [isHovered]);

    useEffect(() => {
        axios.get('https://mediqueue-server-zl2f.onrender.com/tutors?limit=6') 
            .then(res => {
                setTopTutors(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        axios.get('https://mediqueue-server-zl2f.onrender.com/tutors')
            .then(res => {
                setTotalTutorsCount(res.data.length); 
            })
            .catch(err => console.log("Error counting tutors:", err));
    }, []);

    useEffect(() => {
        if (loading || topTutors.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('opacity-0', 'translate-y-12');
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                    }
                });
            },
            { threshold: 0.02 }
        );

        const cards = gridRef.current?.querySelectorAll('.scroll-animate-card');
        cards?.forEach((card) => observer.observe(card));

        return () => cards?.forEach((card) => observer.unobserve(card));
    }, [loading, topTutors]);

    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    const nextSlide = () => setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

    return (
        <div className="space-y-10 md:space-y-16 pb-12 bg-base-100 text-base-content overflow-hidden relative w-full">
            
            {/* 1. Fixed Banner Section with Hardware Accelerated Slide Effect */}
            <div 
                className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] shadow-md overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Carousel Wrapper */}
                <div 
                    className="flex w-full h-full transition-transform duration-700 ease-in-out will-change-transform"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {/* Slide 1 */}
                    <div className="w-full h-full flex-shrink-0 relative">
                        <img src={studentGroupImg} alt="Bangladeshi Teacher Session" className="w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 bg-black/65 flex flex-col justify-center items-center text-center p-4 sm:p-6 text-white">
                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 px-2 max-w-4xl leading-tight">Empower Your Academic Journey</h1>
                            <p className="text-[11px] sm:text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-2 opacity-90 leading-relaxed max-sm:line-clamp-3">Connect instantly with validated medical and science instructors mapped to your specific time zones without manual conflict overheads.</p>
                            <Link to="/tutors" className="btn btn-primary btn-xs sm:btn-sm md:btn-md px-4 sm:px-6 font-bold h-auto py-2 sm:py-0">Browse Live Tutors</Link>
                        </div>
                    </div> 

                    {/* Slide 2 */}
                    <div className="w-full h-full flex-shrink-0 relative">
                        <img src={digitalCalendarImg} alt="Online Mentorship Setup" className="w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 bg-black/65 flex flex-col justify-center items-center text-center p-4 sm:p-6 text-white">
                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 px-2 max-w-4xl leading-tight">Eliminate Manual Scheduling</h1>
                            <p className="text-[11px] sm:text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-2 opacity-90 leading-relaxed max-sm:line-clamp-3">Find available tutors and reserve your preferred learning slot in seconds.</p> 
                            <Link to="/tutors" className="btn btn-primary btn-xs sm:btn-sm md:btn-md px-4 sm:px-6 font-bold h-auto py-2 sm:py-0">Reserve Now</Link> 
                        </div>
                    </div> 

                    {/* Slide 3 */}
                    <div className="w-full h-full flex-shrink-0 relative">
                        <img src={credentialsImg} alt="Classroom Teacher Guidance" className="w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 bg-black/65 flex flex-col justify-center items-center text-center p-4 sm:p-6 text-white">
                            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 px-2 max-w-4xl leading-tight">Verified Credentials Architecture</h1>
                            <p className="text-[11px] sm:text-sm md:text-lg max-w-2xl mb-4 md:mb-6 px-2 opacity-90 leading-relaxed max-sm:line-clamp-3">Discover tutors from different subjects and choose the perfect mentor.</p> 
                            <Link to="/tutors" className="btn btn-primary btn-xs sm:btn-sm md:btn-md px-4 sm:px-6 font-bold h-auto py-2 sm:py-0">Explore Tutors</Link>
                        </div>
                    </div>
                </div>

                {/* Left/Right Navigation Arrows (Hidden on Extra Small Screens for better UX) */}
                <div className="absolute hidden sm:flex justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2 z-20">
                    <button onClick={prevSlide} className="btn btn-circle btn-xs md:btn-md btn-ghost bg-black/30 text-white hover:bg-opacity-60 transition-colors">❮</button> 
                    <button onClick={nextSlide} className="btn btn-circle btn-xs md:btn-md btn-ghost bg-black/30 text-white hover:bg-opacity-60 transition-colors">❯</button>
                </div>

                {/* Indicators dots */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
                    {[...Array(totalSlides)].map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setCurrentSlide(i)} 
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${currentSlide === i ? 'bg-primary w-3 sm:w-4' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* 2. Available Tutors Grid Area */}
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3">Featured Domain Experts</h2>
                
                {/* 🔄 Centered Layout Container */}
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 gap-3 sm:gap-4 px-2">
                    <p className="text-gray-500 text-xs sm:text-sm md:text-base mx-auto leading-relaxed">
                        Handpicked certified listings showing active time configurations and tracking capacity limits metrics.
                    </p>
                    <div className="flex-shrink-0">
                        <div className="stats shadow-md bg-primary text-primary-content rounded-full px-4 sm:px-5 py-1 sm:py-1.5 flex items-center gap-1.5 sm:gap-2 border border-primary/20 animate-pulse">
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Active Tutors:</span>
                            <span className="text-sm sm:text-lg font-extrabold">{totalTutorsCount}</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : (
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                        {topTutors.map((tutor, index) => {
                            const currentStyle = subjectStyles[tutor.subject] || subjectStyles["default"];

                            return (
                                <div 
                                    key={tutor._id} 
                                    className={`scroll-animate-card opacity-0 translate-y-12 transform transition-all duration-700 ease-out card bg-base-200 shadow-lg border border-transparent ${currentStyle.cardBorder} flex flex-col justify-between hover:scale-[1.01] sm:hover:scale-[1.02]`}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    <figure className="px-3 pt-3 sm:px-4 sm:pt-4">
                                        <img src={tutor.photo} alt={tutor.tutorName} className="rounded-xl h-44 sm:h-48 w-full object-cover" />
                                    </figure>
                                    <div className="card-body p-4 sm:p-5">
                                        <h3 className="card-title text-base sm:text-lg font-bold line-clamp-1">{tutor.tutorName}</h3>
                                        
                                        <div className="flex justify-start my-1">
                                            <span className={`badge border text-xs font-semibold px-2.5 py-0.5 rounded-md ${currentStyle.bg}`}>
                                                {tutor.subject}
                                            </span>
                                        </div>
                                        
                                        <p className="text-xs text-gray-500 mt-1"><strong>Timing:</strong> {tutor.availableDays}</p>
                                        <p className="text-sm sm:text-base font-bold text-primary mt-1">৳ {tutor.hourlyFee} BDT / Month</p>
                                        <div className="card-actions mt-4">
                                            <Link to={`/tutors/${tutor._id}`} className="btn btn-primary btn-block btn-sm sm:btn-md font-semibold">Book Session</Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 3. Extra Meaningful Section A */}
            <div className="bg-base-200 py-8 md:py-14 border-y border-base-300 text-base-content w-full">
                <div className="container mx-auto px-4 sm:px-6 text-center max-w-7xl">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-10">Platform Operational Scale</h2>
                    <div className="stats stats-vertical sm:stats-horizontal shadow-lg w-full max-w-4xl mx-auto bg-base-100 divide-y sm:divide-y-0 sm:divide-x divide-base-300 rounded-2xl overflow-hidden">
                        <div className="stat p-4 sm:p-6 md:p-8">
                            <div className="stat-title text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">Total Validated Slots</div>
                            <div className="stat-value text-primary text-xl sm:text-2xl md:text-4xl mt-1">14,240+</div>
                            <div className="stat-desc mt-1 text-[11px]">Real-time allocation metrics</div>
                        </div>
                        <div className="stat p-4 sm:p-6 md:p-8">
                            <div className="stat-title text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">Conflict Mitigation Engine</div>
                            <div className="stat-value text-secondary text-xl sm:text-2xl md:text-4xl mt-1">100%</div>
                            <div className="stat-desc mt-1 text-[11px]">Zero execution overlap</div>
                        </div>
                        <div className="stat p-4 sm:p-6 md:p-8">
                            <div className="stat-title text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">Active Learning Institutions</div>
                            <div className="stat-value text-accent text-xl sm:text-2xl md:text-4xl mt-1">480+</div>
                            <div className="stat-desc mt-1 text-[11px]">Global campus access</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Extra Meaningful Section B */}
            <div className="w-full overflow-hidden py-4 bg-base-100">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">Student Performance Feedback</h2>
                
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

                    <div className="marquee-inner-loop gap-4 sm:gap-6 px-2 sm:px-4">
                        {testimonials.map((item) => (
                            <div 
                                key={`first-${item.id}`} 
                                className={`w-[260px] sm:w-[350px] md:w-[400px] flex-shrink-0 p-4 sm:p-6 bg-base-200 shadow-md border-l-4 ${item.border} rounded-r-xl flex flex-col justify-between transition-all duration-300 hover:bg-base-300`}
                            >
                                <p className="italic text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-4">"{item.text}"</p>
                                <h4 className="mt-3 sm:mt-4 font-bold text-base-content text-[11px] sm:text-sm tracking-wide truncate">— {item.author}</h4>
                            </div>
                        ))}

                        {testimonials.map((item) => (
                            <div 
                                key={`second-${item.id}`} 
                                className={`w-[260px] sm:w-[350px] md:w-[400px] flex-shrink-0 p-4 sm:p-6 bg-base-200 shadow-md border-l-4 ${item.border} rounded-r-xl flex flex-col justify-between transition-all duration-300 hover:bg-base-300`}
                            >
                                <p className="italic text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-4">"{item.text}"</p>
                                <h4 className="mt-3 sm:mt-4 font-bold text-base-content text-[11px] sm:text-sm tracking-wide truncate">— {item.author}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;