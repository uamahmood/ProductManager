const { Product } = require("../models/product.model");

module.exports.findAllProducts = (request, response) => {
    Product.find()
        .then(allProducts => response.json({Products: allProducts}))
        .catch(err => response.json({ message: "Something went wrong", error: err}))
};

module.exports.findOneSingleProduct = (request, response) => {
    Product.find({_id: request.params.id})
        .then(oneSingleProduct => response.json({ product: oneSingleProduct}))
        .catch(err => response.json({ message: "Something went wrong", error: err}));
}

module.exports.createProduct = (request, response) => {
    const { title, price, description } = request.body;
    Product.create({
        title,
        price,
        description
    })
        .then(product => response.json(product))
        .catch(err => response.json(err))
};

module.exports.updateProduct = (request, response) => {
    Product.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedProduct => response.json(updatedProduct))
        .catch(error => response.json(error))
}

module.exports.deleteProduct = (request, response) => {
    Product.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(error => response.json(error))
}