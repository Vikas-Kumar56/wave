import React from "react";
import Button from "../utils/Button";
import Login from "./Login";

class RegisterLogin extends React.Component {
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <h2>New Customer</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
                euismod nisi porta lorem mollis aliquam ut porttitor leo. Est
                sit amet facilisis magna etiam tempor orci. Adipiscing elit duis
                tristique sollicitudin nibh sit amet
              </p>
              <Button
                type="default"
                title="Create an account"
                linkTo="/register"
                addStyles={{ margin: "10px 0px 0px 0px" }}
              />
            </div>
            <div className="right">
              <h2>Registered Customer</h2>
              <p>If you have account. Please login</p>
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterLogin;
