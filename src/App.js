import logo from './logo.svg';
import './App.css';
import React from 'react'
import FactGenerator from "./FactGenerator";
import Header from './Header.js'
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
