import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Register = () => {
    useDocumentTitle('Create Account');
    const { createUser, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        // Reset system validator state
        setPasswordError('');

        // Realtime Manual Core Logic Rule Assertions
        if (password.length < 6) {
            setPasswordError('Length must be at least 6 characters.');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError('Must contain at least one uppercase letter.');
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError('Must contain at least one lowercase letter.');
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photo)
                    .then(() => {
                        toast.success('Registration successful! Please login.');
                        navigate('/login');
                    });
            })
            .catch(err => {
                toast.error(err.message || 'Registration unexpected fault pattern.');
            });
    };

    const handleGoogleSignIn = () => {
        loginWithGoogle()
            .then(() => {
                toast.success('Google authenticated successfully!');
                navigate('/');
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4">
            <div className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-200 p-6 rounded-2xl">
                <h2 className="text-3xl font-bold text-center text-base-content mb-6">Register Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Your Full Name</span></label>
                        <input type="text" name="name" required placeholder="John Doe" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Email Address</span></label>
                        <input type="email" name="email" required placeholder="name@domain.com" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Photo URL String</span></label>
                        <input type="url" name="photo" required placeholder="https://imgbb-link-placeholder.png" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Secure Password</span></label>
                        <input type="password" name="password" required placeholder="••••••••" className="input input-bordered w-full" />
                        {passwordError && <p className="text-error text-xs mt-1 font-semibold">{passwordError}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-4">Register Now</button>
                </form>

                <div className="divider my-6">OR CONTROLS</div>
                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-secondary w-full gap-2">
                    <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.143 1 1.2 5.943 1 12s5.143 11 11.24 11c6.362 0 10.596-4.477 10.596-10.77 0-.725-.078-1.275-.175-1.83H12.24z"/></svg>
                    Continue with Google
                </button>
                <p className="text-center text-sm mt-4">Already registered? <Link to="/login" className="text-primary font-bold link">Login here</Link></p>
            </div>
        </div>
    );
};

export default Register;