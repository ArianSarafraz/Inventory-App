const products = [
    {
        id: 1,
        title: "React.js",
        category: "frontend",
        createdAt: "2023-09-24T18:53:28.883Z"
    },
    {
        id: 2,
        title: "Node.js",
        category: "backend",
        createdAt: "2022-09-24T18:53:28.883Z"
    },
    {
        id: 3,
        title: "Vue.js",
        category: "frontend",
        createdAt: "2021-09-24T18:53:28.883Z"
    }
];

const categories = [
    {
        id: 1,
        title: "frontend",
        description: "frontend of application",
        createdAt: "2023-09-24T18:53:28.883Z"
    },
    {
        id: 2,
        title: "backend",
        description: "backend of application",
        createdAt: "2022-09-24T18:53:28.883Z"
    }
];

export default class Storage {
    // get all categories 
    static getAllCategories() {
        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        const sortedCategories = savedCategories.sort((a, b) => {
            return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
        });
        return sortedCategories;
    }
    // save category
    static saveCategory(categoryToSave) {
        const savedCategories = Storage.getAllCategories();
        // edit => do not create a new category
        const existedCategory = savedCategories.find((c) => c.id === categoryToSave.id);
        if (existedCategory) {
            existedCategory.title = categoryToSave.title;
            existedCategory.description = categoryToSave.description;
            // new => create a new category
        } else {
            categoryToSave.id = new Date().getTime();
            categoryToSave.createdAt = new Date().toISOString();
            savedCategories.push(categoryToSave);
        }
        localStorage.setItem("categories", JSON.stringify(savedCategories));
    }
    // get all products
    static getAllProducts(sort = "latest") {
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
        return savedProducts.sort((a, b) => {
            if (sort === "latest") {
                return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
            } else if (sort === "earliest") {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            }
        });

    }
    // save product
    static saveProduct(productToSave) {
        const savedProducts = Storage.getAllProducts();
        const existedProduct = savedProducts.find((p) => p.id === productToSave.id);
        // edit 
        if (existedProduct) {
            existedProduct.title = productToSave.title;
            existedProduct.quantity = productToSave.quantity;
            existedProduct.category = productToSave.category;
        } else {
            productToSave.id = new Date().getTime();
            productToSave.createdAt = new Date().toISOString();
            savedProducts.push(productToSave);
        }
        localStorage.setItem("products", JSON.stringify(savedProducts));
    }
    static deleteProduct(id) {
        const savedProducts = Storage.getAllProducts();
        const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
        localStorage.setItem("products", JSON.stringify(filteredProducts));
    }
}