import React from "react";
import Button from "../utils/Button";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

const ProductInfo = props => {
  const showProductSpecifications = detail => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets:</strong>
          {detail.frets}
        </div>
        <div className="item">
          <strong>Wood:</strong>
          {detail.wood.name}
        </div>
      </div>
    </div>
  );
  const showProductActions = detail => (
    <div className="product_actions">
      <div className="price">Rs {detail.price}</div>
      <div className="cart">
        <Button
          type="add_to_cart_link"
          runAction={() => {
            console.log("add to cart");
          }}
        />
      </div>
    </div>
  );
  const showProductTag = detail => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free Shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Available</div>
            <div>in Store </div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Available</div>
            <div>preorder only </div>
          </div>
        </div>
      )}
    </div>
  );
  const { detail } = props;
  return (
    <div>
      <h1>
        {detail.brand.name} | {detail.name}
      </h1>
      <p>{detail.description}</p>
      {showProductTag(detail)}
      {showProductActions(detail)}
      {showProductSpecifications(detail)}
    </div>
  );
};

export default ProductInfo;
