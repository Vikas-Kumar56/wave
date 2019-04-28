import React from "react";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faShoppinBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";

const Button = ({ type, title, addStyles, linkTo, altClass, runAction }) => {
  const button = () => {
    let template = "";
    switch (type) {
      case "default":
        template = (
          <Link
            to={linkTo}
            style={addStyles}
            className={altClass ? altClass : "link_default"}
          >
            {title}
          </Link>
        );
        break;
      case "bag_link":
        template = (
          <div className="bag_link" onClick={() => runAction()}>
            <FontAwesomeIcon icon={faShoppinBag} />
          </div>
        );
        break;
      case "add_to_cart_link":
        template = (
          <div
            className="add_to_cart_link"
            onClick={() => {
              runAction();
            }}
          >
            <FontAwesomeIcon icon={faShoppinBag} />
            Add to cart
          </div>
        );
        break;
      default:
        template = "";
    }
    return template;
  };
  return <div className="my_link">{button()}</div>;
};

export default Button;
