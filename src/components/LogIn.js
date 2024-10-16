
import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
export const LogIn = () => {
    const {makeAlert}=useContext(alertContext);

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if(json.success)
        {
           localStorage.setItem('token', json.authtoken);
           navigate("/");
           makeAlert("logged in successfully ","success");
        }
        else{
            makeAlert("not logged in  ","danger");
        }
        console.log(json);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div >
            <h2>Log in to continue</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={onChange} value={credentials.email} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={onChange} value={credentials.password} name='password' type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
