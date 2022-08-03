const env = require("../../config/env");
const { faker } = require("@faker-js/faker");
faker.locale = "es_MX";

const request = require("supertest")(env.API_FULL_PATH);
const expect = require("chai").expect;

/*
 *** DATA PREPARE AND VARIABLES INITIALIZATION ***
 */
const productGenerator = () => {
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: "2096D",
        thumbnail:
            "https://loremflickr.com/cache/resized/65535_51821425620_7bde15ac44_c_640_480_nofilter.jpg",
        price: parseFloat(faker.commerce.price()),
        stock: parseInt(faker.random.numeric()),
    };
};
const product = productGenerator();
let productIdCreated = "";
let Cookies;

/*
 *** TEST ***
 */

describe("Prueba Api V1 de PRODUCTOS", () => {
    // Genera un nuevo producto

    describe("Peticion POST", () => {
        it("1. Intenta (Sin éxito) crear un nuevo producto sin estar logueado", async () => {
            // Peticion
            const response = await request.post("productos").send(product);

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

        it("3. Intenta (Con éxito) crear un nuevo producto estando logueado", async () => {
            // Peticion
            request.cookies = Cookies;
            const response = await request
                .post("productos")
                .set("Cookie", Cookies)
                .send(product);

            // Guarda id del producto creado
            productIdCreated = response.body.id;

            // Verifica
            expect(response.status).to.eql(201);
        }).timeout(10000); // 10 segundos

        it("4. Intenta (Sin éxito) crear un nuevo producto con datos extras", async () => {
            // Peticion
            const maliciousProduct = {
                ...product,
                maliciousCode: "delete * from products",
            };
            const response = await request
                .post("productos")
                .send(maliciousProduct);

            // Verifica
            expect(response.status).to.eql(401);
        }).timeout(10000); // 10 segundos
    });

    describe("Peticiones GET", () => {
        it("1. Solicita (Con éxito) todos los productos. Verifica todos los valores con el último creado", async () => {
            // Peticion
            const response = await request.get("productos");
            const resProducts = response.body;

            // Verifica
            expect(response.status).to.eql(200);
            expect(resProducts).to.be.an("array");

            if (resProducts.length > 0) {
                expect(resProducts[0]).to.include.keys([
                    "id",
                    "title",
                    "description",
                    "code",
                    "price",
                    "stock",
                ]);
            }
            expect(resProducts[resProducts.length - 1]).to.deep.include(
                product
            );
        }).timeout(10000); // 10 segundos

        it("2. Solicita (Con éxito) un producto, el último creado", async () => {
            const response = await request.get(`productos/${productIdCreated}`);
            const resProduct = response.body;

            expect(response.status).to.eql(200);
            expect(resProduct).to.be.an("object");
            expect(resProduct).to.include.keys([
                "id",
                "title",
                "description",
                "code",
                "price",
                "stock",
            ]);
            expect(resProduct).to.deep.include(product);
        }).timeout(10000); // 10 segundos

        it("3. Solicita (Sin éxito) un producto con un Id incorrecto", async () => {
            const response = await request.get(`productos/12345`);

            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos

        it("4. Solicita (Sin éxito) un producto inexistente", async () => {
            const response = await request.get(
                `productos/000000000000000000000000`
            );

            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos
    });

    describe("Peticiones PUT", () => {
        const productUpdated = product;
        productUpdated.title = "Nuevo titulo";

        it("1. Actualiza (Sin éxito) el útlimo producto creado sin estar logueado", async () => {
            const response = await request
                .put(`productos/${productIdCreated}`)
                .send(productUpdated);

            expect(response.status).to.eql(401);
        }).timeout(10000); // 10 segundos

        it("2. Actualiza (Con éxito) el útlimo producto creado estando logueado", async () => {
            const response = await request
                .put(`productos/${productIdCreated}`)
                .set("Cookie", Cookies)
                .send(productUpdated);
            const resProduct = response.body;

            expect(response.status).to.eql(200);
            expect(resProduct).to.be.an("object");
            expect(resProduct).to.include.keys([
                "id",
                "title",
                "description",
                "code",
                "price",
                "stock",
            ]);
            expect(resProduct).to.deep.include(productUpdated);
        }).timeout(10000); // 10 segundos

        it("3. Actualiza (Sin éxito) un producto con un Id incorrecto", async () => {
            const response = await request
                .put(`productos/12345`)
                .set("Cookie", Cookies)
                .send(productUpdated);

            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos

        it("4. Actualiza (Sin éxito) un producto inexistente", async () => {
            const response = await request
                .put(`productos/000000000000000000000000`)
                .set("Cookie", Cookies)
                .send(productUpdated);

            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos

        it("5. Actualiza (Sin éxito) un producto con datos extras", async () => {
            const maliciousProduct = {
                ...productUpdated,
                maliciousCode: "delete * from products",
            };

            const response = await request
                .put(`productos/000000000000000000000000`)
                .set("Cookie", Cookies)
                .send(maliciousProduct);

            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos
    });

    describe("Peticiones DELETE", () => {
        it("1. Elimina (Sin éxito) el último producto creado sin estar logueado", async () => {
            const response = await request
                .delete(`productos/${productIdCreated}`)
                .send(product);

            expect(response.status).to.eql(401);
        }).timeout(10000); // 10 segundos

        it("2. Elimina (Con éxito) el último producto creado estando logueado", async () => {
            const response = await request
                .delete(`productos/${productIdCreated}`)
                .set("Cookie", Cookies)
                .send(product);

            expect(response.status).to.eql(204);
        }).timeout(10000); // 10 segundos

        it("3. Elimina (Sin éxito) un producto con ID incorrecto", async () => {
            const response = await request.get(`productos/12345`);

            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos

        it("4. Elimina (Sin éxito) un producto inexistente", async () => {
            const response = await request.get(
                `productos/000000000000000000000000`
            );

            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos

        it("5. Verifica que el último producto NO exista", async () => {
            const response = await request.get(`productos/${productIdCreated}`);

            expect(response.status).to.eql(404);
        }).timeout(10000); // 10 segundos
    });
});
