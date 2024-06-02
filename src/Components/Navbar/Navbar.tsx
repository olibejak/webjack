import "./Navbar.css"
import BackgroundMusic from "../BackgroundMusic/BackgroundMusic";
import React from "react";
import {GiHamburgerMenu} from "react-icons/gi";

export default function Navbar() {

    function toggleNav() {
        const dropdown = document.querySelector(".dropdown-menu");
        if (dropdown) dropdown.classList.toggle("menu-expanded");
    }

    return (
    <>
        <nav>
            <h1>Webjack</h1>
            <BackgroundMusic/>
            <button className="hamburger-icon" onClick={toggleNav}><GiHamburgerMenu/></button>
            <div className="dropdown-menu">
                <BackgroundMusic/>
            </div>
        </nav>
    </>
    );
}