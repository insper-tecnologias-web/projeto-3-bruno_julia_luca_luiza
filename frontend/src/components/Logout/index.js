import React, {useState} from 'react'
import "./index.css"

export const Logout = () => {

    const logout = () => {
        sessionStorage.clear()
        window.location.replace('./')
    };
    return (
        <div className="fonte3">
        <form  onSubmit={() => logout()}>
        <button type="submit"> Logout </button>

        </form>
        </div>
    );
};