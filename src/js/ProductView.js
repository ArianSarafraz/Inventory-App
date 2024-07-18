import Storage from "./Storage.js";
const addNewProductBtn = document.querySelector("#add-new-product");
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductView {
    constructor() {
        addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
        searchInput.addEventListener("input", (e) => this.searchProduct(e));
        selectedSort.addEventListener("change", (e) => this.sortProducts(e));
        this.products = [];
    }
    addNewProduct(e) {
        e.preventDefault();
        const title = productTitle.value;
        const quantity = productQuantity.value;
        const category = productCategory.value;
        if (!title || !quantity || !category) return;
        Storage.saveProduct({ title, quantity, category });
        this.products = Storage.getAllProducts();
        productTitle.value = "";
        productQuantity.value = "";
        productCategory.value = "";
        this.createProductsList(this.products);
    }
    setApp() {
        this.products = Storage.getAllProducts();
    }
    createProductsList(products) {
        let result = "";
        products.forEach((p) => {
            const selectedCategory = Storage.getAllCategories().find((c) => c.id == p.category);
            result += ` 
            <div class="flex items-center justify-between mb-6">
            <span class="text-slate-400">${p.title}</span>
            <div class="flex items-center gap-x-3">
              <span class="text-slate-400">${new Date().toLocaleDateString("en")}</span>
              <span class="block px-3 py-0.5 text-slate-400 text-sm border border-slate-500 rounded-2xl">${selectedCategory.title}</span>
              <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2 border-slate-300">${p.quantity}</span>  
              <button class="border px-3 py-0.2 rounded-xl border-red-500 text-red-400 delete-btn" data-product-id=${p.id}>delete</button>   
            </div>
             </div>
            `;
        });
        const productsListContainer = document.querySelector(".products-list-container");
        productsListContainer.innerHTML = result;


        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener("click", (e) => this.deleteProduct(e));
        });
    }

    searchProduct(e) {
        const inputValue = e.target.value.trim().toLowerCase();
        const filteredProducts = this.products.filter((product) => product.title.trim().toLowerCase().includes(inputValue));
        this.createProductsList(filteredProducts);
    }

    sortProducts(e) {
        const value = e.target.value;
        this.products = Storage.getAllProducts(value);
        this.createProductsList(this.products);
    }

    deleteProduct(e) {
        const productId = e.target.dataset.productId;
        Storage.deleteProduct(productId);
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products);
    }
}


export default new ProductView();