const env = require("../../config/env");
const { faker } = require("@faker-js/faker");
faker.locale = "es_MX";

const request = require("supertest")(env.API_FULL_PATH);
const expect = require("chai").expect;

/*
 *** DATA PREPARE AND VARIABLES INITIALIZATION ***
 */
const orderDataGenerator = () => {
    return {
        deliveryAddress: faker.address.streetAddress(),
        deliveryDate: faker.date.future().toISOString().split("T")[0],
    };
};
const orderData = orderDataGenerator();
const productId = "62e3413f90329cc2f577597a";
let orderIdCreated = "";
let Cookies;

/*
 *** TEST ***

- [POST ORDER] : Crear una orden
    1. Intenta (Sin éxito) crear una orden sin estar logueado
        Necesario: Nada
        Obtiene: Error 401

    2. Intenta (Sin éxito) crear una orden sin productos
        Necesario: Cookies
        Obtiene: Error 400

    3. Intenta (Con éxito) crear una orden con productos
        Necesario: Cookies
        Obtiene: 201 y el id de la orden

- [GET ORDERS] : Obtener las ordenes
    1. Intenta (Sin éxito) obtener las ordenes sin estar logueado
        Necesario: Nada
        Obtiene: Error 401

    2. Intenta (Con éxito) obtener las ordenes
        Necesario: Cookies
        Obtiene: 200 y las ordenes
*/

describe("Prueba Api V1 de ORDENES", () => {
    describe("Preparing data", () => {
        it("", async () => {
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
    });

    describe("Peticion POST", () => {
        it("1. Intenta (Sin éxito) crear una orden sin estar logueado", async () => {
            // Peticion
            const response = await request.post("order").send(orderData);

            // Verifica
            expect(response.status).to.eql(401);
        }).timeout(10000); // 10 segundos

        it("2. Intenta (Sin éxito) crear una orden sin productos", async () => {
            // Peticion
            const response = await request
                .post("order")
                .set("Cookie", Cookies)
                .send(orderData);

            // Verificación headers
            expect(response.status).to.eql(400);
        }).timeout(10000);

        it("3. Intenta (Con éxito) crear una orden", async () => {
            // Carga carrito
            await request
                .post(`carrito/productos/${productId}`)
                .set("Cookie", Cookies);

            // Crea la órden
            const response = await request
                .post("order")
                .set("Cookie", Cookies)
                .send(orderData);
            const resBody = response.body;

            // Verifica headers
            expect(response.status).to.eql(201);

            // Verificación general
            expect(resBody).to.be.an("object");
            expect(resBody).to.include.keys([
                "email",
                "products",
                "deliveryAddress",
                "deliveryDate",
                "total",
                "status",
            ]);

            // Verificación detallada
            const resbody = {
                ...resBody,
                deliveryDate: resBody.deliveryDate.split("T")[0],
            };
            const fullOrderData = {
                ...orderData,
                status: "GENERATED",
            };
            expect(resbody.products[0]).to.deep.include({ id: productId, quantity: 1 });
            expect(resbody).to.deep.include(fullOrderData);
        }).timeout(10000);
    });
});
