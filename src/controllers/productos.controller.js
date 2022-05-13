const { productsDao } = require("../daos/index");

const getProducts = async (req, res) => {
    const { id } = req.params;

    const response = id
        ? await productsDao.find(id)
        : await productsDao.findAll();
    res.json(response);
};

const postProduct = async (req, res) => {
    const response = await productsDao.save(req.body);
    res.json(response);
};

const putProduct = async (req, res) => {
    const { id } = req.params;

    const response = await productsDao.update(id, req.body);
    res.json(response);
};

const delproduct = async (req, res) => {
    const { id } = req.params;

    const response = await productsDao.delete(id);
    res.json(response);
};

module.exports = {
    getProducts,
    postProduct,
    putProduct,
    delproduct,
};
