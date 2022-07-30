const env = require("../../config/env");
const { faker } = require("@faker-js/faker");
faker.locale = "es_MX";

const request = require("supertest")(env.API_FULL_PATH);
const expect = require("chai").expect;

/*
    *** DATA PREPARE AND VARIABLES INITIALIZATION ***
*/
const userGenerator = () => ({
    email: faker.internet.email(),
    password: "Clav001.Prueba",
    name: faker.name.firstName(),
    address: faker.address.streetAddress(),
    birthDate: "1990-12-22",
    phone: faker.phone.phoneNumber("+54911########"),
    photo: faker.image.avatar(),
})
const user = userGenerator();
console.log(user)

/*
    *** TEST ***
*/

// testear registro
describe("Prueba Api V1 de USUARIOS", () => {
    it("1. Se registra", async () => {
        // Peticion
        const response = await request
            .post("signup")
            .send(user);

        // Verifica
        expect(response.status).to.eql(201);
        console.log(response.body);
    }).timeout(1000000); // 10 segundos

    // it("2. Se loguea", async () => {
    //     // Peticion
    //     const response = await request
    //         .post("login")
    //         .set("Accept", "application/json")
    //         .send({
    //             email: user.email,
    //             password: user.password,
    //         });

    //     // Verifica
    //     expect(response.status).to.eql(204);
    // })

    // it("Se desloguea", async () => {
    //     const response = await request.get("logout")
    //     expect(response.status).to.eql(204)
    // })
})