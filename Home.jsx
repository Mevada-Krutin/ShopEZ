import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Form from './form';
import HomePage from './pages/HomePage';

const Home = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar /> 
      <div>
        
      </div>

      <div className="flex-grow">

        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
