import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSlidersH, faDownload, faPrint, faInfoCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../stylesheet/navbar.css';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
        <div className="navbar">
          <div className="navbarContainer">
            <div id="firstNavbarContainer"><b>Diagnostic Tool</b></div>
            <div id="secondNavbarContainer">Logged in as General User</div>
            <div className="smallNavbarContainers">
              <FontAwesomeIcon icon={faSlidersH} size="1x" />
            </div>
            <div className="smallNavbarContainers">
              <FontAwesomeIcon icon={faDownload} size="1x" />
            </div>
            <div className="smallNavbarContainers">
              <FontAwesomeIcon icon={faPrint} size="1x" />
            </div>
            <div className="smallNavbarContainers">
              <FontAwesomeIcon icon={faInfoCircle} size="1x" />
            </div>
            <div className="smallNavbarContainers">
              <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
            </div>
          </div>
        </div>
    )
  }
}
