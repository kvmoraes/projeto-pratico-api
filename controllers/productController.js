const { dataTshirt } = require('../dbContent/products/tshirts');

const getProduct = async (req, res) => {
    try {
        const { id, size } = req.query;

        let selectTShirtById = [];
        let selectTShirtBySize = [];
        
        if (id) {
            if (!isTShirtId(id)) throw new Error('ID do not exist.')
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
    const newDataTShirts = [...dataTshirt, req.body];

    res.status(200).send(newDataTShirts);
}
    


// PRIVATE FUNCTIONS
const isTShirtId = (id) => { 
    const tshirtExists = dataTshirt.filter(product => product.id === Number(id));
    return tshirtExists > 0;
}

const isTShirtSize = (size) => {
    const tshirtExists = dataTshirt.filter(product => product.size === size);
    return tshirtExists > 0;
}

module.exports = {
    getProduct,
    createProduct
}