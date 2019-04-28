import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const links = [
  {
    name: "My Account",
    linkTo: "/user/dashboard"
  },
  {
    name: "User information",
    linkTo: "/user/user_profile"
  },
  {
    name: "My Cart",
    linkTo: "/user/cart"
  }
];

const admin = [
  {
    name: "Site info",
    linkTo: "/admin/site_info"
  },
  {
    name: "Add products",
    linkTo: "/admin/add_product"
  },
  {
    name: "Manage categories",
    linkTo: "/admin/manage_categories"
  }
];

const UserLayout = props => {
  const generateLinks = links => {
    return links.map((item, index) => (
      <Link to={item.linkTo} key={index}>
        {item.name}
      </Link>
    ));
  };
  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h1>My Account</h1>
          <div className="links">{generateLinks(links)}</div>
          {props.user && props.user.isAdmin ? (
            <div>
              <h1>Admin</h1>
              <div className="links">{generateLinks(admin)}</div>
            </div>
          ) : null}
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.User.userData
  };
};

export default connect(mapStateToProps)(UserLayout);
