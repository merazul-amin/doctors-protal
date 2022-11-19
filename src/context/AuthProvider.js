import React from 'react';
import { createContext } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth"
import { useEffect } from 'react';
import { useState } from 'react';
export const AuthContext = createContext();

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
            setUser(loggedUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        createUser,
        logIn,
        user,
        logOut,
        updateUser,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;