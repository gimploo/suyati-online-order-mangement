import { createContext, useEffect, useState } from 'react';
import { TODO } from 'utils/basic'
import { useNavigate  } from 'react-router-dom';

const UserContext = createContext({});

export const UserProvider = ({children}) => {

    const [user, setUser]       = useState('');
    const [isAuth, setAuth]     = useState(false);
    const [isSeller, setSeller] = useState(false)
    const [isBuyer, setBuyer]   = useState(false)
    const navigate              = useNavigate();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('logged_user')) || '')
        setAuth(true)
        navigate('/')
    }, [])

    const login = async (user) => {

        setUser(localStorage.setItem('logged_user', JSON.stringify(user)))
        setAuth(true);
        navigate('/')
    }

    const logout = async () => {

        setUser('');
        setAuth(false);
        navigate('/')
    }

    return (
        <UserContext.Provider value={{
            user, isSeller, isBuyer, isAuth, login, logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
