
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import UserContext from 'context/UserContext.js';
import Navbar from './components/Navbar.js'
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'

function App() {
	return (
		<>
		<Navbar />
		</>
		// <Router>
		// 	<Route path='/' exact component={<HomePage/>} />
		// 	<Route path='/login' component={Login} />
		// 	<Route path='/signup' component={Signup} />
		// </Router>
);
}

export default App;
