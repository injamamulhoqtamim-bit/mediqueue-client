import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-sans">
            {/* Header / Navigation bar */}
            <Navbar />

            {/* Dynamic Middle Section Routing Entry View */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Sticky Global Footer Structure */}
            <footer className="footer p-10 bg-neutral text-neutral-content grid grid-cols-1 md:grid-cols-4 gap-8">
                <nav>
                    <h6 className="footer-title text-primary uppercase opacity-100">Learning Services</h6> 
                    <a className="link link-hover">Mathematics Portal</a>
                    <a className="link link-hover">Quantum Physics Lab</a>
                    <a className="link link-hover">Advanced Biochemistry</a>
                    <a className="link link-hover">Computer Science Basic</a>
                </nav> 
                <nav>
                    <h6 className="footer-title text-primary uppercase opacity-100">Contact Info</h6> 
                    <p>Dhaka Division, Bangladesh</p>
                    <p>Email: support@mediqueue.com</p>
                    <p>Phone: +880 1234 56789</p>
                </nav> 
                <nav>
                    <h6 className="footer-title text-primary uppercase opacity-100">Social Connects</h6> 
                    <div className="grid grid-flow-col gap-4 text-2xl">
                        {/* New Rebranded X Logo instead of old bird logo */}
                        <a href="https://x.com" target="_blank" rel="noreferrer" className="link link-hover">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="link link-hover">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                            </svg>
                        </a>
                    </div>
                </nav>
                <div>
                    <h6 className="footer-title text-primary uppercase opacity-100">Legal Architecture</h6>
                    <p className="text-xs">&copy; 2026 MediQueue Systems Inc. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;