import React, { useState } from 'react'
import AlertContext from './alertContext'

export const AlertState = (props) => {
    const [alert, setalert] = useState({ msg: "", type: "", color: "" });

    const makeAlert = (msg, color) => {
        setalert({
            msg: msg,
            color: color,
        });

        setTimeout(() => {
            setalert({msg:"", color:""});
        }, 1500);
    };
    return (
        <AlertContext.Provider value={{makeAlert, alert}}>
            {props.children}
        </AlertContext.Provider>)
}
