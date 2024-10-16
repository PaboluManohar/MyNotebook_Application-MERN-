import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Signup = () => {


    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" });
    let navigate = useNavigate();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json.authtoken)
        localStorage.setItem('token', json.authtoken);
        navigate("/");

        console.log(json);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputname" className="form-label">name</label>
                    <input type="text" className="form-control" id="exampleInputname" name="name" onChange={onChange} aria-describedby="namee" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} aria-describedby="emailHelp" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" minLength={5} required id="exampleInputPassword1" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPasswordconfirm1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} minLength={5} required name="confirmpassword" id="exampleInputPassword1confirm" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


        </div>
    )
}
