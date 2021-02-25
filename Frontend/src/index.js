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
