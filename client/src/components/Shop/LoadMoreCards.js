import React from "react";
import ShopCards from "../utils/ShopCards";
import CircularProgress from "@material-ui/core/CircularProgress";

class LoadMoreCards extends React.Component {
  state = {
    loading: false
  };
  handleLoadMore = () => {
    this.setState(
      {
        loading: true
      },
      () => {
        this.props.loadMore();
      }
    );
  };

  componentDidUpdate(preProps) {
    if (preProps.list !== this.props.list) {
      if (this.state.loading) {
        this.setState({
          loading: false
        });
      }
    }
  }
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <div>
          <ShopCards grid={this.props.grid} list={this.props.list} />
        </div>
        <div className="load_more_container">
          {this.state.loading ? (
            <span style={{ backgroundColor: "white" }}>
              <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
            </span>
          ) : (
            <span onClick={() => this.handleLoadMore()}>Load More</span>
          )}
        </div>
      </div>
    );
  }
}

export default LoadMoreCards;
