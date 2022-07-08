const {
  getProducts,
  postProduct,
  putProduct,
  delproduct,
} = require("../controllers/productos.controller");
const { isAuth } = require("../middleware/auth");

const router = require("express").Router();

router.get("/:id?", getProducts);
router.post("/", isAuth, postProduct);
router.put("/:id", isAuth, putProduct);
router.delete("/:id", isAuth, delproduct);

module.exports = router;
