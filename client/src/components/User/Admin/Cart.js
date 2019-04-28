import React from "react";
import UserLayout from "../../../HOC/User";

import { connect } from "react-redux";
import { getUserCart } from "../../../actions/user.action";
import CircularProgress from "@material-ui/core/CircularProgress";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import UserProductBlock from "./UserProductBlock";

class UserCart extends React.Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
    cartTotal: 0
  };

  componentDidMount() {
    let cartItem = [];
    let user = this.props.user.userData;

    if (user.cart) {
      if (user.cart.length > 0) {
        user.cart.forEach(item => {
          cartItem.push(item.id);
        });

        this.props.getUserCart(cartItem, user.cart);
      } else {
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.cartDetail) {
      let total = 0;
      nextProps.user.cartDetail.forEach(item => {
        total += item.price * item.quantity;
      });

      return {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false,
        cartTotal: total
      };
    }
    return null;
  }
  render() {
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className="user_cart">
            {this.props.user.cartDetail ? (
              <>
                <UserProductBlock
                  products={this.props.user}
                  type="cart"
                  removeItem={id => this.removeItem(id)}
                />
                <div>
                  <div className="user_cart_sum">
                    <div>Total amount: {this.state.cartTotal}</div>
                  </div>
                </div>
              </>
            ) : (
              <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
            )}
          </div>
        </div>
      </UserLayout>
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
  { getUserCart }
)(UserCart);
