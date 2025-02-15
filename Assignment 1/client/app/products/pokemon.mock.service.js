/*
    Name: Diether Ocampo
    Filename: product.mock.service.js
    Course: INFT 2202
    Date: January 30, 2025
    Description: This is my product service script.
*/
import Product from "./pokemon.js";

class ProductService {
    constructor() {
        if (!localStorage.getItem("products")) {
            localStorage.setItem("products", JSON.stringify([]));
        }
    }

    listProducts() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        return products.map(productData => new Product(productData));
    }

    findProduct(id) {
        const products = this.listProducts();
        const product = products.find(p => p.id === id);
        if (!product) throw new Error("That product doesn't exist!");
        return product;
    }

    // Add a new product
// In your ProductService class
createProduct(product) {
    console.log("Attempting to create product:", product); // Debug log
    const products = this.listProducts();
    console.log("Current products:", products); // Debug log
    
    const exists = products.some(p => p.name.toLowerCase() === product.name.toLowerCase());
    if (exists) {
        console.log("Product already exists!"); // Debug log
        throw new Error("That product already exists!");
    }

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    console.log("Product created successfully"); // Debug log
    return true;
}
    // Update an existing product
    updateProduct(updatedProduct) {
        const products = this.listProducts();
        const index = products.findIndex(p => p.id === updatedProduct.id);
        if (index === -1) throw new Error("That product doesn't exist!");

        products[index] = updatedProduct;
        localStorage.setItem("products", JSON.stringify(products));
        return true;
    }

    // Delete a product from localStorage
    deleteProduct(productId) {
        let products = this.listProducts();
        const filteredProducts = products.filter(p => p.id !== productId);

        if (filteredProducts.length === products.length) throw new Error("That product doesn't exist!");

        localStorage.setItem("products", JSON.stringify(filteredProducts));
        return true;
    }
}

export default new ProductService();
