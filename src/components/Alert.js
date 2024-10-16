import React from 'react'
import { useContext } from 'react';
import alertContext from '../context/alert/alertContext';



export const Alert = () => {


    const context = useContext(alertContext)
    const { alert } = context;

    return (
        (alert.msg !== "") && <div
            className={`alert alert-${alert.color} alert-dismissible fade show container-fluid text-center`}
            role="alert"
        >
            <strong>  {alert.msg}</strong>
        </div>
    )
}