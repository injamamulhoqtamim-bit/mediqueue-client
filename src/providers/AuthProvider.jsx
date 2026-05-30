import { createContext, useEffect, useState } from 'react';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import app from "../firebase/firebase.config"; // Path setup based on your init
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logoutUser = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        return signOut(auth);
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser?.email) {
                axios.post('http://localhost:5000/jwt', { email: currentUser.email })
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    });
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const authInfo = { user, loading, createUser, loginUser, logoutUser, loginWithGoogle, updateUserProfile };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};