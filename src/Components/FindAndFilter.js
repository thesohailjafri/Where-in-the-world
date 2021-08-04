import React from 'react'

function FindAndFilter(props) {
    const { search, filter } = props.data
    return (
        <div>
            <label>
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
        </div>
    )
}

export default FindAndFilter
