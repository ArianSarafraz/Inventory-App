import Storage from "./Storage.js";
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const categoryFormContainer = document.querySelector(".category-form-container");
const categoryFormLabel = document.querySelector("#category-form-label");
const cancelCategoryFormBtn = document.querySelector("#cancel-category-form");

class CategoryView {
    constructor() {
        addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
        categoryFormLabel.addEventListener("click", () => this.categoryFormVisibility());
        cancelCategoryFormBtn.addEventListener("click", (e) => this.cancelCategoryForm(e));
        this.categories = [];
    }
    addNewCategory(e) {
        e.preventDefault();
        const title = categoryTitle.value;
        const description = categoryDescription.value;
        if (!title || !description) return;
        Storage.saveCategory({ title, description });
        this.categories = Storage.getAllCategories();
        categoryTitle.value = "";
        categoryDescription.value = "";
        this.createCategoriesList(this.categories);
    }
    setApp() {
        this.categories = Storage.getAllCategories();
    }
    createCategoriesList(categories) {
        let result = `<option class="bg-slate-500 text-slate-300" value="">Select a category</option>`;
        categories.forEach((element) => {
            result += `<option class="bg-slate-500 text-slate-300" value=${element.id}>${element.title}</option>`;
        });
        const categoryOptions = document.querySelector("#product-category");
        categoryOptions.innerHTML = result;
    }

    categoryFormVisibility() {
        if (categoryFormContainer.classList.contains("hidden")) {
            categoryFormContainer.classList.remove("hidden");
            categoryFormLabel.innerHTML = "Add new category";
        }
    }

    cancelCategoryForm(e) {
        e.preventDefault();
        categoryFormContainer.classList.add("hidden");
        categoryFormLabel.innerHTML = 'Add new category ?';
    }
}

export default new CategoryView();