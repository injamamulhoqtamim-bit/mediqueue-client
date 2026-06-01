import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async (credential) => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/google-login",
        {
          credential,
        }
      );

      localStorage.setItem(
        "access-token",
        res.data.token
      );

      setUser(res.data.user);

      return res.data;
    } finally {
      setLoading(false);
    }
  };
  const loginUser = async (email, password) => {
  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "access-token",
      res.data.token
    );

    setUser(res.data.user);

    return res.data;

  } finally {
    setLoading(false);
  }
};

  const logoutUser = () => {
    localStorage.removeItem("access-token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("https://mediqueue-server-zl2f.onrender.com/current-user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
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