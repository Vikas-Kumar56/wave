import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

class CollapseCheckbox extends React.Component {
  state = {
    open: false,
    checked: []
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: true
      });
    }
  }
  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };
  handleAngleArrow = () => {
    if (this.state.open) {
      return <FontAwesomeIcon className="icon" icon={faAngleUp} />;
    } else {
      return <FontAwesomeIcon className="icon" icon={faAngleDown} />;
    }
  };
  handleCheckbox = id => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked
      },
      () => {
        this.props.handleFilters(newChecked);
      }
    );
  };
  renderList = () =>
    this.props.list.length > 0 ? (
      this.props.list.map(value => (
        <ListItem key={value._id} style={{ padding: "10px 0px" }}>
          <ListItemText primary={value.name} />
          <ListItemSecondaryAction>
            <Checkbox
              onChange={() => this.handleCheckbox(value._id)}
              checked={this.state.checked.indexOf(value._id) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))
    ) : (
      <div style={{ margin: "auto" }}>
        <CircularProgress style={{ color: "#2196F3" }} thickness={4} />
      </div>
    );
  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10px 0px" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngleArrow()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
