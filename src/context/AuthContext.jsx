import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    // Load saved token when the app starts
    const [token, setToken] = useState(() =>
        localStorage.getItem("token")
    );

    // Load saved user data safely
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Failed to parse user data:", error);
            return null;
        }
    });

    // Keep token synced with localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // Save user data to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // Log in and store user information
    const login = (userToken, userData) => {
        setToken(userToken);
        setUser(userData);
    };

    // Log out and clear stored data
    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for accessing auth state
function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export { AuthProvider, useAuth };
export default AuthContext;
