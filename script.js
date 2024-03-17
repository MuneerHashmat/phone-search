let searchField = document.getElementById("search-field");
let searchButton = document.getElementById("search-button");
let mainContainer = document.getElementById("main-container");
let showAll = document.getElementById("show-all");
let modal = document.getElementById("modal");
let closeModal = document.getElementById("close-button");

let searchText = "13";
let flag = false;

window.addEventListener("load", () => {
    loadPhones(searchText);
})

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchText = searchField.value;
    loadPhones(searchText);
});

showAll.addEventListener("click", () => {
    flag = true;
    loadPhones(searchText);

})

async function loadPhones(text) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    if (flag == true) {
        showAll.style.display = "none";
        displayPhones(phones);
        flag = false;
        return;
    }

    if (phones.length <= 7) {
        displayPhones(phones);
    }
    else {
        let newPhones = phones.slice(0, 7);
        displayPhones(newPhones);
        showAll.style.display = "block";
    }

}

function displayPhones(phones) {

    mainContainer.innerHTML = "";
    phones.forEach(phone => {
        // console.log(phone);
        let phoneContainer = document.createElement("div");
        phoneContainer.classList = "phone-container";
        phoneContainer.innerHTML = `
            <img src="${phone.image}" alt="phone" class="phone-img">
            <h2 class="phone-title">${phone.phone_name}</h2>
            <button onclick="showDetails('${phone.slug}')" class="show-details">Show Details</button>
        `
        mainContainer.appendChild(phoneContainer);
    });
}

async function showDetails(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const details = data.data;
    showPhoneDetails(details);
}


function showPhoneDetails(details) {
    let imageContainer = document.getElementById("image-container");
    let modelName = document.getElementById("model-name");
    let brandName = document.getElementById("brand-details");
    let specDetails = document.getElementById("spec-details");
    let releaseDate = document.getElementById("release-date");

    imageContainer.innerHTML = `<img src="${details.image}" alt="phone">`
    modelName.innerText = details.name;
    brandName.innerText = `Brand: ${details.brand}`

    let features = details.mainFeatures;

    let string = "";

    for (let key in features) {
        string = string + `${key}: ${features[key]} \n`;
    }

    specDetails.innerText = string;
    releaseDate.innerText = `${details.releaseDate}`;

    modal.showModal();
}

closeModal.addEventListener("click", () => {
    modal.close();
})


