import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";



export const Navbar = () => {
    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    //   }, [location]);
    let navigate = useNavigate();

    const handleLogout=()=>{
        console.log("removing from local storagee..")
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    <form className="d-flex">
                        {
                            !localStorage.getItem('token') ?<div>
                            <Link className="btn btn-primary mx-1" to="/login" role='button'>login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role='button'>signup</Link> </div> :
                        <button className="btn btn-primary" onClick={handleLogout} >Logout</button>

                        }
                    </form>
                </div>
            </div>
        </nav>
    )
}
