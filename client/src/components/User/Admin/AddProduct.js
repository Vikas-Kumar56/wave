import React from "react";
import UserLayout from "../../../HOC/User";
import FileUpload from "../../utils/FileUpload";
import FormField from "../../utils/FormField";
import { update, generateFormData, isFormValid } from "../../utils/FormAction";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import {
  getBrands,
  getWoods,
  addProduct
} from "../../../actions/product.action";

class AddProduct extends React.Component {
  state = {
    reset: false,
    formError: false,
    formValid: false,
    formSuccess: "",
    formData: {
      name: {
        element: "input",
        value: "",
        label: "Product Name",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter product name "
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      description: {
        element: "textarea",
        value: "",
        label: "Product description",
        config: {
          name: "description_input",
          type: "text",
          placeholder: "Enter product description "
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      price: {
        element: "input",
        value: "",
        label: "Product price",
        config: {
          name: "price_input",
          type: "number",
          placeholder: "Enter product price "
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      brand: {
        element: "select",
        value: "",
        label: "Product brand",
        config: {
          name: "brands_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      shipping: {
        element: "select",
        value: "",
        label: "Shipping",
        config: {
          name: "shipping_input",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      available: {
        element: "select",
        value: "",
        label: "Available, in stock",
        config: {
          name: "available_input",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      wood: {
        element: "select",
        value: "",
        label: "Wood material",
        config: {
          name: "wood_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      frets: {
        element: "select",
        value: "",
        label: "Frets",
        config: {
          name: "frets_input",
          options: [
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      publish: {
        element: "select",
        value: "",
        label: "Publish",
        config: {
          name: "publish_input",
          options: [
            { key: true, value: "Publish" },
            { key: false, value: "Hidden" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount() {
    this.props.getBrands();
    this.props.getWoods();
  }

  updateForm = element => {
    let formData = update(element, this.state.formData, "add_product");

    let formValid = isFormValid(this.state, "add_product");
    this.setState({
      formValid,
      formData
    });
  };

  resetForm = () => {
    this.setState({ reset: true });
    let formdata = this.state.formData;
    for (let key in formdata) {
      formdata[key].value = "";
      formdata[key].valid = false;
      formdata[key].touched = false;
      formdata[key].validationMessage = "";
    }
    this.setState({
      reset: false,
      formData: formdata
    });
  };

  populateOptionsFields = (options = [], type) => {
    if (type === "brand") {
      let brand = options.map(opt => {
        return {
          key: opt._id,
          value: opt.name
        };
      });
      let formData = this.state.formData;
      formData[type].config.options = brand;
      this.setState({
        formData
      });
    } else if (type === "wood") {
      let wood = options.map(opt => {
        return {
          key: opt._id,
          value: opt.name
        };
      });
      let formData = this.state.formData;
      formData[type].config.options = wood;
      this.setState({
        formData
      });
    }
  };
  componentDidUpdate(oldProps) {
    if (oldProps.brand !== this.props.brand) {
      this.populateOptionsFields(this.props.brand, "brand");
    }

    if (oldProps.wood !== this.props.wood) {
      this.populateOptionsFields(this.props.wood, "wood");
    }
  }
  submitForm = event => {
    event.preventDefault();
    let validData = generateFormData(this.state.formData, "add_product");
    this.props.addProduct(validData, () => {
      this.resetForm();
      this.props.enqueueSnackbar("Product created Successfully", {
        variant: "success"
      });
    });
    console.log(validData);
  };
  imagesHandler = images => {
    let { formData } = this.state;
    formData.images.value = images.map(img => {
      return img.url;
    });

    this.setState({
      formData
    });
  };
  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={this.submitForm}>
            <FileUpload
              reset={this.state.reset}
              imagesHandler={images => this.imagesHandler(images)}
            />
            <FormField
              id={"name"}
              formData={this.state.formData.name}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"description"}
              formData={this.state.formData.description}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              formData={this.state.formData.price}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"brand"}
              formData={this.state.formData.brand}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"shipping"}
              formData={this.state.formData.shipping}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"wood"}
              formData={this.state.formData.wood}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"available"}
              formData={this.state.formData.available}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"frets"}
              formData={this.state.formData.frets}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"publish"}
              formData={this.state.formData.publish}
              change={element => this.updateForm(element)}
            />
            <button disabled={!this.state.formValid} type="submit">
              Add Product
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    brand: state.Product.brands,
    wood: state.Product.woods
  };
};
export default connect(
  mapStateToProps,
  { getBrands, getWoods, addProduct }
)(withSnackbar(AddProduct));
