import logo from './logo.svg';
import './App.css';
import React from 'react'
import FactGenerator from "./FactGenerator";
import Header from './Header.js'
import 'bootstrap/dist/css/bootstrap.min.css'; //GOING TO TRY TO WORK WITH THIS BUT IT CAUSES THIS HORIZONTAL SCROLL BAR
//going to mess with calling parent
function App(){

        return (
            <div >
                <Header />
                <FactGenerator/>
            </div>

        )

}


export default App;
