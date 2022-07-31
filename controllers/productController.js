const { dataTshirt } = require('../dbContent/products/tshirts');

const defaultError = new Error ('ID do not exist.');

const getProduct = async (req, res) => {
    try {
        const { id, size } = req.query;

        let selectTShirtById = [];
        let selectTShirtBySize = [];
        
        if (id) {
            if (!isTShirtId(id)) throw new defaultError;
            selectTShirtById = dataTshirt.filter(tshirt => tshirt.id === Number(id));
        }
        if (size) {
            if (!isTShirtSize(size)) throw new Error('This size does not exist.')
            selectTShirtBySize = dataTshirt.reduce((acc, product) => {
                const checkedSize = product.size === size;
                if (checkedSize) acc = [...acc, product]
                return acc;
            }, []);
        }

        const selectedTShirts = [...selectTShirtById, ...selectTShirtBySize];

        res.status(200).send( 
            (!id && !size) ? 
            dataTshirt :
            selectedTShirts
        );
    } catch (error) {
        console.log(error);

        res.status(404).send(error.message);
    }
}

const createProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const newDataTShirts = [...dataTshirt, req.body];

        if (isTShirtId(id)) throw new Error ('ID already exists.')

        res.status(200).send(newDataTShirts);
    } catch (error) {
        console.log(error);

        res.status(404).send(error.message);
    }
}
    
const updateProduct = async (req, res) => {
    try {
        const { id } = req.body;

        if (!isTShirtId(id)) throw defaultError;

        const product = updateProductInfo(req.body);
        const oldProducts = dataTshirt.filter(item => item.id !== id);
        const newProducts = [...oldProducts, product];

        res.status(200).send(newProducts);
    } catch (error) {
        console.log(error);

        res.status(404).send(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isTShirtId(id)) throw defaultError;

        const newProducts = dataTshirt.filter(item => item.id !== Number(id));
        res.status(200).send(newProducts);
    } catch (error) {
        console.log(error);

        res.status(404).send(error.message);
    }
}



// PRIVATE FUNCTIONS
const isTShirtId = (id) => { 
    const tshirtExists = dataTshirt.filter(product => product.id === Number(id));
    return tshirtExists.length > 0;
}

const isTShirtSize = (size) => {
    const tshirtExists = dataTshirt.filter(product => product.size === size);
    return tshirtExists.length > 0;
}

const updateProductInfo = ({ id, size, description }) => {
    return dataTshirt.reduce((acc, currentProduct) => {
        const checkedProduct = currentProduct.id === id;
        if (checkedProduct) {
            acc = { ...acc, ...{ id, size, description }}
        }
        return acc;
    }, {});
};


module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}