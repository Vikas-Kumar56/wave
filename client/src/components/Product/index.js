import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PageTop from "../utils/PageTop";
import { connect } from "react-redux";
import { getProductById } from "../../actions/product.action";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";

class Product extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProductById(id);
  }

  renderProductView = () => (
    <div className="product_detail_wrapper">
      <div className="left" style={{ minWidth: "500px" }}>
        <ProductImage detail={this.props.product.data} />
      </div>
      <div className="right">
        <ProductInfo
          addToCart={id => this.addToCart(id)}
          detail={this.props.product.data}
        />
      </div>
    </div>
  );
  render() {
    return (
      <div>
        <PageTop title="Product's details" />
        <div className="container">
          {this.props.product.data ? (
            this.renderProductView()
          ) : this.props.product.error ? (
            <h2>{this.props.product.error}</h2>
          ) : (
            <div
              style={{
                margin: "auto"
              }}
            >
              <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.Product.product_by_id
  };
};
export default connect(
  mapStateToProps,
  { getProductById }
)(Product);
