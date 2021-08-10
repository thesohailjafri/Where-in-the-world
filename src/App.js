import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//Components
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
      error: "",
      mode: true,
      theme: {
        text: 'hsl(209, 23%, 22%)',
        element: 'hsl(0, 0%, 100%)',
        background: 'hsl(0, 0%, 98%)',
      }
    }

    this.fetchData = this.fetchData.bind(this)
    this.fetchAll = this.fetchAll.bind(this)
    this.switchMode = this.switchMode.bind(this)
  }

  //functions


  fetchAll = () => {
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

  fetchData = (e) => {

    e.preventDefault()

    const { name, value } = e.target

    if (value.match(/^[a-zA-Z\s]*$/)) {

      let url, counter

      if (name === "search") {
        url = `https://restcountries.eu/rest/v2/name/${value}`
        this.setState({
          filter: "",
        })
      }

      if (name === "filter") {
        url = `https://restcountries.eu/rest/v2/region/${value}`
        this.setState({
          search: "",
        })
      }

      this.setState({
        [name]: value.trim(),
        error: "",
        loading: true
      })

      clearTimeout(counter)
      counter = setTimeout(() => {
        //fetch blank value
        if (!value) {
          this.fetchAll()
        }

        //fetch the value
        if (value) {
          fetch(url)
            .then(res => res.json())
            .then(data => {
              if (data.status === 404) {
                this.setState({
                  error: "No Country Found",
                  loading: false
                })
              } else {
                //updating states
                this.setState({
                  respones: data,
                  loading: false
                })
              }

            })
            .catch(error => console.log(error))
        }
      }, 100)
    }
  }

  switchMode = () => {
    this.setState({
      mode: !this.state.mode
    }, () =>
      this.applyTheme()
    )
  }

  applyTheme = () => {


    /* colors */

    //light
    const light_text = 'hsl(209, 23%, 22%)'
    const light_element = 'hsl(0, 0%, 100%)'
    const light_background = 'hsl(0, 0%, 98%)'

    //dark
    const dark_text = 'hsl(0, 0%, 100%)'
    const dark_element = 'hsl(209, 23%, 22%)'
    const dark_background = 'hsl(207, 26%, 17%)'

    const _body = document.querySelector('body')
    if (this.state.mode) {
      _body.style.backgroundColor = light_background
      _body.style.color = light_text

      this.setState({
        theme: {
          text: light_text,
          element: light_element,
          background: light_background,
        }
      })
    }

    if (!this.state.mode) {
      _body.style.backgroundColor = dark_background
      _body.style.color = dark_text
      this.setState({
        theme: {
          text: dark_text,
          element: dark_element,
          background: dark_background,
        }
      })
    }
  }


  //methods
  componentDidMount() {
    this.applyTheme()
    //setting loading to true
    this.setState({
      loading: true,
      error: "",
      filter: "",
      search: "",
    })



    //calling each all endpoint of restcountries
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(data => {
        //updating state of apiResponses
        this.setState({
          respones: data,
          loading: false,
        })
      })
      .catch(error => console.log(error))
  }

  render() {


    return (
      <div className="App" >
        <Router>
          <Header data={this.state} fetchAll={this.fetchAll} switchMode={this.switchMode} />
          <Switch>

            <Route exact path="/">
              <FindAndFilter
                data={this.state}
                fetchData={this.fetchData} />
              <Home data={this.state} />
            </Route>

            <Route path='/country/:name'>
              <SingleCountry data={this.state} />
            </Route>

            <Route exact path="/*">
              <Error data={this.state.theme} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App
