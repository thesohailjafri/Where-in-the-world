import React from 'react'
import loadingSvg from '../Static/SVG/loadingSvg.svg'
function Loading() {
    console.log(loadingSvg)

    return (
        <div className="loader">
            <img src={loadingSvg} alt="loading" />
        </div>
    )
}

export default Loading