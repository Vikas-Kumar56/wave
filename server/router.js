const authentication = require("./controller/authentication");
const authMiddleware = require("./middleware/auth");
const brandController = require("./controller/brand");
const adminMiddleware = require("./middleware/admin");
const woodController = require("./controller/wood");
const productController = require("./controller/product");
module.exports = function(app, formidable, cloudinary) {
  /*
     user routes start
  */
  app.post("/api/users/register", authentication.register);

  app.post("/api/users/login", authentication.signin);
  app.get("/api/users/logout", authMiddleware, authentication.signOut);
  app.get("/api/users/auth", authMiddleware, (req, res) => {
    res.json({
      isAuth: true,
      name: req.user.name,
      lastname: req.user.lastname,
      email: req.user.email,
      isAdmin: req.user.role === 1 ? true : false,
      cart: req.user.cart,
      history: req.user.history
    });
  });

  app.post(
    "/api/users/uploadimage",
    authMiddleware,
    adminMiddleware,
    formidable(),
    (req, res) => {
      cloudinary.uploader.upload(
        req.files.file.path,
        result => {
          res.status(200).json(result);
        },
        {
          public_id: `${Date.now()}`,
          resource_type: "auto"
        }
      );
    }
  );

  app.get("/api/users/removeimage", authMiddleware, (req, res) => {
    let public_id = req.query.public_id;

    cloudinary.uploader.destroy(public_id, (result, error) => {
      if (error) {
        return res.status(500).json({ success: false });
      }

      res.status(200).json({ success: true });
    });
  });

  app.post("/api/users/addTocart", authMiddleware, authentication.addToCart);
  /*  
    user route end here
  */
  /*
   Brand routes start
 */

  app.post(
    "/api/product/brand",
    authMiddleware,
    adminMiddleware,
    brandController.brand
  );

  app.get("/api/product/brands", brandController.getAllBrands);

  /*
   Brand routes end
 */

  /*
   Woods routes start
 */

  app.post(
    "/api/product/wood",
    authMiddleware,
    adminMiddleware,
    woodController.createWood
  );

  app.get("/api/product/woods", woodController.getAllWoods);

  app.post(
    "/api/product/article",
    authMiddleware,
    adminMiddleware,
    productController.createProduct
  );

  app.get("/api/product/articlebyid", productController.getArticleById);

  app.get("/api/product/articles", productController.getAllArticles);

  app.post("/api/product/shop", productController.getShop);
};
