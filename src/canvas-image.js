import React from "react";
import styled from "styled-components";

const ImageCard = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: flex;
  flex-direction: column;

  & > canvas {
    position: absolute;
  }

  & > div {
    position: absolute;
    width: inherit;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: none;
  }

  & > div > small {
    width: inherit;
    font-weight: bold;
    text-align: center;
    color: ${props => props.color};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    margin-bottom: 10px;
  }

  & > div > p {
    width: inherit;
    line-height: 18px;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }

  & > img {
    display: none;
  }

  &:hover {
    & small {
      display: block;
    }

    & p {
      display: block;
    }
  }
`;

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      isHovered: false
    };

    const { width, height } = props;

    this.ctx = null;
    this.cornerTop = new Path2D();
    this.cornerTop.moveTo(0, 0);
    this.cornerTop.lineTo(width * 0.3, 0);
    this.cornerTop.lineTo(0, height * 0.3);

    this.cornerBottom = new Path2D();
    this.cornerBottom.moveTo(width, height * 0.7);
    this.cornerBottom.lineTo(width, height);
    this.cornerBottom.lineTo(width * 0.7, width);

    this.polygon = new Path2D();
    this.polygon.moveTo(width * 0.3, 0);
    this.polygon.lineTo(0, height * 0.3);
    this.polygon.moveTo(width * 0.3, 0);
    this.polygon.lineTo(width, 0);
    this.polygon.lineTo(width, height * 0.7);
    this.polygon.lineTo(width * 0.7, height);
    this.polygon.lineTo(0, height);
    this.polygon.lineTo(0, height * 0.3);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
    this.cutCorners = this.cutCorners.bind(this);
    this.drawOpaqueLayer = this.drawOpaqueLayer.bind(this);
    this.drawBorder = this.drawBorder.bind(this);
    this.showText = this.showText.bind(this);
    this.hideText = this.hideText.bind(this);
  }

  componentDidMount() {
    const { canvas, image } = this.refs;
    const { width, height, isFocused, isHovered } = this.props;

    this.ctx = canvas.getContext("2d");

    image.onload = () => {
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      this.ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        width,
        height
      );

      if (isFocused) {
        this.handleMouseDown();
      } else if (isHovered) {
        this.handleMouseEnter();
      }
    };
  }

  resetCanvas() {
    let { width, height } = this.props;
    let { ctx } = this;
    let { image } = this.refs;

    ctx.clearRect(0, 0, width, height);
    this.ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      width,
      height
    );
  }

  cutCorners() {
    let { parentBackgroundColor } = this.props;
    let { ctx, cornerTop, cornerBottom } = this;

    ctx.beginPath();
    ctx.fillStyle = parentBackgroundColor;
    ctx.fill(cornerTop);
    ctx.fill(cornerBottom);
    ctx.closePath();
  }

  drawOpaqueLayer() {
    const { hoverFillStyle } = this.props;
    const { ctx, polygon } = this;

    ctx.beginPath();
    ctx.fillStyle = hoverFillStyle;
    ctx.fill(polygon);
  }

  drawBorder() {
    const { accentColor, borderThickness } = this.props;
    const { ctx, polygon } = this;

    ctx.beginPath();
    ctx.lineWidth = borderThickness;
    ctx.strokeStyle = accentColor;
    ctx.stroke(polygon);
  }

  showText() {
    const { overlayText } = this.refs;
    overlayText.style.display = "flex";
  }

  hideText() {
    const { overlayText } = this.refs;
    overlayText.style.display = "none";
  }

  handleMouseDown() {
    this.setState({ isFocused: true });
    this.resetCanvas();
    this.drawBorder();
    this.cutCorners();
    this.hideText();
  }

  handleMouseUp() {
    this.setState({ isFocused: false });
    this.resetCanvas();
    this.drawOpaqueLayer();
    this.cutCorners();
    this.showText();
  }

  handleMouseEnter() {
    this.setState({ isHovered: true }, () => {
      if (this.state.isHovered) {
        this.showText();
      }
    });
    this.resetCanvas();
    this.drawOpaqueLayer();
    this.cutCorners();
  }

  handleMouseExit() {
    this.setState({ isHovered: false }, () => {
      if (!this.state.isHovered) {
        this.hideText();
      }
    });
    this.resetCanvas();
  }

  render() {
    const { width, height, accentColor, image, name, title } = this.props;
    return (
      <ImageCard
        width={width}
        height={height}
        color={accentColor}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseExit}
      >
        <canvas ref="canvas" width={width} height={height} />
        <div ref="overlayText" style={{ display: "none" }}>
          {name}
          {title}
        </div>
        <img ref="image" src={image} alt="" />
      </ImageCard>
    );
  }
}
export default Canvas;
