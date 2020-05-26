import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="menu">
                <Link to="/dashboard" >DashBoard</Link>
                <Link to="/cidade" >Cidade</Link>
                <Link to="/bairro" >Bairro</Link>
            </div>
        );
    }
}
export default Header;