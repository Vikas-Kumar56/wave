import React, { Fragment } from "react";
import { connect } from "react-redux";
import { AuthUser } from "../actions/user.action";
import CircularProgress from "@material-ui/core/CircularProgress";
import History from "../components/utils/History";

export default (ComposeClass, reload, adminRoute) => {
  class AuthenticationCheck extends React.Component {
    componentDidMount() {
      if (!this.props.user) {
        this.props.AuthUser();
      }
    }
    getView = () => {
      if (this.props.user) {
        let user = this.props.user.userData;
        if (!user.isAuth) {
          if (reload) {
            History.push("/register_login");
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            History.push("/user/dashboard");
          } else {
            if (reload === false) {
              History.push("/user/dashboard");
            }
          }
        }
        return <ComposeClass {...this.props} user={this.props.user} />;
      } else {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
    };
    render() {
      return <Fragment>{this.getView()}</Fragment>;
    }
  }
  const mapStateToProps = state => {
    return {
      user: state.User
    };
  };
  return connect(
    mapStateToProps,
    { AuthUser }
  )(AuthenticationCheck);
};
