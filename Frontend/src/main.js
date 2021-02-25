import React from "react";
import * as d3 from "d3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGlobe, faThumbtack, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../stylesheet/main.css';

export default class MainBodyContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeCard: "radioCard0",
      activeCardIndex: 0
    };
    this.updateSelectedCard = this.updateSelectedCard.bind(this);
    this.drawCards = this.drawCards.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8080/getData')
    .then(blob => blob.json())
    .then(data => {
      this.setState({
        gaugeData: data.gaugeData,
        areaData: data.areaData
      })

      //this.drawCards();
    })
    .catch((err) => {
      console.log("whoopsie")
    })

  }

  updateSelectedCard(evt) {
    let parentNodeId = evt.target.parentNode.id;
    let extractIndex = parentNodeId.split("radioCard")[1];

    this.setState({
      activeCard: parentNodeId,
      activeCardIndex: extractIndex
    })
  }

  componentDidUpdate() {
    this.drawCards();
    this.drawAreaChart();
  }

  drawCards() {
    let self = this;
    let donuts = d3.selectAll(".donut")

    donuts.each(function() {
      let extractIndex = this.id.split("donut")[1];
      let extData = self.state.gaugeData[extractIndex];

      let data = [extData.score, 100-extData.score];

      let svg = d3.select("#donut"+extractIndex);
      let width = parseFloat(svg.style("width"));
      let height = parseFloat(svg.style("height"));
      let radius = Math.min(width, height) / 2;
      let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      let color = d3.scaleOrdinal(d3.select("#radioCard"+extractIndex).attr("class") == 'innerFilterCards selectedCard' ? ['#59d8ff','#e1e9f0'] : ['#027adb','#e1e9f0']);

      g.append("text")
        .attr("text-anchor", "middle")
        .text(extData.score + "%")
        .style("fill", "#00c3ff")
        .style("font-size", "150%")

      g.append("text")
        .attr("text-anchor", "middle")
        .text(extData.vsly ? extData.vsly : "N/A")
        .style("fill", "#00c3ff")
        .attr("transform", "translate(0 20)")

      // Generate the pie
      let pie = d3.pie();

      // Generate the arcs
      let arc = d3.arc()
                  .innerRadius(radius-10)
                  .outerRadius(radius);


      //Generate groups
      let arcs = g.selectAll("arc")
                  .data(pie(data))
                  .enter()
                  .append("g")
                  .attr("class", "arc")

      //Draw arc paths
      arcs.append("path")
          .attr("fill", function(d, i) {
              return color(i);
          })
          .attr("d", arc);
          })

  }

  drawAreaChart() {
    let areaChart = d3.select("#areaChart");
    areaChart.selectAll("*").remove(); //clear

    let self = this;
    let extractIndex = this.state.activeCardIndex;
    let name = self.state.gaugeData[extractIndex].name;
    let dateHash = {
      "Jan": 1,
      "Feb": 2,
      "Mar": 3,
      "Apr": 4,
      "May": 5,
      "Jun": 6,
      "Jul": 7,
      "Aug": 8,
      "Sep": 9,
      "Oct": 10,
      "Nov": 11,
      "Dec": 12
    }

    let data = [...self.state.areaData[name]];

    let sectionWidth = parseFloat(areaChart.attr("width"))/(data.length-1);

    let dataPair = [];
    let xScale = [];
    let xAxis = 0;
    for(let i = 0; i < data.length; i++) {
      dataPair.push({x: xAxis, y: 100-data[i].score});
      xScale.push(data[i].date)
      xAxis += sectionWidth;
    }

    let scale = d3.scalePoint()
                    .domain(xScale)
                    .range([0, areaChart.attr("width")])

    let curveFunc = d3.area()
                      .x(d => d.x)
                      .y0(100*3)
                      .y1(d => d.y*3);

    let makeCirc = areaChart.selectAll('circle').data(dataPair).enter();
    let makePerc = areaChart.selectAll('text').data(dataPair).enter();

    areaChart.append("g")
                .attr("transform", "translate(0,350)")
                .style('stroke','black')
                .call(d3.axisBottom(scale))

    areaChart.append("path")
      .attr('d', curveFunc(dataPair))
      .attr('stroke', 'black')
      .attr('fill', '#3385ff')

    makeCirc.append("circle")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y*3)
                .attr("r", 10)
                .attr('stroke', 'black')
                .attr('fill', '#69a3b2')

    makePerc.append('text')
                .text(d => d.y + "%")
                .attr("transform", d => "translate(" + (d.x-10) + "," + ((d.y*3)-20) + ")")
                .attr('fill', 'black')

  }

  render() {
    return(
      <div className="mainBodyContent">
        <div className="mainContainerHeader">
          <span id="headerText">PERFORMANCE MANAGEMENT</span>
        </div>
        <div className="mainContainerBar">
          <div className="innerContainer">
            <div className="innerMainContainerToolText">
              <FontAwesomeIcon icon={faGlobe} size="2x" className="svgMainBody"/>
              <span id="diagnostic"> Diagnostic Tool</span>
            </div>
            <div className="innerMainContainerPin">
              <FontAwesomeIcon icon={faThumbtack} size="2x" className="svgMainBody"/>
            </div>
          </div>
        </div>
        <div className="mainContainerBody">
          <div className="outerFilterContainerFirst">
            <div className="filterContainer1">
              <div className="filterText"><b>Filters</b></div>
              <div className="filterSelectionArea">
                <div className="individualFilters">
                  <label htmlFor="allResults">
                    <input type="radio" id="allResults" name="CQAs" defaultChecked></input>
                      <span className="customRadio"></span>
                      <span>All CQA Results <FontAwesomeIcon icon={faInfoCircle} size="1x" className="svgMainBody" /></span>
                  </label>
                </div>
                <div className="individualFilters">
                  <label htmlFor="closedLoop">
                    <input type="radio" id="closedLoop" name="CQAs"></input>
                      <span className="customRadio"></span>
                      <span>CQAs with Closed Loop <FontAwesomeIcon icon={faInfoCircle} size="1x" className="svgMainBody" /></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="filterContainer2">
              <div className="qualityText">{this.state.gaugeData ? this.state.gaugeData[this.state.activeCardIndex].name.toUpperCase() : ""} TREND</div>
            </div>
            <div className="filterContainer1">
              <div className="qualityScoreTrendContainer">
                <div className="timeButtons blue1">Day</div>
                <div className="timeButtons blue2">Week</div>
                <div className="timeButtons blue3">Month</div>
                <div className="timeButtons blue4">Quarter</div>
                <div className="timeButtons blue5">Half</div>
                <div className="timeButtons blue6">Year</div>
              </div>
            </div>
          </div>
          <div className="outerFilterContainerSecond">
            <div className="innerFilterContainerSecond">
              <label id="radioCard0" htmlFor="card0" className={this.state.activeCard == ("radioCard0") ? "innerFilterCards selectedCard" : "innerFilterCards"} >
                <div>{this.state.gaugeData ? this.state.gaugeData[0].name : ""}</div>
                <svg className="donut" id="donut0"></svg>
                <div>Sample: {this.state.gaugeData ? this.state.gaugeData[0].sample : ""}</div>
                <input type="radio" name="cards" id={"card0"} onChange={this.updateSelectedCard} className="inputCards" defaultChecked></input>
              </label>
              <label id="radioCard1" htmlFor="card1" className={this.state.activeCard == ("radioCard1") ? "innerFilterCards selectedCard" : "innerFilterCards"} >
                <div>{this.state.gaugeData ? this.state.gaugeData[1].name : ""}</div>
                <svg className="donut" id="donut1"></svg>
                <div>Sample: {this.state.gaugeData ? this.state.gaugeData[1].sample : ""}</div>
                <input type="radio" name="cards" id="card1" onChange={this.updateSelectedCard} className="inputCards"></input>
              </label>
              <label id="radioCard2" htmlFor="card2" className={this.state.activeCard == ("radioCard2") ? "innerFilterCards selectedCard" : "innerFilterCards"} >
                <div>{this.state.gaugeData ? this.state.gaugeData[2].name : ""}</div>
                <svg className="donut" id="donut2"></svg>
                <div>Sample: {this.state.gaugeData ? this.state.gaugeData[2].sample : ""}</div>
                <input type="radio" name="cards" id="card2" onChange={this.updateSelectedCard} className="inputCards"></input>
              </label>
              <label id="radioCard3" htmlFor="card3" className={this.state.activeCard == ("radioCard3") ? "innerFilterCards selectedCard" : "innerFilterCards"} >
                <div>{this.state.gaugeData ? this.state.gaugeData[3].name : ""}</div>
                <svg className="donut" id="donut3"></svg>
                <div>Sample: {this.state.gaugeData ? this.state.gaugeData[3].sample : ""}</div>
                <input type="radio" name="cards" id="card3" onChange={this.updateSelectedCard} className="inputCards"></input>
              </label>
              <label id="radioCard4" htmlFor="card4" className={this.state.activeCard == ("radioCard4") ? "innerFilterCards selectedCard" : "innerFilterCards"} >
                <div>{this.state.gaugeData ? this.state.gaugeData[4].name : ""}</div>
                <svg className="donut" id="donut4"></svg>
                <div>Sample: {this.state.gaugeData ? this.state.gaugeData[4].sample : ""}</div>
                <input type="radio" name="cards" id="card4" onChange={this.updateSelectedCard} className="inputCards"></input>
              </label>
              <label id="radioCard5" htmlFor="card5" className={this.state.activeCard == ("radioCard5") ? "innerFilterCards selectedCard" : "innerFilterCards"} >
                <div>{this.state.gaugeData ? this.state.gaugeData[5].name : ""}</div>
                <svg className="donut" id="donut5"></svg>
                <div>Sample: {this.state.gaugeData ? this.state.gaugeData[5].sample : ""}</div>
                <input type="radio" name="cards" id="card5" onChange={this.updateSelectedCard} className="inputCards"></input>
              </label>
            </div>
            <div className="innerFilterContainerSecondRow">
              <svg className="areaChart" id="areaChart" width="600" height="400"></svg>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
