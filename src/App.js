import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Loading from './Components/Loading'
import Home from './Components/Home'
import Header from './Components/Header'
import FindAndFilter from './Components/FindAndFilter'
import Error from './Components/Error'

class App extends React.Component {

  constructor () {
    super()
    this.state = {
      respones: [],
      loading: true,
      search: "",
      filter: "",
      error: []
    }
    this.searchHandler = this.searchHandler.bind(this)
    this.filterHander = this.filterHander.bind(this)
    this.fetchAll = this.fetchAll.bind(this)
  }

  //functions

  fetchAll() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(data => {
        //updating state of apiResponses
        this.setState({
          respones: data,
          loading: false,
          filter: "",
        })
      })
  }

  searchHandler(e) {
    const { name, value } = e.target

    console.log(e.target)


    //check if input is only letter/space key
    if (value.match(/^[a-zA-Z\s]*$/)) {

      //managing filter inputs
      this.setState({
        [name]: value
      })

      //setting loading before fetching
      this.setState({
        loading: true,
        error: ""
      })

      //fetch the filter response
      if (value.trim() !== "") {
        try {
          fetch(`https://restcountries.eu/rest/v2/name/${value}`)
            .then(res => res.json())
            .then(data => {
              if (data.status === 404) {
                this.setState({
                  error: "Something Went South :/",
                  loading: false
                })
                console.log(this.state.error)
              } else {
                //updating states
                this.setState({
                  respones: data,
                  loading: false
                })
                console.log(this.state.respones)
              }

            })
            .catch(error => {
              console.error('Error:', error)
            })
        }

        catch (error) {
          console.error('Error:', error)
        }
      }
      else {
        //if blank then fetch all the flags
        this.fetchAll()
      }

    }

  }

  filterHander(e) {
    const { name, value } = e.target

    //managing filter inputs
    this.setState({
      [name]: value
    })

    //setting loading before fetching
    this.setState({
      loading: true,
      error: ""
    })

    //fetch the filter response
    fetch(`https://restcountries.eu/rest/v2/region/${value}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 404) {
          this.setState({
            error: "Something Went South :/",
            loading: false
          })
          console.log(this.state.error)
        } else {
          //updating states
          this.setState({
            respones: data,
            loading: false
          })
          console.log(this.state.respones)
        }

      })
  }
  //methods
  componentDidMount() {

    //setting loading to true
    this.setState({
      loading: true,
      error: ""
    })

    //calling each all endpoint of restcountries
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(data => {
        //updating state of apiResponses
        this.setState({
          respones: data,
          loading: false
        })
        console.log(this.state.respones[0].name)
      })
  }

  render() {
    return (
      <div className="App">
        <Router>

          <Header fetchAll={this.fetchAll} />
          <FindAndFilter
            data={this.state}
            searchHandler={this.searchHandler}
            filterHander={this.filterHander} />
          <Home data={this.state} />
        </Router>
      </div>
    )
  }

}

export default App
