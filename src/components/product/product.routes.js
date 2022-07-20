const router = require("express").Router();
const {
    getProducts,
    postProduct,
    putProduct,
    delproduct,
} = require("../product/product.controller");

const isAuth = require("../../middleware/auth");

const validateDto = require("../../middleware/validate_dto");
const productSchema = require("../product/product.validation");


router.get("/:id?", getProducts);
router.post("/", isAuth, validateDto(productSchema) ,postProduct);
router.put("/:id", isAuth, putProduct);
router.delete("/:id", isAuth, delproduct);

module.exports = router;
