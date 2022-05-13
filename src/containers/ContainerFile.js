const fs = require("fs");
const { errorHandler } = require("../utils/utils");

class ContainerFile {
    constructor(path) {
        (this.path = path), (this.index = this.getDocIndex());
    }

    async find(id) {
        try {
            id *= 1;

            const data = await this.findAll();
            const elem = data.find((elem) => elem.id === id);

            if (elem) return elem;
            else return errorHandler("Registro no encontrado");
        } catch (error) {
            console.error(error);
            return errorHandler("", error);
        }
    }

    async findAll() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const dataJSON = JSON.parse(data);
            return dataJSON.registros;
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    }

    async save(elem) {
        this.index++;

        const newElem = { ...elem, id: this.index };

        const data = await this.findAll();
        data.push(newElem);

        const newFile = {
            index: this.index,
            registros: data,
        };

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(newFile, null, 2)
            );
            return newElem.id;
        } catch (error) {
            return errorHandler("Error al guardar registro", error);
        }
    }

    async update(id, elem) {
        const { index, data } = await this.findIndex(id, true);

        if (index >= 0) data[index] = { ...elem, id: data[index].id };
        else return errorHandler("Registro no encontrado");

        const newFile = {
            index: this.index,
            registros: data,
        };

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(newFile, null, 2)
            );
            return elem;
        } catch (error) {
            return errorHandler("Error al guardar registro", error);
        }
    }

    async delete(id) {
        const { index, data } = await this.findIndex(id, true);

        if (index >= 0) data.splice(index, 1);
        else return errorHandler("Registro no encontrado");

        const newFile = {
            index: this.index,
            registros: data,
        };

        try {
            fs.promises.writeFile(this.path, JSON.stringify(newFile, null, 2));
            return true;
        } catch (error) {
            return errorHandler("Falla al eliminar", error);
        }
    }

    async deleteAll() {
        const newFile = {
            index: this.index,
            registros: [],
        };

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(newFile, null, 2)
            );
            return true;
        } catch (error) {
            return errorHandler("Falla al eliminar", error);
        }
    }

    async findIndex(id, reqData = false) {
        id *= 1;

        const data = await this.findAll();
        const index = data.findIndex((elem) => elem.id === id);
        return reqData ? { index, data } : index;
    }

    getDocIndex = async () => {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const dataJSON = JSON.parse(data);
            this.index = dataJSON.index;
        } catch (error) {
            console.log(error);
            this.index = 0;
        }
    };
}

module.exports = ContainerFile;
