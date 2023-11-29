import React, {useState} from 'react'
import "./index.css"

export const Logout = () => {

    const logout = () => {
        sessionStorage.clear()
        window.location.replace('./')
    };
    return (
        <div className="logout-button">
        <form  onSubmit={() => logout()}>
        <button type="submit"> Logout </button>

        </form>
        </div>
    );
};