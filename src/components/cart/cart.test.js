const env = require("../../config/env");

const request = require("supertest")(env.API_FULL_PATH);
const expect = require("chai").expect;

/*
 *** TEST ***

- [GET CART] : Obtiene o crear un carrito
    - 1. Intenta (Sin éxito) obtener un carrito sin estar logueado
        Necesario: Nada
        Obtiene: Error 401

    - 2. Se loguea
        Necesario: Datos de login
        Obtiene: 204

    - 3. Intenta (Con éxito) obtener (CREAR) un carrito estando logueado
        Necesario: Cookies
        Obtiene: Un carrito vacio. Verificar los campos mínimos

    - 4. Intenta (Con éxito) obtener un carrito estando logueado
        Necesario: Cookies
        Obtiene: Un carrito vacio. Verificar los campos mínimos

- [DELETE CART] : Elimina un carrito
    - 1. Intenta (Sin éxito) eliminar un carrito sin estar logueado
        Necesario: Nada
        Obtiene: Error 401

    - 2. Intenta (Con éxito) eliminar un carrito estando logueado
        Necesario: Cookies
        Obtiene: 204


- [ADD PRODUCT TO CART] : Agrega un producto al carrito
    - 1. Intenta (Sin éxito) agregar un producto al carrito sin estar logueado
        Necesario: Id de producto por parametro
        Obtiene: Error 401
        
    - 2. Intenta (Con éxito) agregar un producto al carrito estando logueado
        Necesario: Cookies, Id de producto por parametro
        Obtiene: Carrtio con producto agregado. Verificar los campos mínimos de cart y de último producto

    - 3. Intenta (Sin éxito) agregar un producto inexistente al carrito estando logueado
        Necesario: Cookies, Id de producto por parametro (Id inexistente)
        Obtiene: Error 404

    - 4. Intenta (Sin éxito) agregar un producto con ID incorrecto al carrito estando logueado
        Necesario: Cookies, Id de producto por parametro (Id incorrecto)
        Obtiene: Error 404

- [DEL PRODUCT FROM CART] : Elimina un producto del carrito
    - 1. Intenta (Sin éxito) eliminar un producto del carrito sin estar logueado
        Necesario: Id de producto por parametro
        Obtiene: Error 401

    - 2. Intenta (Con éxito) eliminar un producto del carrito estando logueado
        Necesario: Cookies, Id de producto por parametro
        Obtiene: Carrito sin producto indicado. Verificar los campos mínimos de cart

    - 3. Intenta (Sin éxito) eliminar un producto inexistente del carrito estando logueado
        Necesario: Cookies, Id de producto por parametro (Id inexistente)
        Obtiene: Error 404

    - 4. Intenta (Sin éxito) eliminar un producto con ID incorrecto del carrito estando logueado
        Necesario: Cookies, Id de producto por parametro (Id incorrecto)
        Obtiene: Error 404

    - 5. Intenta (Sin éxito) obtener el producto recientemente eliminado

*/

