import React from "react";
import { connect } from "react-redux";
import FormField from "../utils/FormField";
import { LogIn as LogInAction } from "../../actions/user.action";
import { update, generateFormData, isFormValid } from "../utils/FormAction";
import History from "../utils/History";
class LogIn extends React.Component {
  state = {
    formError: false,
    formValid: false,
    formSuccess: "",
    serverError: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email "
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password "
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  submitForm = event => {
    event.preventDefault();
    let validData = generateFormData(this.state.formData, "login");
    this.props.LogInAction(validData, message => {
      if (message) {
        let formData = this.state.formData;
        for (let key in message) {
          formData[key].validationMessage = message[key];
          formData[key].valid = false;
          formData[key].touched = true;
        }
        this.setState({ formData });
      } else {
        History.push("/user/dashboard");
      }
    });
  };
  updateForm = element => {
    let formData = update(element, this.state.formData, "login");

    let formValid = isFormValid(this.state, "login");
    this.setState({
      formValid,
      formData
    });
  };
  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={this.submitForm}>
          <FormField
            id={"email"}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"password"}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
          />
          <button disabled={!this.state.formValid} type="submit">
            LogIn
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { LogInAction }
)(LogIn);
