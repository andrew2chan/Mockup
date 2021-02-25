import React from "react";
import ReactDOM from "react-dom";

import Sidebar from './sidebar.js'
import Navbar from './navbar.js'
import MainBodyContent from './main.js'

import '../stylesheet/index.css'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*componentDidMount() {
    fetch('http://127.0.0.1:8080/getData')
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        gaugeData: data.gaugeData,
        areaData: data.areaData
      })
      //console.log(this.state.gaugeData);
    })
    .catch((err) => {
      console.log("whoopsie")
    })
  }*/

  render() {
    return(
      <span className="MainContainer">
        <Sidebar />
        <Navbar />
        <MainBodyContent />
      </span>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("root")
)
