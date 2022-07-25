// Make a request for a user with a given ID
axios.get("/api/v1/productos/").then((res) => {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = DOM_drawContainer(res.data);

    const productsList = document.getElementById("productsList");
    if (res.data) productsList.appendChild(DOM_drawItems(res.data));
});

const DOM_drawContainer = (data) => {
    if (!data) {
        return `
      <h5 class="text-center">No hay productos</h5>`;
    } else {
        return `
        <ul id="productsList" style="padding: 0;" class="customRow">
            <li class="row align-items-center" href: >
                <div class="col p-2 ps-3"><b>Producto</b></div>
                <div class="col-2 p-2 text-center"><b>Precio</b></div>
            </li>
        </ul>`;
    }
};

const DOM_drawItems = (data) => {
    let items = "";
    console.log(data);

    data?.map((prod) => {
        items += `
        <li class="row align-items-center my-2" onclick="openProduct('${prod.id}')">

          <div class="col-auto p-2">
            <img
              class="productImage"
              src="${prod.thumbnail}"
              alt="${prod.title}"
              />
            </div>
  
            <div class="col p-2">${prod.title}</div>
  
            <div class="col-2 p-2 text-center">$${prod.price}</div>
  
        </li>`;
    });
    return document.createRange().createContextualFragment(items);
};

const openProduct = (id) => {
    window.location.href = `/productos/${id}`;
}