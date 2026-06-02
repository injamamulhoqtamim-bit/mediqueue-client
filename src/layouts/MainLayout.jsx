import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    // teacher student pictures for bacground
    const backgroundImages = [
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80", 
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80"  
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto slide images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    return (
        <div className="relative flex flex-col min-h-screen text-base-content font-sans antialiased bg-[#0A1828]">
            
            {/* image background*/}
            <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                {backgroundImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundImage: `url('${image}')` }}
                    />
                ))}
                
                {/* Dark overlay with blur effect */}
                <div className="absolute inset-0 bg-[#0A1828]/85 backdrop-blur-[2px]"></div>
            </div>

            {/* Header / Navigation bar */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-base-100/90 shadow-sm border-b border-base-200">
                <Navbar />
            </header>

            {/* Dynamic Middle Section Routing Entry View */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300">
                <Outlet />
            </main>

            {/* Premium Global Footer Structure */}
            <footer className="w-full bg-neutral text-neutral-content border-t border-neutral-focus shadow-2xl z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    
                    {/* Column 1: Services (Premium Educational Links Added) */}
                    <nav className="flex flex-col space-y-3">
                        <h6 className="footer-title text-primary uppercase font-bold tracking-wider opacity-100 mb-2 text-sm">
                            Learning Services
                        </h6> 
                        <a 
                            href="https://www.wolframalpha.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="link link-hover text-neutral-content/80 hover:text-primary transition-all duration-300 transform hover:translate-x-1"
                        >
                            Mathematics Portal
                        </a>
                        <a 
                            href="https://www.khanacademy.org/science/physics" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="link link-hover text-neutral-content/80 hover:text-primary transition-all duration-300 transform hover:translate-x-1"
                        >
                            Quantum Physics Lab
                        </a>
                        <a 
                            href="https://www.ncbi.nlm.nih.gov" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="link link-hover text-neutral-content/80 hover:text-primary transition-all duration-300 transform hover:translate-x-1"
                        >
                            Advanced Biochemistry
                        </a>
                        <a 
                            href="https:// www.w3schools.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="link link-hover text-neutral-content/80 hover:text-primary transition-all duration-300 transform hover:translate-x-1"
                        >
                            Computer Science Basic
                        </a>
                    </nav> 

                    {/* Column 2: Contact Info */}
                    <div className="flex flex-col space-y-3">
                        <h6 className="footer-title text-primary uppercase font-bold tracking-wider opacity-100 mb-2 text-sm">
                            Contact Info
                        </h6> 
                        <p className="text-neutral-content/80 text-sm flex items-center gap-2">
                            <span>Dhaka Division, Bangladesh</span>
                        </p>
                        <p className="text-neutral-content/80 text-sm">
                            <span className="font-medium text-white/90">Email:</span> support@teachersfinding.com
                        </p>
                        <p className="text-neutral-content/80 text-sm">
                            <span className="font-medium text-white/90">Phone:</span> +880 1234 56789
                        </p>
                    </div> 

                    {/* Column 3: Social Connects */}
                    <div className="flex flex-col space-y-4">
                        <h6 className="footer-title text-primary uppercase font-bold tracking-wider opacity-100 mb-1 text-sm">
                            Social Connects
                        </h6> 
                        <div className="flex gap-3">
                            <a 
                                href="https://x.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-content hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-300 shadow-md"
                                aria-label="X (formerly Twitter)"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                                </svg>
                            </a>
                            
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-content hover:bg-primary hover:text-primary-content hover:border-primary transition-all duration-300 shadow-md"
                                aria-label="LinkedIn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 4: Legal Architecture */}
                    <div className="flex flex-col space-y-3">
                        <h6 className="footer-title text-primary uppercase font-bold tracking-wider opacity-100 mb-2 text-sm">
                            Legal Architecture
                        </h6>
                        <p className="text-sm text-neutral-content/70 leading-relaxed">
                            Providing structured private tuition matching and advanced digital learning components seamlessly.
                        </p>
                    </div>
                </div>

                {/* Lower Footer: Copyright bar */}
                <div className="border-t border-white/5 bg-black/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                        <p className="text-xs text-neutral-content/60 tracking-wide">
                            &copy; 2026 Teachers Finding Systems Inc. All Rights Reserved.
                        </p>
                        <div className="flex gap-4 text-xs text-neutral-content/40">
                            <a className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
                            <span>•</span>
                            <a className="hover:text-primary transition-colors cursor-pointer">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;