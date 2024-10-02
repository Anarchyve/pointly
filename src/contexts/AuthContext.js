// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // 'admin' 또는 'student'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Firestore에서 사용자의 역할 확인
        const userRef = doc(firestore, "users", user.email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setRole(userSnap.data().role); // 'admin' 또는 'student'
        } else {
          console.log("No such user role!");
        }
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, role }}>
      {children}
    </AuthContext.Provider>
  );
};
