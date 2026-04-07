import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from '@mui/material';
import Header from './Components/Header/Header.jsx';
import Home from './Components/Home/Home.jsx';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Cart from './Components/Cart/Cart.jsx'
import Return from './Components/Home/Footer/Return.jsx';
import About from './Components/Home/Footer/About.jsx';
import Exchange from './Components/Home/Footer/Exchange.jsx';
import Contact from './Components/Home/Footer/Contact.jsx';
import ConfirmOrder from './Components/PaymentDetail/ConfirmOrder.jsx';
import Payment from './Components/PaymentDetail/Payment.jsx';
import Feedback from './Components/Home/Footer/Feedback.jsx';

// export default App
import ProductListing from './Components/ProductListing/ProductListing.jsx';
import DetailView from './Components/Details/DetailView.jsx';
import DataProvider from "./Context/DataProvider.jsx";
import UserOrders from "./Components/PaymentDetail/UserOrders.jsx";
import { loadUserCart } from "./Redux/actions/cartActions";
import MyProfile from "./Components/User/MyProfile.jsx";
import Wishlist from "./Components/User/Wishlist.jsx";
import Coupons from "./Components/User/Coupons.jsx";
import { loadWishlist } from "./Redux/actions/wishlistActions";



function App() {
  const dispatch = useDispatch();

  // ✅ Load saved cart from localStorage when app starts
  useEffect(() => {
    dispatch(loadUserCart());
    dispatch(loadWishlist());
  }, [dispatch]);

  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 55 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} /> {/* ✅ Add this */}
            <Route path="/product/:id" element={<DetailView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Return" element={<Return />} />
            <Route path="/About" element={<About />} />
            <Route path="/Exchange" element={<Exchange />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/confirm-order" element={<ConfirmOrder />}/>
            <Route path="/my-orders" element={<UserOrders />} />
            {/* <Route path="/my-orders" element={<MyOrders />} /> */}
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/coupons" element={<Coupons />} />

          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
