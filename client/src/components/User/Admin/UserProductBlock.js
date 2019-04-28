import React from "react";

const UserProductBlock = props => {
  const cartImage = images => {
    if (images.length > 0) {
      return images[0];
    }

    return "/images/image_not_available.png";
  };
  const removeItem = id => {
    props.removeItem(id);
  };
  const renderItems = () => {
    return props.products.cartDetail
      ? props.products.cartDetail.map(product => {
          return (
            <div
              style={{
                boxShadow: "1px 1px 1px #f9f5f5"
              }}
              className="user_product_block"
              key={product._id}
            >
              <div className="item">
                <div
                  className="image"
                  style={{
                    background: `url(${cartImage(product.images)}) no-repeat`,
                    borderRadius: "5px",
                    boxShadow: " 1px 2px 2px #f1ebeb"
                  }}
                />
              </div>
              <div className="item">
                <h4>Product Name</h4>
                <p>
                  {product.brand.name} | {product.name}
                </p>
              </div>
              <div className="item">
                <h4>Quantity</h4>
                <p>{product.quantity} </p>
              </div>
              <div className="item">
                <h4>Price</h4>
                <p>{product.price * product.quantity} </p>
              </div>
              <div className="item btn">
                <div
                  className="cart_remove_btn"
                  onClick={() => removeItem(product._id)}
                >
                  Remove
                </div>
              </div>
            </div>
          );
        })
      : null;
  };
  return <>{renderItems()}</>;
};

export default UserProductBlock;
