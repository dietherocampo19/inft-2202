/*
    Name: Diether Ocampo
    Filename: search.js
    Course: INFT 2202
    Date: January 30, 2025
    Description: This is my search script.
*/

import productService from "./pokemon.mock.service.js";

const productList = document.getElementById("product-list");
const pagination = document.getElementById("pagination");

const PRODUCTS_PER_PAGE = 6;
let currentPage = 1;
let productToDelete = null;

function renderProducts() {
    const products = productService.listProducts() || [];

    if (products.length === 0) {
        productList.innerHTML = `<div class="alert alert-warning text-center" role="alert">
            The shop is currently closed. No products available.
        </div>`;
        pagination.innerHTML = "";
        return;
    }

    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = products.slice(start, start + PRODUCTS_PER_PAGE);

    productList.innerHTML = paginatedProducts.map(product => `
        <div class="col-md-4">
            <div class="card shadow">
                <img src="${product.image || './css/poke-pack.jpg'}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name || 'Unknown Product'}</h5>
                    <p class="card-text">
                        <strong>Price:</strong> $${product.price || '0.00'} <br>
                        <strong>Stock:</strong> ${product.stock || '0'} <br>
                        <strong>Description:</strong> ${product.description || 'No description available.'}
                    </p>
                    <button class="btn btn-primary">Add to Cart</button>
                    <button class="btn btn-warning edit-product" data-id="${product.id}" data-bs-toggle="tooltip" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger delete-product" data-id="${product.id}" data-bs-toggle="tooltip" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    setupTooltips();
    setupDeleteButtons();
    setupPagination(products.length);
    setupEditButtons();
}

function setupDeleteButtons() {
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));

    document.querySelectorAll(".delete-product").forEach(button => {
        button.addEventListener("click", (event) => {
            productToDelete = event.currentTarget.getAttribute("data-id");
            modal.show();
        });
    });

    const confirmDeleteBtn = document.getElementById('confirmDelete');
    confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true)); // Remove previous event listeners
    document.getElementById('confirmDelete').addEventListener('click', () => {
        if (productToDelete) {
            productService.deleteProduct(productToDelete);
            renderProducts();
        }
        modal.hide();
    });
}

function setupTooltips() {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(button => {
        new bootstrap.Tooltip(button);
    });
}

function setupPagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener("click", () => {
            currentPage = i;
            renderProducts();
        });
        pagination.appendChild(pageItem);
    }
}

function setupEditButtons() {
    document.querySelectorAll(".edit-product").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("data-id");
            window.location.href = `create.html?id=${productId}`;
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});