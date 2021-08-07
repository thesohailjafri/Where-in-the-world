import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Loading from './Components/Loading'
import Home from './Components/Home'
import Header from './Components/Header'
import FindAndFilter from './Components/FindAndFilter'
import Error from './Components/Error'
import SingleCountry from './Components/SingleCountry'
class App extends React.Component {

  constructor () {
    super()
    this.state = {
      respones: [],
      loading: true,
      search: "",
      filter: "",
      error: ""
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
          error: "",
          filter: "",
          search: ""
        })
      })
      .catch(error => console.log(error))
  }


  searchHandler(e) {
    const { name, value } = e.target

    //check if input is only letter/space key
    if (value.match(/^[a-zA-Z\s]*$/)) {

      //manage state
      this.setState({
        [name]: value.trim(),
        filter: "",
        loading: true,
        error: ""
      })

      //if blank the fetch all countries
      if (value === "") {
        //if blank then fetch all the flags
        this.fetchAll()
        this.setState({
          loading: false,
          error: "",
        })
      }

      //if not blank then search the country
      if (value !== "") {
        fetch(`https://restcountries.eu/rest/v2/name/${value}`)
          .then(res => res.json())
          .then(data => {
            if (data.status === 404) {
              this.setState({
                error: "No Country Found",
                loading: false
              })
              console.log(this.state.error)
            } else {
              //updating states
              this.setState({
                respones: data,
                error: "",
                loading: false
              })
              // console.log(this.state.respones)
            }

          })
          .catch(error => console.log(error))
      }

    }

  }

  filterHander(e) {
    const { name, value } = e.target

    //managing filter inputs
    this.setState({
      [name]: value,
      search: "",
      loading: true,
      error: ""
    })

    //fetch the filter response
    fetch(`https://restcountries.eu/rest/v2/region/${value}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 404) {
          this.setState({
            error: "No Country Found",
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
      .catch(error => console.log(error))
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
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header fetchAll={this.fetchAll} />
          <Switch>
            <Route exact path="/">
              <FindAndFilter
                data={this.state}
                searchHandler={this.searchHandler}
                filterHander={this.filterHander} />
              <Home data={this.state} />
            </Route>
            <Route exact path="/e">
              <Error />
            </Route>
            <Route path='/country/:name'>
              <SingleCountry />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App
