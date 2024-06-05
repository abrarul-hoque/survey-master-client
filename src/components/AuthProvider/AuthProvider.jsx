import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const authInfo = {
        user,
        createUser,
        loading,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;