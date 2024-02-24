import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Menu from './Components/Menu/Menu';
import FirstSec from './Components/FirstSec/FirstSec';
import SecondSec from './Components/SecondSec/SecondSec';
import ThirdSec from './Components/ThirdSec/ThirdSec';
import Collection from './Components/Collection/Collection';
import FiveSec from './Components/FiveSec/FiveSec';
import Footer from './Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_DATA } from './Components/redux/actions/actions';
import WishList from './Components/wishList/WishList';
import { Link } from 'react-router-dom';
import Cart from './Components/Cart/Cart';
import Shop from './Components/Shop/Shop';
import axios from 'axios';
import Sliderr from './Components/Slider/Slider';
import Login from './Components/Login/Login';
import SignUp from './Components/Admin/SignUp';


import { authContext } from './helpers/authContext';
import Navigation from './Components/Navigation/Navigation';
import Loader from './Components/Loader/Loader';

const App = () => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});

  const dispatch = useDispatch()

  
  
 useEffect(() => {
    fetch("https://royalchicapi-cc1c56c683bf.herokuapp.com/api/products").then((res) => res.json()).then((data) => {
      dispatch({
        type:FETCH_DATA,
        payload:data
      })
    })
  }) 


  const [pageLoaded, setPageLoaded] = useState(false);

  // Simulate page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Render the loader while the page is loading
  if (!pageLoaded) {
    return <Loader/>;
  }
  return (
      <authContext.Provider value={{ logged, setLogged, user, setUser }}>
        <Navigation/>
      </authContext.Provider>
  );
};

export default App;
