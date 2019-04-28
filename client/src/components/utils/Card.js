import React, { Fragment } from "react";
import Button from "./Button";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user.action";
import { withSnackbar } from "notistack";

class Card extends React.Component {
  state = {
    addingToCart: true
  };
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0];
    } else {
      return "/images/image_not_available.png";
    }
  }
  addToCart = () => {
    this.setState({
      addingToCart: false
    });
    this.props.addToCart(this.props._id, () => {
      this.props.enqueueSnackbar("add to card Successfully", {
        variant: "success"
      });
      this.setState({
        addingToCart: true
      });
    });
  };
  render() {
    const props = this.props;
    return (
      <Fragment>
        <div
          style={{ marginTop: "10px" }}
          className={`card_item_wrapper ${props.grid}`}
        >
          <div
            className="image"
            style={{
              background: `url(${this.renderCardImage(props.images)}) no-repeat`
            }}
          />
          <div className="action_container">
            <div className="tags">
              <div className="brand" title={props.brand.name}>
                {props.brand.name.substring(0, 10)}
              </div>
              <div className="name" title={props.name}>
                {props.name.substring(0, 10)}
              </div>
              <div className="name">{props.price}</div>
            </div>
            {props.grid ? (
              <div className="description" title={props.description}>
                <p>{props.description.substring(0, 20)}</p>
              </div>
            ) : null}
            <div className="actions">
              <div className="button_wrapp">
                <Button
                  type="default"
                  altClass="card_link"
                  title="View Product"
                  linkTo={`/product_details/${props._id}`}
                />
              </div>
              <div className="button_wrapp">
                {this.state.addingToCart ? (
                  <Button
                    type="bag_link"
                    runAction={() => {
                      this.props.user.userData.isAuth
                        ? this.addToCart()
                        : console.log("need to login");
                    }}
                  />
                ) : (
                  <Button type="bag_link" runAction={() => {}} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.User
  };
};
export default connect(
  mapStateToProps,
  { addToCart }
)(withSnackbar(Card));
