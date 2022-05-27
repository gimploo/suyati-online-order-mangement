
import UserContext from 'context/UserContext.js';
import Navbar from './components/Navbar.js'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'
import Cart from 'components/CartPopup'
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
		</Routes>
		</>
);
}

export default App;
