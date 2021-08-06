import React from 'react'
import Loading from './Loading'
import Country from './Country'

function Home(props) {
    return (
        <>
            {props.data.loading ?
                <Loading /> :
                props.data.error ?
                    <h1>{props.data.error}</h1> :
                    <main className="countries">
                        {props.data.respones.map((item) => {
                            return (<Country data={item} />)
                        })}
                    </main>
            }
        </>
    )
}

export default Home
