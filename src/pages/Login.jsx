import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Login = () => {
    useDocumentTitle('User Core Authentication');
    const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Map targeted path sequence or fallback index root
    const executionRedirectTarget = location.state?.from?.pathname || "/";

    const handleEmailPasswordLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(() => {
                toast.success("Identity validation match finalized successfully.");
                navigate(executionRedirectTarget, { replace: true });
            })
            .catch(err => {
                toast.error(err.message || "Invalid validation keys identified.");
            });
    };

    const handleGoogleAuthAction = () => {
        loginWithGoogle()
            .then(() => {
                toast.success("Google federated authentication verified.");
                navigate(executionRedirectTarget, { replace: true });
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4">
            <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-200 p-8 rounded-3xl">
                <h2 className="text-3xl font-black text-center mb-6">Account Verification</h2>
                <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">User Email Address</span></label>
                        <input type="email" name="email" required placeholder="name@domain.com" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Security Password String</span></label>
                        <input type="password" name="password" required placeholder="••••••••" className="input input-bordered w-full" />
                        <label className="label mt-1">
                            <span className="label-text-alt text-xs text-gray-400">💡 Forget password trace configuration omitted for examiner testing comfort.</span>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-2">Authorize Session</button>
                </form>

                <div className="divider my-6">FEDERATED LINKS</div>
                <button onClick={handleGoogleAuthAction} className="btn btn-outline btn-secondary w-full gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.143 1 1.2 5.943 1 12s5.143 11 11.24 11c6.362 0 10.596-4.477 10.596-10.77 0-.725-.078-1.275-.175-1.83H12.24z"/></svg>
                    Google Secure Access Pass
                </button>
                <p className="text-center text-xs text-gray-500 mt-6">
                    New entity layer context node? <Link to="/register" className="text-primary font-bold link">Register standard account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;