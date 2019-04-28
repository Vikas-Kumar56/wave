import React from "react";
import FormField from "../../utils/FormField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { update, generateFormData, isFormValid } from "../../utils/FormAction";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { getBrands, addBrand } from "../../../actions/product.action";

class ManageBrand extends React.Component {
  state = {
    reset: false,
    formError: false,
    formValid: false,
    formSuccess: "",
    formData: {
      name: {
        element: "input",
        value: "",
        label: "Brand Name",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter Brand name "
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
    this.props.getBrands();
  }
  updateForm = element => {
    let formData = update(element, this.state.formData, "brand");

    let formValid = isFormValid(this.state, "brand");
    this.setState({
      formValid,
      formData
    });
  };
  showCategoryItems = () =>
    this.props.brands.map((item, index) => (
      <div className="category_item" key={item._id}>
        {item.name}
      </div>
    ));

  submitForm = event => {
    event.preventDefault();
    let validData = generateFormData(this.state.formData, "brands");
    this.props.addBrand(validData, () => {
      this.resetForm();
      this.props.enqueueSnackbar("Brands created Successfully", {
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
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.props.brands.length > 0 ? (
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
              <button type="submit">Add Brand</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    brands: state.Product.brands
  };
};
export default connect(
  mapStateToProps,
  { getBrands, addBrand }
)(withSnackbar(ManageBrand));
