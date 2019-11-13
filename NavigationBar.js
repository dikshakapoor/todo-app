import React from "react";
import logo from "./todo_logo.png";

const NavigationBar = (props) => {
    return (
        <div className="header">
            <img className="logo" src={logo} style={{ width: "50px", height: "50px", radius: "2px" }} />
            <div className="nav">
                <ul>
                    <li className="navText"><div className="markAllComplete" onClick={props.markAllCompelte}> Mark All Complete </div></li>
                    <li className="navText"><div className="deleteAll" onClick={props.deleteAll}> Delete All</div></li>
                </ul>
            </div>
        </div>
    )
}

export default NavigationBar;