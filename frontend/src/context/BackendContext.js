import { createContext, useEffect, useState } from 'react';
import { TODO } from 'utils/basic'
import { useNavigate } from 'react-router-dom';
import { AlternateEmail } from '@material-ui/icons';
import axios from 'axios'
import { ContentPasteSearchOutlined } from '@mui/icons-material';
import { gridColumnsTotalWidthSelector } from '@material-ui/data-grid';

const BackendContext = createContext({});
const API_SERVER_URL = 'http://127.0.0.1:8000/api'
const DEFAULT_USER_INFO = {
    id: '',
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

export const BackendProvider = ({ children }) => {

    //Backend
    const [user, setUser] = useState(DEFAULT_USER_INFO);
    const [isAuth, setAuth] = useState(false);
    const [isSeller, setSeller] = useState(false);
    const [isBuyer, setBuyer] = useState(false);
    const navigate = useNavigate();

    // Products
    const [categories, setCategories] = useState([])

    useEffect(() => {

        get_available_categories()

        const id = localStorage.getItem(COOKIE_USER_ID)
        if (id) {
            const userInfo = localStorage.getItem(COOKIE_USER_INFO)
            if (userInfo) {
                const userArray = JSON.parse(userInfo)
                setUser({ id: JSON.parse(id), ...userArray })
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

    }, [])

    const login = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        await axios.post(`${API_SERVER_URL}/login/`, { 'email': email, 'password': password })
            .then((res) => {
                console.log(res)
                if (res.status != 200)
                    alert('something went wrong')

                const userid = grab_user_id(res);
                const message = res.data.message;
                const userdata = grab_user_data(res);
                switch (message) {
                    case "CORRECT_EMAIL_AND_PASSWORD":
                        switch (userdata.role) {
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
                        setUser({ id: userid, ...userdata })
                        localStorage.setItem(COOKIE_USER_ID, JSON.stringify(userid))
                        localStorage.setItem(COOKIE_USER_INFO, JSON.stringify(userdata))
                        navigate('/')
                        break;
                    case "WRONG_EMAIL_AND_PASSWORD":
                        console.log("Invalid username and password")
                        break;
                }
            })
    }

    const signup = async (e) => {
        e.preventDefault();
        const fullname = e.target.fullname.value;
        const username = e.target.username.value;
        const dob = e.target.dob.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const repassword = e.target.repassword.value;
        const role = e.target.role.value;

        if (password !== repassword) {
            alert('Retyped password doesnt match password')
            return;
        }

        axios.post(`${API_SERVER_URL}/signup/`, {
            'fullname': fullname,
            'username': username,
            'dob': dob,
            'email': email,
            'password': password,
            'role': role
        })
            .then((res) => {
                console.log(res)
                if (res.status != 200)
                    alert('something went wrong')

                const userid = grab_user_id(res);
                const message = res.data.message;
                const userdata = grab_user_data(res);
                switch (message) {
                    case "SIGNUP_SUCCESSFULL":
                        switch (userdata.role) {
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
                        setUser({ id: userid, ...userdata })
                        localStorage.setItem(COOKIE_USER_ID, JSON.stringify(userid))
                        localStorage.setItem(COOKIE_USER_INFO, JSON.stringify(userdata))
                        navigate('/')
                        break;
                }
            })
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

    const get_available_categories = async () => {

        axios.post(`${API_SERVER_URL}/product/category/all/`)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                    setCategories(res.data)
                }
            })
    }

    const add_product = async (name, price, category, quantity, status, image) => {

        if (!user) {
            alert("User id is null")
            return
        }
        await axios.post(`${API_SERVER_URL}/product/add/`,
            {
                name: name, price: price, category: category, quantity: quantity, status: status,
                image: image, username: user.username
            })
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                }
            })
    }

    return (
        <BackendContext.Provider value={{
            // utils
            API_SERVER_URL,
            COOKIE_USER_ID,
            COOKIE_USER_INFO,

            // Backend
            user, isSeller, isBuyer, isAuth,
            login, signup, logout,

            //Product
            categories,
            add_product,
        }}>
            {children}
        </BackendContext.Provider>
    )
}

export default BackendContext;
