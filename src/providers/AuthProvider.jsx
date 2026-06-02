import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. গুগল লগইন ফাংশন (picture এবং গুগল ইমেজ রেন্ডারিং ফিক্সসহ)
  const loginWithGoogle = async (credential) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://mediqueue-server-zl2f.onrender.com/google-login",
        {
          credential,
        }
      );

      localStorage.setItem("access-token", res.data.token);

      // গুগল রেসপন্সে থাকা সম্ভাব্য সব ছবির ফিল্ড (বিশেষ করে picture) এখানে ক্যাচ করা হয়েছে
      const userData = {
        uid: res.data.user?._id || res.data.user?.uid,
        email: res.data.user?.email,
        displayName: res.data.user?.name || res.data.user?.displayName,
        photoURL: res.data.user?.picture || res.data.user?.photo || res.data.user?.photoURL || res.data.user?.image,
      };

      setUser(userData);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // ২. ম্যানুয়াল ইমেইল/পাসওয়ার্ড লগইন ফাংশন
  const loginUser = async (email, password) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://mediqueue-server-zl2f.onrender.com/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("access-token", res.data.token);

      const userData = {
        uid: res.data.user?._id || res.data.user?.uid,
        email: res.data.user?.email,
        displayName: res.data.user?.name || res.data.user?.displayName,
        photoURL: res.data.user?.photo || res.data.user?.photoURL || res.data.user?.image || res.data.user?.picture,
      };

      setUser(userData);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // ৩. লগআউট ফাংশন
  const logoutUser = () => {
    localStorage.removeItem("access-token");
    setUser(null);
  };

  // ৪. কারেন্ট ইউজার সেশন অবজার্ভার (অটো-লগইন)
  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    axios
      .get("https://mediqueue-server-zl2f.onrender.com/current-user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          const userData = {
            uid: res.data?._id || res.data?.uid,
            email: res.data?.email,
            displayName: res.data?.name || res.data?.displayName,
            photoURL: res.data?.photo || res.data?.photoURL || res.data?.image || res.data?.picture,
          };
          setUser(userData);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        localStorage.removeItem("access-token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const authInfo = {
    user,
    loading,
    loginWithGoogle,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};