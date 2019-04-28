import React from "react";
import HomeSlider from "./HomeSlider";
import HomePromotion from "./HomePromotion";
import CardBlocks from "../utils/CardBlock";

import { connect } from "react-redux";
import {
  getProductsByArrival,
  getProductsBySell
} from "../../actions/product.action";

class Home extends React.Component {
  componentDidMount() {
    this.props.getProductsBySell();
    this.props.getProductsByArrival();
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlocks
          list={this.props.product ? this.props.product.product_by_arrival : []}
          title="Arrival Guitars"
        />
        <HomePromotion />
        <CardBlocks
          list={this.props.product ? this.props.product.product_by_sell : []}
          title="Most Selling Guitars"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.Product
  };
};
export default connect(
  mapStateToProps,
  { getProductsByArrival, getProductsBySell }
)(Home);
