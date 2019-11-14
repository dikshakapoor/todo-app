import React from "react";
import logo from "./todo_logo.png";
class NavigationBar extends React.Component {

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     taskList: [],
    //     //     currentInputValue: '',
    // }
    render() {
        return (
            <div className="header">
                <img className="logo" alt="logo" src={logo} style={{ width: "50px", height: "50px", radius: "2px" }} />
                <div className="nav">
                    <ul>
                        <li className="navText"><div className="markAllComplete" onClick={this.props.markAllCompelte}> Mark All Complete </div></li>
                        <li className="navText"><div className="deleteAll" onClick={this.props.deleteAll}> Delete All</div></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default NavigationBar;