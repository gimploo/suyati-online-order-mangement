import Navbar from './components/Navbar.js'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'
import Cart from 'pages/CartPage'
import UserAbout from 'pages/UserPage.js'
import Footer from 'components/Footer'
import { Route, Routes } from 'react-router-dom'
import UserRoute from 'utils/UserRoute.js';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} exact />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/user" element={<UserAbout />} />
			</Routes>
			<Footer />
		</>
);
}

export default App;
