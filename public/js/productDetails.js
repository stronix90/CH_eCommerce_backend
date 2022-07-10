
const addToCart = (productId) => {
    axios.post(`/api/v1/carrito/productos/${productId}`);
};
