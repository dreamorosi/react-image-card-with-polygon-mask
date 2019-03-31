import React from "react";

class Canvas extends React.Component {
  constructor() {
    super();

    this.state = {
      isHovered: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
    this.cutCorners = this.cutCorners.bind(this);
    this.drawBorders = this.drawBorders.bind(this);
    this.drawOpaqueLayer = this.drawOpaqueLayer.bind(this);
    this.drawShape = this.drawShape.bind(this);
  }

  componentDidMount() {
    const { canvas, image } = this.refs;
    const { width, height } = this.props;

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
    let { width, height, parentBackgroundColor } = this.props;
    let { ctx } = this;

    this.setState({ isHovered: true });

    ctx.beginPath();
    ctx.fillStyle = parentBackgroundColor;
    ctx.moveTo(0, 0);
    ctx.lineTo(width * 0.3, 0);
    ctx.lineTo(0, height * 0.3);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = parentBackgroundColor;
    ctx.moveTo(width, height * 0.7);
    ctx.lineTo(width, height);
    ctx.lineTo(width * 0.7, width);
    ctx.fill();
    ctx.closePath();
  }

  drawBorders() {
    const { borderColor } = this.props;
    const { ctx } = this;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    this.drawShape(ctx);
    ctx.stroke();
  }

  drawShape(ctx) {
    const { width, height, borderThickness } = this.props;

    ctx.moveTo(width * 0.3, borderThickness);
    ctx.lineTo(borderThickness, height * 0.3);
    ctx.moveTo(width * 0.3, borderThickness);
    ctx.lineTo(width - borderThickness, borderThickness);
    ctx.lineTo(width - borderThickness, height * 0.7);
    ctx.lineTo(width * 0.7, height - borderThickness);
    ctx.lineTo(borderThickness, height - borderThickness);
    ctx.lineTo(borderThickness, height * 0.3);
  }

  drawOpaqueLayer() {
    const { hoverFillStyle } = this.props;
    const { ctx } = this;

    ctx.beginPath();
    ctx.fillStyle = hoverFillStyle;
    this.drawShape(ctx);
    ctx.fill();
  }

  handleMouseDown() {
    this.drawBorders();
  }

  handleMouseUp() {
    const { isHovered } = this.state;
    this.resetCanvas();
    if (isHovered) {
      if (this.props.hoverFillStyle) {
        this.drawOpaqueLayer();
      }
      this.cutCorners();
    }
  }

  handleMouseEnter() {
    this.setState({ isHovered: true });
    if (this.props.hoverFillStyle) {
      this.drawOpaqueLayer();
    }
    this.cutCorners();
  }

  handleMouseExit() {
    this.setState({ isHovered: false });
    this.resetCanvas();
  }

  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseExit}
        />
        <img
          ref="image"
          src={this.props.image}
          style={{ display: "none" }}
          alt=""
        />
      </div>
    );
  }
}
export default Canvas;
