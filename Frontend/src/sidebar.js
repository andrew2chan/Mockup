import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faThumbtack, faChartPie, faEnvelope, faShapes, faRedo } from '@fortawesome/free-solid-svg-icons';
import '../stylesheet/sidebar.css';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: null
    };
    this.isActive = this.isActive.bind(this);
    this.changeParentActive = this.changeParentActive.bind(this);
  }

  isActive(evt) {
    this.toggleActive(evt.target);
  }

  changeParentActive(evt) {
    evt.stopPropagation();

    let tagName = evt.target.tagName;
    let container;

    if(tagName == 'svg') {
      container = evt.target.parentNode;
    }
    else if(tagName == 'path') {
      container = evt.target.parentNode.parentNode;
    }

    this.toggleActive(container);
  }

  toggleActive(container) {
    this.setState({
      activeLink: container.id
    });
  }

  render() {
    return(
        <div className="sidebar">
          <div className={this.state.activeLink == 1 ? 'sidebarContainer isActive' : 'sidebarContainer isNotActive'} onClick={this.isActive} id="1">
            <FontAwesomeIcon icon={faThumbtack} size="1x" id="firstSideContainerObject" onClick={this.changeParentActive} />
          </div>
          <div className={this.state.activeLink == 2 ? 'sidebarContainer isActive' : 'sidebarContainer isNotActive'} onClick={this.isActive} id="2">
            <FontAwesomeIcon icon={faChartPie} size="1x" onClick={this.changeParentActive} />
          </div>
          <div className={this.state.activeLink == 3 ? 'sidebarContainer isActive' : 'sidebarContainer isNotActive'} onClick={this.isActive} id="3">
            <FontAwesomeIcon icon={faEnvelope} size="1x" onClick={this.changeParentActive} />
          </div>
          <div className={this.state.activeLink == 4 ? 'sidebarContainer isActive' : 'sidebarContainer isNotActive'} onClick={this.isActive} id="4">
            <FontAwesomeIcon icon={faShapes} size="1x" onClick={this.changeParentActive} />
          </div>
          <div className={this.state.activeLink == 5 ? 'sidebarContainer isActive' : 'sidebarContainer isNotActive'} onClick={this.isActive} id="5">
            <FontAwesomeIcon icon={faRedo} size="1x" onClick={this.changeParentActive} />
          </div>
        </div>
    )
  }
}
