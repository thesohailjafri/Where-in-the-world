import React from 'react'
import { Link } from 'react-router-dom'

function Country(props) {
    const { name, flag, population, region, capital } = props.c_data

    const style1 = {
        'background-color': props.data.theme.element,
        'color': props.data.theme.text,
    }

    const style2 = {
        'background-color': props.data.theme.background,
        'color': props.data.theme.text,
    }

    return (
        <div className='country' style={style1}>
            <img src={flag} alt={name} />
            <section >
                <h3>{name}</h3>
                <p><b>Population: </b>{population}</p>
                <p><b>Region: </b>{region}</p>
                <p><b>Capital: </b>{capital}</p>
                <Link to={`/country/${name}`} >
                    <button style={style2}>
                        <b>View Details</b>
                    </button>
                </Link>
            </section>
        </div>
    )
}

export default Country
