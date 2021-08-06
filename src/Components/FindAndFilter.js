import React from 'react'
import { HiSearch } from 'react-icons/hi'
function FindAndFilter(props) {
    const { search, filter } = props.data

    return (
        <nav>
            <label>
                <HiSearch />

                <input
                    name="search"
                    value={search}
                    onChange={props.searchHandler}

                    placeholder="Search for a country..."

                >
                </input>
            </label>

            <select
                name="filter"
                value={filter}
                onChange={props.filterHander}
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
