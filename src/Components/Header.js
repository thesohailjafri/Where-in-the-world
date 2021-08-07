import React from 'react'
import { HiOutlineMoon } from 'react-icons/hi'
import { Link } from 'react-router-dom'
function Header(props) {
    return (
        <header>
            <Link className='links' to="/" style={{ textDecoration: 'none' }}>
                <h1 onClick={props.fetchAll} >
                    Where in the world?
                </h1>
            </Link>
            <h2><HiOutlineMoon />Dark Mode</h2>
        </header>
    )
}

export default Header
