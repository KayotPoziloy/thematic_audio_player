import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  return (
    <>
        <Router>
            <div className="d-flex flex-column vh-100">
                <Header/>
                <Content/>
                <Footer/>
            </div>
        </Router>
    </>
  );
}

export default App;
