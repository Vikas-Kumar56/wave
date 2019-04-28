import React from "react";
import LightBox from "../utils/LightBox";

class ProductImage extends React.Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];
      this.props.detail.images.forEach(item => {
        lightboxImages.push({
          src: item,
          thumbnail: item
        });
      });

      this.setState({
        lightboxImages
      });
    }
  }
  renderCardImage = images => {
    if (images.length > 0) {
      return images[0];
    } else {
      return "/images/image_not_available.png";
    }
  };
  handleLightBox = index => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: index
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    });
  };
  showThumbs = () =>
    this.state.lightboxImages.map((item, index) =>
      index > 0 ? (
        <div
          key={index}
          onClick={() => this.handleLightBox(index)}
          className="thumb"
          style={{ background: `url(${item.src}) no-repeat` }}
        />
      ) : null
    );
  render() {
    const { detail } = this.props;
    const imageProps = { width: 400, height: 250, zoomWidth: 500, img: "" };
    imageProps.img = this.renderCardImage(detail.images);
    return (
      <div className="product_image_container" style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }} className="main_thumbs">
          {this.showThumbs(detail)}
        </div>
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>

        {this.state.lightbox ? (
          <LightBox
            id={detail._id}
            images={this.state.lightboxImages}
            open={this.state.lightbox}
            pos={this.state.imagePos}
            onClose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProductImage;
