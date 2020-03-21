import React, { Component } from "react";
import styled from "styled-components";
import PlayIcon from "src/images/play.svg";

const AutoplayWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 46px;
    right: 140px;
    left: auto;
    transform: none;
  }

  .progress-ring__circle {
    transition: 0.35s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke: ${({ theme }) => theme.colors.darkerPink};
    position: absolute;  
    left: 0;
    top: 0;
  }
`;

const AutoplayText = styled.span`
  font-size: 1.5rem;
  margin-right: 20px;
`;

const AutoplayIconWrapper = styled.div`
  position: relative;
`;

const FingersWrapper = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  svg {
    width: 12px;
    margin-left: 1px;
  }
`;

const Finger = styled.div`
  height: 55%;
  width: 2px;
  background-color: ${({ theme }) => theme.colors.softBlack};
  margin: 2px;
`;

export default class Autoplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPercentage: props.initialPercentage || 0,
      totalTime: props.totalTime || 3000,
      isPlaying: true,
      chunk: 0
    };
  }

  async componentDidMount() {
    let { circumference, circle } = this.setCircleSize(
      this.props.size,
      this.props.stroke
    );
    await this.reset(circle, circumference);
    this.startCounting(circle, circumference);
  }

  async reset(circle, circumference) {
    this.setProgress(this.state.initialPercentage, circle, circumference);

    await this.setState({
      initialPercentage: this.props.initialPercentage || 0,
      totalTime: this.props.totalTime || 3000,
      isPlaying: true
    });

    await this.setState({
      chunk:
        ((100 - this.state.initialPercentage) / this.state.totalTime) * 1000,
      timeLeft: this.state.totalTime / 1000
    });

    if (this.props.onRestart) this.props.onRestart();
  }

  startCounting(circle, circumference) {
    var interval = 1000;
    setInterval(async () => {
      if (!this.state.isPlaying) return;
      if (this.state.initialPercentage >= 100) {
        if (this.props.autoReset) await this.reset(circle, circumference);
        else return;
      }
      await this.setState((state, props) => {
        let newPercent = this.state.initialPercentage + this.state.chunk;
        this.setProgress(newPercent, circle, circumference);
        return {
          initialPercentage: newPercent,
          timeLeft: state.timeLeft - interval / 1000
        };
      });
      if (this.props.onTick) this.props.onTick(this.state.timeLeft);
    }, interval);
  }

  setCircleSize(size, strokeWidth) {
    let r = size / 2 - strokeWidth * 2;
    let middle = size / 2;

    let circle = document.getElementById("circle");
    let circleParentSvg = document.getElementById("circleParentSvg");
    document.getElementById("autoplayIconWrapper").setAttribute("height", size);

    circleParentSvg.setAttribute("width", size);
    circleParentSvg.setAttribute("height", size);

    circle.setAttribute("strokeWidth", strokeWidth);
    circle.setAttribute("width", size);
    circle.setAttribute("height", size);
    circle.setAttribute("r", r);
    circle.setAttribute("cx", middle);
    circle.setAttribute("cy", middle);

    let radius = circle.r.baseVal.value;
    let circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    return { circle, circumference };
  }

  setProgress(percent, circle, circumference) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }


  togglePlay() {

    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  render() {
    return (
      <AutoplayWrapper>
        <AutoplayText>Switch in {this.state.timeLeft}...</AutoplayText>
        <AutoplayIconWrapper id="autoplayIconWrapper">
          <svg
            className="progress-ring"
            id="circleParentSvg"
            width="32"
            height="32"
          >
            <circle
              id="circle"
              className="progress-ring__circle"
              stroke="white"
              strokeWidth="3"
              fill="transparent"
              r="10"
              cx="16"
              cy="16"
            />
          </svg>

          <FingersWrapper onClick={() => this.togglePlay()}>
            {this.state.isPlaying ? (
              <>
                <Finger></Finger>
                <Finger></Finger>
              </>
            ) : (
              <PlayIcon />
            )}
          </FingersWrapper>
        </AutoplayIconWrapper>
      </AutoplayWrapper>
    );
  }
}
