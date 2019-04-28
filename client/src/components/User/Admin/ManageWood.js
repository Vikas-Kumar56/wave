import React from "react";
import FormField from "../../utils/FormField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { update, generateFormData, isFormValid } from "../../utils/FormAction";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { getWoods, addWood } from "../../../actions/product.action";

class ManageWood extends React.Component {
  state = {
    reset: false,
    formError: false,
    formValid: false,
    formSuccess: "",
    formData: {
      name: {
        element: "input",
        value: "",
        label: "Wood Name",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter Wood name "
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
  componentDidMount() {
    this.props.getWoods();
  }
  updateForm = element => {
    let formData = update(element, this.state.formData, "wood");

    let formValid = isFormValid(this.state, "wood");
    this.setState({
      formValid,
      formData
    });
  };
  showCategoryItems = () =>
    this.props.woods.map((item, index) => (
      <div className="category_item" key={item._id}>
        {item.name}
      </div>
    ));

  submitForm = event => {
    event.preventDefault();
    let validData = generateFormData(this.state.formData, "wood");
    this.props.addWood(validData, () => {
      this.resetForm();
      this.props.enqueueSnackbar("Wood created Successfully", {
        variant: "success"
      });
    });
  };

  resetForm = () => {
    let formdata = this.state.formData;
    for (let key in formdata) {
      formdata[key].value = "";
      formdata[key].valid = false;
      formdata[key].touched = false;
      formdata[key].validationMessage = "";
    }
    this.setState({
      formData: formdata
    });
  };

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.props.woods.length > 0 ? (
                this.showCategoryItems()
              ) : (
                <div className="category_item">
                  <CircularProgress
                    style={{ color: "white", textAlign: "center" }}
                    thickness={3}
                  />
                  <p
                    style={{
                      display: "inline-block",
                      marginLeft: "15px"
                    }}
                  >
                    {" "}
                    Loading...
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="right">
            <form onSubmit={this.submitForm}>
              <FormField
                id={"name"}
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              <button type="submit">Add Wood</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    woods: state.Product.woods
  };
};
export default connect(
  mapStateToProps,
  { getWoods, addWood }
)(withSnackbar(ManageWood));
