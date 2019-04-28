import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class CollapseRadio extends React.Component {
  state = {
    open: false,
    value: "0"
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
  renderList = () =>
    this.props.list ? (
      this.props.list.map(value => (
        <FormControlLabel
          key={value._id}
          value={`${value._id}`}
          control={<Radio />}
          label={value.name}
        />
      ))
    ) : (
      <div style={{ margin: "auto" }}>
        <CircularProgress style={{ color: "#2196F3" }} thickness={4} />
      </div>
    );
  handleChange = event => {
    this.setState(
      {
        value: event.target.value
      },
      () => {
        this.props.handleFilters(this.state.value);
      }
    );
  };
  render() {
    return (
      <div>
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
              <RadioGroup
                aria-label="price"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
