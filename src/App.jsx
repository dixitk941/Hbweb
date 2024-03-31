import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MyState from './context/data/myState';

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import Allproducts from './pages/allproducts/Allproducts';
import PrivacyPolicy from './pages/privacypolicy/PrivacyPolicy';

const ProtectedRoute = ({ roles = [], children, ...rest }) => {
  const { user } = React.useContext(MyState);
  useEffect(() => {
    if (!user || !roles.includes(user.role)) {
      return <Navigate to="/login" replace />;
    }
  }, [roles, user]);
  return <Route {...rest} element={children} />;
};

function App() {
  const { user } = React.useContext(MyState);
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="/order" element={
          <ProtectedRoute roles={['user']}>
            <Order />
          </ProtectedRoute>
          } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={
          <ProtectedRoute roles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
          } />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/productinfo/:id' element={<ProductInfo/>} />
        <Route path='/addproduct' element={
          <ProtectedRoute roles={['admin']}>
            <AddProduct/>
          </ProtectedRoute>
          } />
        <Route path='/updateproduct' element={
          <ProtectedRoute roles={['admin']}>
            <UpdateProduct/>
          </ProtectedRoute>
          } />
        <Route path="/*" element={<NoPage />} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
