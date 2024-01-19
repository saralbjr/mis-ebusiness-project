import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Navbar from './components/Navbar';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Admin from './screens/Admin/Admin.js'
import AdminAdd from './screens/Admin/AdminAdd.js'
import OrderInfo from './screens/Admin/OrderInfo.js';
import UserInfo from './screens/Admin/UserInfo.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            <Route exact path="/admin" element={<Admin/>}/>
            <Route path="/admin/add" element={<AdminAdd />} /> {/* Add this route */}
            <Route path="/admin/ordersdata" element={<OrderInfo />} />
            <Route path="/admin/usersdata" element={<UserInfo />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
