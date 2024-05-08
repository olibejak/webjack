import "./SideBar.css"
import {useState} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import BackgroundMusic from "../BackgroundMusic/BackgroundMusic";

function SideBar() {

    const [barOpen, setBarOpen] = useState(false);
    const stayOpen = useState(false);



    return (
        <div id={"side-bar"}>
            <GiHamburgerMenu id={"hamburger"}/>
            <div id={"side-bar-content"}>
                <BackgroundMusic/>
            </div>
        </div>
    )
}

export default SideBar;