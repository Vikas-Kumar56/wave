import React from "react";
import UserLayout from "../../HOC/User";
import Button from "../utils/Button";

class UserDashboard extends React.Component {
  render() {
    return (
      <UserLayout>
        <div>
          <div className="user_nfo_panel">
            <h1>User information</h1>
            <div>
              <span>
                <b>Name:</b> {this.props.user.userData.name}
              </span>
              <span>
                <b>Last name:</b> {this.props.user.userData.lastname}
              </span>
              <span>
                <b>Email:</b> {this.props.user.userData.email}
              </span>
            </div>
            <Button
              type="default"
              title="Edit acccount information"
              linkTo="/user/user_profile"
            />
          </div>
          <div className="user_nfo_panel">
            <h1>Purchase History</h1>
            <div className="user_product_block_wrapper">History</div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default UserDashboard;