describe("Prueba Api V1 de CARRITO", async () => {
    let Cookies;
    let cartIdCreated;

    let product = {};
    let productId = "";

    describe("Peticiones GET-cart", () => {
        it("1. Intenta (Sin éxito) obtener un carrito sin estar logueado", async () => {
            // Peticion
            const response = await request.get("carrito");

            // Verifica
            expect(response.status).to.eql(401);
        }).timeout(10000); // 10 segundos

        it("2. Se loguea", async () => {
            // Peticion
            const response = await request
                .post("login")
                .set("Accept", "application/json")
                .send({
                    email: "noelia.ivana.torres20@gmail.com",
                    password: "Claves01.",
                });

            // Guarda cookie de session
            Cookies = response.headers["set-cookie"].pop().split(";")[0];

            // Verifica
            expect(response.status).to.eql(204);
        }).timeout(10000); // 10 segundos

        it("3. Intenta (Con éxito) obtener (CREAR) un carrito estando logueado", async () => {
            // Peticion
            const response = await request
                .get("carrito")
                .set("Cookie", Cookies);
            const resBody = response.body;

            expect(resBody).to.include.keys([
                "email",
                "products",
                "total",
                "status",
            ]);

            // Guarda id del carrito
            cartIdCreated = response.body.id;

            // Verifica
            expect(response.status).to.eql(200);
        }).timeout(10000); // 10 segundos

        it("4. Intenta nuevamente (Con éxito) obtener (OBTENER) carrito estando logueado", async () => {
            // Peticion
            request.cookies = Cookies;
            const response = await request
                .get("carrito")
                .set("Cookie", Cookies);

            // Verifica si obtuvo el mismo carrito
            expect(response.body.id).to.eql(cartIdCreated);

            // Verifica
            expect(response.status).to.eql(200);
        }).timeout(10000); // 10 segundos
    });

    describe("Peticiones DELETE-cart", () => {
        it("1. Intenta (Sin éxito) eliminar un carrito sin estar logueado", async () => {
            // Peticion
            const response = await request.delete("carrito");

            // Verifica
            expect(response.status).to.eql(401);
        }).timeout(10000); // 10 segundos

        it("2. Intenta (Con éxito) eliminar un carrito estando logueado", async () => {
            // Peticion
            const response = await request
                .delete("carrito")
                .set("Cookie", Cookies);

            // Verifica
            expect(response.status).to.eql(204);
        }).timeout(10000); // 10 segundos
    });

    describe("Peticiones POST-product", () => {
        it("1. Intenta (Sin éxito) agregar un producto al carrito sin estar logueado", async () => {
            const productList = await request.get("productos");
            product = productList.body[0];
            productId = productList.body[0].id;

            // Peticion
            const response = await request
                .post(`carrito/productos/${productId}`)
                .set("Accept", "application/json")
                .send(product);

            // Verifica
            expect(response.status).to.eql(401);
        }).timeout(10000); // 10 segundos

        it("2. Intenta (Con éxito) agregar un producto al carrito estando logueado", async () => {
            // Peticion
            const response = await request
                .post(`carrito/productos/${productId}`)
                .set("Accept", "application/json")
                .set("Cookie", Cookies);
            const resBody = response.body;

            // Verificación general
            expect(response.status).to.eql(200);
            expect(resBody).to.be.an("object");
            expect(resBody).to.include.keys([
                "email",
                "products",
                "total",
                "status",
            ]);

            // Verifica que el producto esté dentro del carrito
            const lastProdAddedIndex = resBody.products.length - 1;

            const productForCart = { ...product };
            delete productForCart.description;
            delete productForCart.stock;
            productForCart.quantity = 1;

            expect(resBody.products[lastProdAddedIndex]).to.deep.include(
                productForCart
            );
        }).timeout(10000); // 10 segundos

        it("3. Intenta (Sin éxito) agregar un producto inexistente al carrito estando logueado", async () => {
            // Peticion
            const response = await request
                .post("carrito/productos/000000000000000000000000")
                .set("Accept", "application/json")
                .set("Cookie", Cookies);

            // Verifica
            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos

        it("4. Intenta (Sin éxito) agregar un producto con ID incorrecto al carrito estando logueado", async () => {
            // Peticion
            const response = await request
                .post("carrito/productos/12345")
                .set("Accept", "application/json")
                .set("Cookie", Cookies);

            // Verifica
            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos
    });

    describe("Peticiones DELETE-product", () => {
        it("1. Intenta (Sin éxito) eliminar un producto del carrito sin estar logueado", async () => {
            // Peticion
            const response = await request.delete(
                `carrito/productos/${productId}`
            );

            // Verifica
            expect(response.status).to.eql(401);
        }).timeout(10000); // 10 segundos

        it("2. Intenta (Con éxito) eliminar un producto del carrito estando logueado", async () => {
            // Peticion
            const response = await request
                .delete(`carrito/productos/${productId}`)
                .set("Cookie", Cookies);

            // Verificación general del carrito
            const resBody = response.body;
            expect(resBody).to.be.an("object");
            expect(resBody).to.include.keys([
                "email",
                "products",
                "total",
                "status",
            ]);

            // Verificación de los productos dentro del carrito
            productsInCart = response.body.products;
            productsInCart.forEach((product) => {
                expect(product.id).to.not.eql(productId);
            });

            // Verifica
            expect(response.status).to.eql(200);
        }).timeout(10000); // 10 segundos

        it("3. Intenta (Sin éxito eliminar un producto inexistente del carrito, estando logueado", async () => {
            // Peticion
            const response = await request
                .delete(`carrito/productos/000000000000000000000000`)
                .set("Cookie", Cookies);

            // Verifica
            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos

        it("4. Intenta (Sin éxito eliminar un producto con ID incorrecto del carrito, estando logueado", async () => {
            // Peticion
            const response = await request
                .delete(`carrito/productos/12345`)
                .set("Cookie", Cookies);

            // Verifica
            expect(response.status).to.eql(404);
        });

        it("5. Intenta (Sin éxito) obtener el producto recientemente eliminado", async () => {
            // Peticion
            const response = await request
                .get("carrito")
                .set("Cookie", Cookies);

            // Guarda id del carrito
            productsInCart = response.body.products;

            // Verifica que no esté el producto eliminado
            productsInCart.forEach((product) => {
                expect(product.id).to.not.eql(productId);
            });

            // Verifica
            expect(response.status).to.eql(200);
        }).timeout(10000); // 10 segundos
    });
});
