import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 
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

      // 
      const userData = {
        uid: res.data.user?.id || res.data.user?._id || res.data.user?.uid,
        email: res.data.user?.email,
        displayName: res.data.user?.name || res.data.user?.displayName,
        photoURL: res.data.user?.picture || res.data.user?.photo || res.data.user?.photoURL,
      };

      setUser(userData);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // 
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

      // 
      const userData = {
        uid: res.data.user?._id || res.data.user?.id || res.data.user?.uid,
        email: res.data.user?.email,
        displayName: res.data.user?.name || res.data.user?.displayName,
        photoURL: res.data.user?.photo || res.data.user?.picture || res.data.user?.photoURL,
      };

      setUser(userData);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // 
  const logoutUser = () => {
    localStorage.removeItem("access-token");
    setUser(null);
  };

  // 
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
          // 
          const userData = {
            uid: res.data?.id || res.data?._id || res.data?.uid,
            email: res.data?.email,
            displayName: res.data?.name || res.data?.displayName,
            photoURL: res.data?.picture || res.data?.photo || res.data?.photoURL,
          };
          setUser(userData);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Session restoration failed:", err);
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