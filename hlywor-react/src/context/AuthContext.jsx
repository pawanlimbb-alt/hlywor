import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPromptText, setAuthPromptText] = useState('Sign in to continue');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && db) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
              email: user.email || '',
              photoURL: user.photoURL || '',
              createdAt: serverTimestamp()
            });
          }
        } catch (e) {
          console.warn("[AuthContext] Sync user record failed", e);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShowAuthModal(false);
    } catch (e) {
      console.error("Login failed", e);
      alert("Sign in failed: " + e.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const requireLogin = (prompt = 'Sign in to continue') => {
    if (currentUser) return true;
    setAuthPromptText(prompt);
    setShowAuthModal(true);
    return false;
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, loginWithGoogle, logout, requireLogin, showAuthModal, setShowAuthModal, authPromptText }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
