
const addToCart = async (productId) => {
    const res = await axios.post(`/api/v1/carrito/productos/${productId}`);
    if (res.status === 200) {
        alert('Producto agregado al carrito');
    }
};
