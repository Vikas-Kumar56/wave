import React from "react";
import { connect } from "react-redux";
import PageTop from "../utils/PageTop";
import {
  getBrands,
  getWoods,
  getProductToShop
} from "../../actions/product.action";
import LoadMoreCards from "./LoadMoreCards";
import CollapseCheckbox from "../utils/CollapseCheckbox";
import CollapseRadio from "../utils/CollapseRadio";
import { FRETS, Price } from "../utils/misc";
import CircularProgress from "@material-ui/core/CircularProgress";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

class Shop extends React.Component {
  state = {
    loading: true,
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  };
  componentDidMount() {
    this.props.getProductToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    );
    this.props.getWoods();
    this.props.getBrands();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.state.loading) {
        this.setState({
          loading: false
        });
      }
    }
  }
  handleFilters = (filtersArray, type) => {
    const { filters } = this.state;

    if (type === "price") {
      Price.forEach(val => {
        if (val._id === +filtersArray) {
          filters[type] = val.array;
        }
      });
    } else {
      filters[type] = filtersArray;
    }
    this.setState(
      {
        filters,
        skip: 0,
        loading: true
      },
      () => {
        this.props.getProductToShop(
          this.state.skip,
          this.state.limit,
          this.state.filters
        );
      }
    );
  };
  loadMore = () => {
    let skip = this.state.skip + this.state.limit;
    this.setState(
      {
        skip
      },
      () => {
        this.props.getProductToShop(
          this.state.skip,
          this.state.limit,
          this.state.filters,
          this.props.product.list
        );
      }
    );
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : ""
    });
  };
  render() {
    return (
      <div>
        <PageTop title="Browse products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={
                  this.props.product
                    ? this.props.product.brands
                      ? this.props.product.brands
                      : []
                    : []
                }
                handleFilters={filters => this.handleFilters(filters, "brand")}
              />
              <CollapseCheckbox
                initState={true}
                title="Frets"
                list={FRETS}
                handleFilters={filters => this.handleFilters(filters, "frets")}
              />
              <CollapseCheckbox
                initState={true}
                title="Woods"
                list={
                  this.props.product
                    ? this.props.product.woods
                      ? this.props.product.woods
                      : []
                    : []
                }
                handleFilters={filters => this.handleFilters(filters, "wood")}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={Price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={this.handleGrid}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={this.handleGrid}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
                <div>
                  {this.state.loading ? (
                    <div
                      className="main_loader"
                      style={{ marginBottom: "20px" }}
                    >
                      <CircularProgress
                        style={{ color: "#2196F3" }}
                        thickness={7}
                      />
                    </div>
                  ) : (
                    <LoadMoreCards
                      loadMore={() => this.loadMore()}
                      grid={this.state.grid}
                      limit={this.state.limit}
                      list={
                        this.props.product
                          ? this.props.product.list
                            ? this.props.product.list
                            : []
                          : []
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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
  { getBrands, getWoods, getProductToShop }
)(Shop);
