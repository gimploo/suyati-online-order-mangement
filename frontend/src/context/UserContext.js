import { createContext, useEffect, useState } from 'react';
import { TODO } from 'utils/basic'
import { useNavigate  } from 'react-router-dom';
import { AlternateEmail } from '@material-ui/icons';
import axios from 'axios'

const UserContext = createContext({});
const API_SERVER_URL = 'http://127.0.0.1:8000/api'
const DEFAULT_USER_INFO = {
    fullname: '',
    username: '',
    dob: '',
    email: '',
    role: 0
}

/* RESPONSE FORMAT
{
    "message": "CORRECT_EMAIL_AND_PASSWORD",
    "data": [
        {
            "model": "api.user",
            "pk": "a51d7bef-2e01-4258-a8f1-fa6adeb1c3ca",
            "fields": {
                "fullname": "JohnDoe",
                "dob": "2000-09-20",
                "email": "johndoe@email.com",
                "password": "password",
                "role": 3,
                "added_date": "2022-09-20"
            }
        }
    ]
}
*/

const grab_user_id = (res) => {
    return res.data.data[0].pk
}
const grab_user_data = (res) => {
    return res.data.data[0].fields
}

const COOKIE_USER_ID = 'suyati-user-id';
const COOKIE_USER_INFO = 'suyati-user-info';

export const UserProvider = ({children}) => {

    const [user, setUser]           = useState(DEFAULT_USER_INFO);
    const [isAuth, setAuth]         = useState(false);
    const [isSeller, setSeller]     = useState(false);
    const [isBuyer, setBuyer]       = useState(false);
    const navigate                  = useNavigate();


    useEffect(() => {

        const id = localStorage.getItem(COOKIE_USER_ID)
        if (id) {
            const userInfo = localStorage.getItem(COOKIE_USER_INFO)
            if (userInfo) {
                setUser(userInfo)
                const userArray = JSON.parse(userInfo)
                if (userArray.role == 1) {
                    setBuyer(true)
                } else if (userArray.role == 2) {
                    setSeller(true)
                } else if (userArray.role == 3) {
                    setBuyer(true)
                    setSeller(true)
                }
                setAuth(true)
            } else {
                localStorage.removeItem(COOKIE_USER_ID)
                localStorage.removeItem(COOKIE_USER_INFO)
            }
        }
        navigate('/')

    }, [])

    const login = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        axios.post(`${API_SERVER_URL}/login/`, {'email' : email, 'password' : password})
            .then((res) => {
                console.log(res)
                if(res.status != 200)
                    alert('something went wrong')
                
                const userid = grab_user_id(res);
                const message = res.data.message;
                const userdata = grab_user_data(res);
                console.log(userid)
                console.log(userdata)
                if (message === "CORRECT_EMAIL_AND_PASSWORD")
                {
                    switch (userdata.role)
                    {
                        case 1:
                            setBuyer(true)
                        break;
                        case 2:
                            setSeller(true)
                        break;
                        case 3:
                            setBuyer(true)
                            setSeller(true)
                        break;
                    }
                    setAuth(true);
                    setUser(userdata)
                    localStorage.setItem(COOKIE_USER_ID, JSON.stringify(userid))
                    localStorage.setItem(COOKIE_USER_INFO, JSON.stringify(userdata))
                }
            })
        navigate('/')
    }

    const logout = async () => {

        setUser(DEFAULT_USER_INFO);
        setAuth(false);
        setBuyer(false);
        setSeller(false);
        localStorage.removeItem(COOKIE_USER_ID);
        localStorage.removeItem(COOKIE_USER_INFO);
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
