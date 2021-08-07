import React from 'react'
import Loading from './Loading'
import Country from './Country'

function Home(props) {
    return (
        <>
            {props.data.loading ?
                <Loading /> :
                <main className="countries">
                    {props.data.error ?
                        <h2>{props.data.error}.</h2>
                        :
                        props.data.respones.map((item) => {
                            return (<Country data={item} />)
                        })}
                </main>

            }
        </>
    )
}

export default Home
