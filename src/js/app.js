import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded" , () => {
    CategoryView.setApp();
    CategoryView.createCategoriesList(CategoryView.categories);
    ProductView.setApp();
    ProductView.createProductsList(ProductView.products);
});