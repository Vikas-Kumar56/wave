import React from "react";
import Card from "./Card";

const ShopCards = props => {
  const renderCards = list =>
    list.map(card => <Card key={card._id} {...card} grid={props.grid} />);
  return (
    <div className="card_block_shop">
      <div>
        <div>
          {props.list.length === 0 ? <div>Sorry, no results</div> : null}
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default ShopCards;
