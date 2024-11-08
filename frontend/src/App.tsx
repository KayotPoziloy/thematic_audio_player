import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { DropdownMenu, DropdownMenuFavourites } from "./components/DropdownMenu";

function App() {
  return (
    <>
        <Router>
          <div className="d-flex flex-column vh-100">
            <Header/>
            <DropdownMenu name="выбор"/>
            <DropdownMenuFavourites name="избранное"/>
            <Content/>
            <Footer/>
          </div>
        </Router>
    </>
  );
}

export default App;
