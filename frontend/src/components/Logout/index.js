import React, {useState} from 'react'
import "./index.css"

export const Logout = () => {

    const logout = () => {
        sessionStorage.clear()
        window.location.replace('./')
    };
    return (
        <form  onSubmit={() => logout()}>
        <button type="submit"> Logout </button>

        </form>
    );
};