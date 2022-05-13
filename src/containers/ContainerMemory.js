const { errorHandler } = require("../utils/utils");

const err_notFound = { errorMsg: "Elemento no encontrado" , error: 200};
const err_cantSave = { errorMsg: "Error al guardar el archivo" };
const err_cantDelete = { errorMsg: "Error al eliminar" };

class ContainerMemory {
    constructor() {
        this.elements = [];
        this.index = 0;
    }

    find = (id) => {
        id *= 1;

        const elem = this.elements.find((elem) => elem.id === id);
        if (elem) return elem;
        else return errorHandler("Registro no encontrado");
    };

    findAll = () => this.elements;

    save = (elem) => {
        this.index++;

        const newElem = { ...elem, id: this.index };
        this.elements.push(newElem);

        return newElem;
    };

    update = (id, elem) => {
        id *= 1;

        const index = this.elements.findIndex((elem) => elem.id === id);
        if (index >= 0)
            return (this.elements[index] = {
                ...elem,
                id: this.elements[index].id,
            });
            return errorHandler("Registro no encontrado");
    };

    delete = (id) => {
        id *= 1;

        const index = this.elements.findIndex((elem) => elem.id === id);
        if (index >= 0) this.elements.splice(index, 1);
        else errorHandler("Registro no encontrado");

        return true;
    };

    deleteAll = () => {
        this.elements = [];
        return true;
    };
}

module.exports = ContainerMemory;
