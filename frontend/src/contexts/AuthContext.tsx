import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from '../history';
import api from '../services/api';

interface AuthContextData {
    authenticated: boolean;
    loading: boolean;
    handleLogin: (email: string, senha: string) => void;
    handleCreateUser: (email: string, password: string, name: string, is_admin: boolean, route: string) => void;
    handleLogout: () => void;
    createToasty: (message: string) => void;
}

interface AuthContextProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProviderProps) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true)
        }
        setLoading(false);
    }, [])

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setAuthenticated(false);
    }

    async function handleLogin(email: string, password: string) {
        const { data: { token, user } } = await api.post('/login', { email, password })

        api.defaults.headers.Authorization = `Bearer ${token}`;

        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));

        setAuthenticated(true)
        history.push('/');
    }

    async function handleCreateUser(email: string, password: string, name: string, is_admin = true, route: string) {
        await api.post(route, {
            name,
            email,
            password,
            is_admin
        })

        createToasty(`👍🏻 ${name} created! Please verify your e-mail to confirm your registration.`)
    }

    function createToasty(message: string) {
        
        toast.success(`${message}`)
    }

    return (
        <AuthContext.Provider value={{
            authenticated,
            handleLogin,
            loading,
            handleCreateUser,
            handleLogout,
            createToasty
        }}>
            { children}
            <ToastContainer />
        </AuthContext.Provider>
    )
}



