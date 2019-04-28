import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogOutUser } from "../../../actions/user.action";

class Header extends React.Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Guitars",
        linkTo: "/shop",
        public: true
      }
    ],
    user: [
      {
        name: "My Cart",
        linkTo: "/user/cart",
        public: false
      },
      {
        name: "My Account",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "Log in",
        linkTo: "/register_login",
        public: true
      },
      {
        name: "Log out",
        linkTo: "/user/logout",
        public: false
      }
    ]
  };
  logOutHandler = () => {
    this.props.LogOutUser();
  };
  defaultLink = (item, index) =>
    item.name === "Log out" ? (
      <div className="log_out_link" key={index} onClick={this.logOutHandler}>
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={index}>
        {item.name}
      </Link>
    );
  cartLink = (item, index) => {
    const user = this.props.user.userData;
    return (
      <div className="cart_link" key={index}>
        <span>{user.cart ? user.cart.length : 0}</span>
        {this.defaultLink(item, index)}
      </div>
    );
  };
  showLinks = links => {
    let list = [];

    if (this.props.user && this.props.user.userData) {
      links.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public) {
            list.push(item);
          }
        } else {
          if (item.name !== "Log in") {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, index) => {
      if (item.name !== "My Cart") {
        return this.defaultLink(item, index);
      } else {
        return this.cartLink(item, index);
      }
    });
  };
  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(this.state.user)}</div>
            <div className="bottom">{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
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
  { LogOutUser }
)(Header);
