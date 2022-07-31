const { dataTshirt } = require('../dbContent/products/tshirts');

const getProduct = async (req, res) => {
    const { id, size } = req.query;

    let selectTShirtById = [];
    let selectTShirtBySize = [];
    
    
    if (id) {
        selectTShirtById = dataTshirt.filter(tshirt => tshirt.id === Number(id));
    }
    if (size) {
        selectTShirtBySize = dataTshirt.reduce((acc, product) => {
            const checkedSize = product.size === size;
            if (checkedSize) acc = [...acc, product]
            return acc;
        }, []);
    }

    const selectedTShirts = [...selectTShirtById, ...selectTShirtBySize];
    res.status(200).send(selectedTShirts);
}
    

module.exports = {
    getProduct
}