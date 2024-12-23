import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import OrderPage from './components/OrderPage';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
 

function App() {
  return (
    <Router>  {/* This is BrowserRouter */}
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />

      </Routes>
    </Router>
  );
}

export default App;
