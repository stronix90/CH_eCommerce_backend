document.getElementById("createOrderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    sendOrder();
})


window.onload = async function () {
    const data = await getData();
    const itemsDOM = createItemDOM(data.products);
    console.log(data);

    document.getElementById("cartContainer").appendChild(itemsDOM);
    document.getElementById("total").innerHTML = `$${data.total}`;
    document.getElementById("email").value = data.email;
};

const getData = () => {
    return axios
        .get("http://localhost:8080/api/v1/carrito")
        .then((res) => res.data)
        .catch((err) => console.log(err));
};

const createItemDOM = (items) => {
    let itemsDOM = `
        <lh class="row align-items-center" >
            <div class="col p-2 p-2"><b>Producto</b></div>
            <div class="col-2 p-2 text-center"><b>Acciones</b></div>
            <div class="col-2 p-2 text-center"><b>Precio</b></div>
            <div class="col-2 p-2 text-center"><b>Cantidad</b></div>
            <div class="col-2 p-2 pe-4 text-end"><b>Subtotal</b></div>
        </lh>`;

    items.map((prod) => {
        itemsDOM += `
                <li class="row align-items-center my-2">
    
                    <div class="col p-2">${prod.title}</div>
          
                    <div class="col-2 p-2 text-center">
                        <button onclick="removeProduct('${
                            prod.id
                        }')"><i class="fa fa-trash" style="margin:5px"></i></button>
                    </div>

                    <div class="col-2 p-2 text-center">$${prod.price}</div>
                    
                    <div class="col-2 p-2 text-center">${prod.quantity}</div>

                    <div class="col-2 p-2 pe-4 text-end">$${
                        prod.quantity * prod.price
                    }</div>


                </li>`;
    });

    return document.createRange().createContextualFragment(itemsDOM);
};

const removeProduct = (id) => {
    axios
        .delete(`http://localhost:8080/api/v1/carrito/productos/${id}`)
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => console.log(err));
};

const sendOrder = () => {
    const deliveryAddress = document.getElementById("deliveryAddress").value;
    const deliveryDate = document.getElementById("deliveryDate").value;
    const email = document.getElementById("email").value;

    const order = {
        deliveryAddress,
        deliveryDate,
        email,
    };

    axios
        .post("http://localhost:8080/api/v1/order", order)
        .then((res) => {
            alert(`Orden generada con exito ${res.data.orderId}`);
            window.location.href = "/";
        })
        .catch((err) => console.log(err));
};


