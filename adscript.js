const products = [
    { name: "Product 1", price: 10, description: "Description of Product 1" },
    { name: "Product 2", price: 20, description: "Description of Product 2" },
    { name: "Product 3", price: 10, description: "Description of Product 3" },
    { name: "Product 4", price: 30, description: "Description of Product 4" },
    { name: "Product 5", price: 20, description: "Description of Product 5" }
];

document.getElementById("price-input").addEventListener("input", debounce(findProducts));

function debounce(callback, delay = 250){
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}

function findProducts() {
    const priceInput = parseInt(document.getElementById("price-input").value)
    const matchingProducts = products.filter(product => product.price <= priceInput)
    displayProducts(matchingProducts)
}

function displayProducts(products) {
        const productsContainer = document.getElementById("products-container")
        while (productsContainer.firstChild) {
            productsContainer.removeChild(productsContainer.firstChild)
        }

    if (products.length === 0) {
        const noProductsParagraph = document.createElement("p")
        noProductsParagraph.textContent = "No products found within or below this price."
        productsContainer.appendChild(noProductsParagraph)
    } else {
        products.forEach(product => {
            const productDiv = document.createElement("div")
            productDiv.classList.add("product")

            const productName = document.createElement("h3")
            productName.textContent = product.name

            const priceParagraph = document.createElement("p")
            priceParagraph.textContent = "Price: $" + product.price

            const descriptionParagraph = document.createElement("p")
            descriptionParagraph.textContent = "Description: " + product.description

            productDiv.appendChild(productName)
            productDiv.appendChild(priceParagraph)
            productDiv.appendChild(descriptionParagraph)

            productsContainer.appendChild(productDiv)
        })
    }
}
