import React from 'react'


//Components
import Header from './Components/Header'
import FindAndFilter from './Components/FindAndFilter'
//Styling
import './App.css'

class App extends React.Component {

  constructor () {
    super()
    this.state = {
      respones: [],
      loading: false,
      search: "",
      filter: "",
      error: []
    }
    this.searchHandler = this.searchHandler.bind(this)
    this.filterHander = this.filterHander.bind(this)
  }
  //functions
  searchHandler = (e) => {
    const { name, value } = e.target

    //managing filter inputs
    this.setState({
      [name]: value
    })

    //setting loading before fetching
    this.setState({
      loading: true
    })

    //fetch the filter response
    if (value !== "") {
      try {
        fetch(`https://restcountries.eu/rest/v2/name/${value}`)
          .then(res => res.json())
          .then(data => {
            if (data.status === 404) {
              this.setState({
                error: "error retrivng information",
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



  }

  filterHander(e) {
    const { name, value } = e.target

    //managing filter inputs
    this.setState({
      [name]: value
    })

    //setting loading before fetching
    this.setState({
      loading: true
    })

    //fetch the filter response
    fetch(`https://restcountries.eu/rest/v2/region/${value}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 404) {
          this.setState({
            error: "error retrivng information",
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
      loading: true
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
        console.log(this.state.respones)
      })
  }

  render() {
    return (
      <div className="App">
        {this.state.loading ?
          <h1>Loading...</h1> :
          <h1>
            Loaded
          </h1>
        }

        <Header />
        <FindAndFilter
          data={this.state}
          searchHandler={this.searchHandler}
          filterHander={this.filterHander} />
      </div>
    )
  }

}

export default App
