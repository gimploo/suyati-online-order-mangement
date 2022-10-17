import { Route, Routes } from 'react-router-dom'
import Navbar from 'components/Navbar.js'
import Footer from 'components/Footer'
import Home from 'pages/HomePage'
import Login from 'pages/LoginPage'
import Signup from 'pages/SignupPage'

import BuyerCart from 'pages/Buyer/CartPage'
import BuyerUser from 'pages/Buyer/UserPage.js'

import SellerDashboard from 'pages/Seller/pages/home/Home'
import SellerUser from "pages/Seller/pages/user/User";
import SellerNewUser from "pages/Seller/pages/newUser/NewUser";
import SellerUserList from "pages/Seller/pages/userList/UserList";
import SellerProduct from "pages/Seller/pages/product/Product";
import SellerNewProduct from "pages/Seller/pages/newProduct/NewProduct";
import SellerProductList from "pages/Seller/pages/productList/ProductList";

import UserRoute from 'utils/UserRoute.js';
import ProductPage from 'pages/ProductPage'
import NewProduct from 'pages/Seller/pages/newProduct/NewProduct'
import { BackendProvider } from 'context/BackendContext'
import PopUp from 'components/Popup'

function App() {

	return (
		<>
			<BackendProvider >
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} exact />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path='/product' element={<ProductPage />} />

					<Route path="/buyer/cart" element={<BuyerCart />} />
					<Route path="/buyer/user" element={<BuyerUser />} />

					<Route path='/seller/about' element={<SellerDashboard />} />
					<Route path='/seller/users' element={<SellerUserList />} />
					<Route path="/seller/products" element={<SellerProductList />} />

					<Route path="/seller/user/:userId" element={<SellerUser />} />
					<Route path="/seller/newUser" element={<SellerNewUser />} />
					<Route path="/seller/product/:productId" element={<SellerProduct />} />
					<Route path="/seller/newproduct" element={<SellerNewProduct />} />

					<Route path="/seller/product/add" element={<NewProduct />} />
				</Routes>
				<Footer />
				<PopUp />
			</BackendProvider>
		</>
	);
}

export default App;
