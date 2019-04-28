import React from "react";
import LightBox from "react-images";

class ImageLightBox extends React.Component {
  state = {
    lightBoxIsOpen: true,
    currentImage: this.props.pos,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach(item => {
        images.push(item);
      });

      return {
        images
      };
    }

    return false;
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  closeLightBox = () => {
    this.props.onClose();
  };

  handleThumbnailClick = pos => {
    this.setState({
      currentImage: pos
    });
  };
  render() {
    return (
      <div>
        <LightBox
          currentImage={this.state.currentImage}
          images={this.state.images}
          isOpen={this.state.lightBoxIsOpen}
          onClickPrev={() => this.gotoPrevious()}
          onClickNext={() => this.gotoNext()}
          onClose={() => this.closeLightBox()}
          showThumbnails={true}
          showImageCount={true}
          onClickThumbnail={this.handleThumbnailClick}
          backdropClosesModal={true}
          showCloseButton={false}
        />
      </div>
    );
  }
}

export default ImageLightBox;
