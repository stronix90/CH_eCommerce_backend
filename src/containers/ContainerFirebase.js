const { initializeApp } = require("firebase/app");
const {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} = require("firebase/firestore");
const { errorHandler } = require("../utils/utils");

const config = require("../config");
const app = initializeApp(config.firebase.config);

class ContainerFirebase {
    constructor(collectionName) {
        this.db = getFirestore(app);
        this.coll = collectionName;
    }

    find = async (id) => {
        try {
            const docRef = doc(this.db, this.coll, id);
            const docSnap = await getDoc(docRef);

            return docSnap.exists()
                ? { ...docSnap.data(), id }
                : errorHandler("Registro no encontrado");
        } catch (error) {
            console.error(error);
            return errorHandler("", error);
        }
    };
    findAll = async () => {
        try {
            const docSnap = await getDocs(collection(this.db, this.coll));
            return this.resultFormat(docSnap.docs);
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    };
    save = async (elem) => {
        try {
            const docRef = await addDoc(collection(this.db, this.coll), elem);
            return docRef.id;
        } catch (error) {
            return errorHandler("Error al guardar registro", error);
        }
    };
    update = async (id, elem) => {
        try {
            const docRef = await doc(this.db, this.coll, id);
            await updateDoc(docRef, elem);
            return { ...elem, id };
        } catch (error) {
            return errorHandler("Error al guardar registro", error);
        }
    };
    delete = async (id) => {
        try {
            await deleteDoc(doc(this.db, this.coll, id));
            return true;
        } catch (error) {
            return errorHandler("Falla al eliminar", error);
        }
    };
    deleteAll = async () => {
        return errorHandler("Not available");
    };

    resultFormat = (arrayDeDocumentos) => {
        return arrayDeDocumentos.map((document) => {
            return { ...document.data(), id: document.id };
        });
    };
}

module.exports = ContainerFirebase;
