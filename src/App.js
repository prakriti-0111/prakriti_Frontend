
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import routes from 'routes';
import Header from 'src/layout/Retailer/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import React from "react";
import { Helmet } from 'react-helmet';

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const routing = useRoutes(routes(isLoggedIn));

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Helmet>
        <title>Prakriti(test) - Jewellers since 1990</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <div className="wrapper">
        {routing}
      </div>
    </>
  );
}

export default App;
