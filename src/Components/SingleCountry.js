import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiArrowNarrowLeft } from 'react-icons/hi'

function SingleCountry(props) {
    const { name } = useParams()
    const [country, setCountry] = React.useState([])

    const style1 = {
        'background-color': props.data.theme.element,
        'color': props.data.theme.text,
    }

    console.log({ props })


    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
            const country = await response.json()
            setCountry(country)
            console.log(country)
        }
        fetchData()
    }, [name])
    return (
        <div className="singleCountry">

            <Link to='/'>
                <button style={style1}><HiArrowNarrowLeft />Back</button>
            </Link>

            {country &&
                country.map(item => {
                    const { flag,
                        name,
                        numericCode,
                        nativeName,
                        topLevelDomain,
                        population,
                        currencies,
                        region,
                        languages,
                        subregion,
                        capital,
                        borders, } = item

                    return (
                        <>
                            <div className="countryContainer" key={numericCode}>
                                <img src={flag} alt={name} />
                                <section>
                                    <h1> {name}</h1>
                                    <div className="details">
                                        <div className="details1">
                                            <p><b>Native Name: </b>{nativeName}</p>
                                            <p><b>Population: </b>{population}</p>
                                            <p><b>Region: </b>{region}</p>
                                            <p><b>Sub Region: </b>{subregion}</p>
                                            <p><b>Capital: </b>{capital}</p>
                                        </div>
                                        <div className="details2">
                                            <p><b>Top Level Domain: </b>{topLevelDomain}</p>
                                            <p><b>Currencies: </b>{currencies[0].code}</p>
                                            <p><b>Languages: </b>{languages[0].name}</p>
                                        </div>
                                    </div>
                                    {borders[0] && <div className="details3">
                                        <p><b>Borders Countries: </b>

                                            {
                                                borders.map(item => {
                                                    return (
                                                        <span style={style1}>{item}</span>
                                                    )
                                                })
                                            }
                                        </p>
                                    </div>}
                                </section>
                            </div>
                        </>)
                })
            }
        </div>
    )
}

export default SingleCountry



