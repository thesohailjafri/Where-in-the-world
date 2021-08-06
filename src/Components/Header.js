import React from 'react'
import { HiOutlineMoon } from 'react-icons/hi'
function Header(props) {
    return (
        <header>
            <h1 onClick={props.fetchAll}>Where in the world?</h1>
            <h2><HiOutlineMoon />Dark Mode</h2>
        </header>
    )
}

export default Header
