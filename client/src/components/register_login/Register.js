import React from "react";
import { connect } from "react-redux";
import FormField from "../utils/FormField";
import { RegisterUser } from "../../actions/user.action";
import { update, generateFormData, isFormValid } from "../utils/FormAction";

class Register extends React.Component {
  state = {
    formError: false,
    formValid: false,
    formSuccess: "",
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
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your first name "
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your last name "
        },
        validation: {
          required: true
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
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirmpassword_input",
          type: "password",
          placeholder: "Enter your password again "
        },
        validation: {
          required: true,
          confirm: "password"
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
    this.props.RegisterUser(validData);
  };
  updateForm = element => {
    let formData = update(element, this.state.formData, "login");

    let formValid = isFormValid(this.state, "login");
    this.setState({
      formValid,
      formData
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.error) {
      let formdata = this.state.formData;
      for (let key in nextProps.user.error) {
        if (formdata[key]) {
          formdata[key].valid = false;
          formdata[key].validationMessage = nextProps.user.error[key];
        }
      }
      this.setState({ formData: formdata });
    }
  }
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={this.submitForm}>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"name"}
                      formData={this.state.formData.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastname"}
                      formData={this.state.formData.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div className="form_block_one">
                  <div className="block">
                    <FormField
                      id={"email"}
                      formData={this.state.formData.email}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <h2>Verify Password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"password"}
                      formData={this.state.formData.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"confirmPassword"}
                      formData={this.state.formData.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>

                <button disabled={!this.state.formValid} type="submit">
                  Create an account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
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
  { RegisterUser }
)(Register);
