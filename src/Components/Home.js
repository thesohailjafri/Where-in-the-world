import React from 'react'
import Loading from './Loading'
import Country from './Country'

function Home(props) {
    return (
        <>
            {props.data.loading ?
                <Loading data={props.data.theme} /> :
                <main className="countries">
                    {props.data.error ?
                        <h2>{props.data.error}.</h2>
                        :
                        props.data.respones.map((item) => {
                            return (<Country key={item.name} c_data={item} data={props.data} />)
                        })}
                </main>

            }
        </>
    )
}

export default Home
