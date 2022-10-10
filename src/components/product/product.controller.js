const routeHelper = require("../../utils/routeHelper");
const Product = require("./Product.services")

const getProducts = routeHelper(async (req, res) => {
    const id = req.params.id;
    const category = req.params.category;

    let response
    if (id) response = await Product.findById(id);
    else if (category) response = await Product.findAll({ category });
    else response = await Product.findAll();

    res.status(200).json(response);
})

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
