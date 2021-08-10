import React from 'react'
import { HiOutlineMoon } from 'react-icons/hi'
import { Link } from 'react-router-dom'
function Header(props) {

    const style1 = {
        'background-color': props.data.theme.element,
        'color': props.data.theme.text,
    }

    return (
        <header style={style1}>
            <Link className='links' to="/" style={{ textDecoration: 'none' }}>
                <h1 onClick={props.fetchAll} >
                    Where in the world?
                </h1>
            </Link>
            <h2 onClick={props.switchMode}><HiOutlineMoon />Dark Mode</h2>
        </header >
    )
}

export default Header
