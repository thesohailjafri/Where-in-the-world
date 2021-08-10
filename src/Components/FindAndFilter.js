import React from 'react'
import { HiSearch } from 'react-icons/hi'
function FindAndFilter(props) {
    const { search, filter } = props.data

    const style1 = {
        'background-color': props.data.theme.element,
        'color': props.data.theme.text,
    }



    return (
        <nav>
            <label style={style1}>
                <HiSearch style={style1} />

                <input
                    name="search"
                    value={search}
                    onChange={props.fetchData}
                    style={style1}
                    placeholder="Search for a country..."

                >
                </input>
            </label>

            <select
                name="filter"
                value={filter}
                onChange={props.fetchData}
                style={style1}
            >

                <option selected hidden>Filter By Region</option>
                <option
                    value="africa">Africa</option>
                <option
                    value="americas">America</option>
                <option
                    value="asia">Asia</option>
                <option
                    value="europe">Europe</option>
                <option
                    value="oceania">Oceania</option>
            </select>
        </nav>
    )
}

export default FindAndFilter
