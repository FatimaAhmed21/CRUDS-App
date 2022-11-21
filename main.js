let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submitBtn = document.getElementById("submit")

let mood = "create";
let tmp;

//get total
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background = "#040"
    } else {
        total.innerHTML = "";
        total.style.background = "#972323"
    }
}



//create product count and save localstorage
let productData;
if (localStorage.product != null) {
    productData = JSON.parse(localStorage.product)
} else {
    productData = [];
}

submitBtn.onclick = function() {
    let newProduct = {
        productTitle: title.value.toLowerCase(),
        productPrice: price.value,
        productTaxes: taxes.value,
        productAds: ads.value,
        productDiscount: discount.value,
        productTotal: total.innerHTML,
        productCount: count.value,
        productCategory: category.value.toLowerCase()
    }

    if (title.value != "" && price.value != "" && category.value != "") {
        if (mood === "create") {
            if (newProduct.productCount > 1) {
                for (let i = 0; i < newProduct.productCount; i++) {
                    productData.push(newProduct)
                }
            } else {
                productData.push(newProduct)
            }
        } else {
            productData[tmp] = newProduct;
            mood = "create";
            submitBtn.innerHTML = "Create"
            count.style.display = "initial"
        }
        clearData();

    }

    localStorage.setItem("product", JSON.stringify(productData));
    showData();
}


// clear inputs 
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    total.style.background = "#972323";
}


//read => add to table
function showData() {
    let row = ""
    for (let i = 0; i < productData.length; i++) {
        row += `<tr><td>${i+1}</td><td>${productData[i].productTitle}</td><td>${productData[i].productPrice}</td><td>${productData[i].productTaxes}</td><td>${productData[i].productAds}</td><td>${productData[i].productDiscount}</td><td>${productData[i].productTotal}</td><td>${productData[i].productCategory}</td><td><button onclick="updateProduct(${i})" id="update">Update</button></td><td><button onclick="deleteProduct(${i})" id="delet">Delete</button></td></tr>`
    }
    document.getElementById("tbody").innerHTML = row;

    let deletAllBtn = document.querySelector(".delete-all")
    if (productData.length > 0) {
        deletAllBtn.innerHTML = `<button onclick = "deleteAll()">Delete All (${productData.length})</button>`
    } else {
        deletAllBtn.innerHTML = ""
    }
}
showData();


//delete product
function deleteProduct(productIndex) {
    productData.splice(productIndex, 1);
    localStorage.product = JSON.stringify(productData);
    showData();
}


//delete all products
function deleteAll() {
    localStorage.clear();
    productData.splice(0);
    showData();
}


//update product
function updateProduct(productIndex) {
    title.value = productData[productIndex].productTitle;
    price.value = productData[productIndex].productPrice;
    taxes.value = productData[productIndex].productTaxes;
    ads.value = productData[productIndex].productAds;
    discount.value = productData[productIndex].productDiscount;
    getTotal();
    count.style.display = "none";
    category.value = productData[productIndex].productCategory;
    submitBtn.innerHTML = "Update";
    mood = "update";
    tmp = productIndex;
}


//search
let searchMood = "title"

function getSearchMood(id) {
    let searchInput = document.getElementById("search")
    if (id === "searchTitle") {
        searchMood = "title";
        searchInput.placeholder = "search by title"
    } else {
        searchMood = "category";
        searchInput.placeholder = "search by category"
    }
    searchInput.focus();
    searchInput.value = "";
    showData();
}

function searchProduct(value) {
    let row = "";
    if (searchMood === "title") {
        for (let i = 0; i < productData.length; i++) {
            if (productData[i].productTitle.includes(value.toLowerCase())) {
                row += `<tr><td>${i}</td><td>${productData[i].productTitle}</td><td>${productData[i].productPrice}</td><td>${productData[i].productTaxes}</td><td>${productData[i].productAds}</td><td>${productData[i].productDiscount}</td><td>${productData[i].productTotal}</td><td>${productData[i].productCategory}</td><td><button onclick="updateProduct(${i})" id="update">Update</button></td><td><button onclick="deleteProduct(${i})" id="delet">Delete</button></td></tr>`
            }
        }
    } else {
        for (let i = 0; i < productData.length; i++) {
            if (productData[i].productCategory.includes(value.toLowerCase())) {
                row += `<tr><td>${i}</td><td>${productData[i].productTitle}</td><td>${productData[i].productPrice}</td><td>${productData[i].productTaxes}</td><td>${productData[i].productAds}</td><td>${productData[i].productDiscount}</td><td>${productData[i].productTotal}</td><td>${productData[i].productCategory}</td><td><button onclick="updateProduct(${i})" id="update">Update</button></td><td><button onclick="deleteProduct(${i})" id="delet">Delete</button></td></tr>`
            }
        }
    }
    document.getElementById("tbody").innerHTML = row;
}