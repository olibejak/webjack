import "./Navbar.css"
import BackgroundMusic from "./BackgroundMusic/BackgroundMusic";
import React from "react";

interface NavbarProps {
    restartGame?: () => void
}

export default function Navbar({restartGame}: NavbarProps) {

    function toggleNav() {
        const dropdown = document.querySelector(".dropdown-menu");
        if (dropdown) dropdown.classList.toggle("menu-expanded");
    }

    return (
    <>
        <nav>
            <button onClick={restartGame}>Restart Game</button>
            <h1>Webjack</h1>
            <BackgroundMusic/>
            <button className="hamburger-icon" onClick={toggleNav}>☰</button>
        </nav>
        <div className="dropdown-menu">
            <BackgroundMusic/>
            <button className="restart-button" onClick={restartGame}>Restart</button>
        </div>
    </>
    );
}