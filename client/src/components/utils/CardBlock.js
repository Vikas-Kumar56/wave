import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "./Card";

const CardBlock = props => {
  const renderCards = list =>
    list ? list.map((card, index) => <Card {...card} key={index} />) : null;
  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title"> {props.title} </div> : null}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {props.list && props.list.length > 0 ? (
            renderCards(props.list)
          ) : (
            <div style={{ margin: "auto" }}>
              <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
