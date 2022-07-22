const routeHelper = require("../../utils/routeHelper");
const Product = require("./Product.services")

const getProducts = routeHelper(async (req, res) => {
    const { id } = req.params;

    const response = id ? await Product.findById(id) : await Product.findAll();
    res.status(200).json(response);
});

const postProduct = routeHelper(async (req, res) => {
    const response = await Product.save(req.body);
    res.status(201).json(response);
});

const putProduct = routeHelper(async (req, res) => {
    const { id } = req.params;

    const response = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json(response);
});

const delproduct = routeHelper(async (req, res) => {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
    res.status(204).send();
});

module.exports = {
    getProducts,
    postProduct,
    putProduct,
    delproduct,
};
