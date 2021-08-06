import React from 'react'
import { Link } from 'react-router-dom'

function Country(props) {
    const { name, flag, population, region, capital } = props.data

    return (
        <div className='country'>
            <img src={flag} alt={name} />
            <section>
                <h3>{name}</h3>
                <p><b>Population: </b>{population}</p>
                <p><b>Region: </b>{region}</p>
                <p><b>Capital: </b>{capital}</p>
                <Link to={`/country/${name}`} >hi</Link>
            </section>
        </div>
    )
}

export default Country
