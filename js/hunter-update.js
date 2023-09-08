const defaultPhonesCount = 9; // Number of default phones to display initially
let allPhonesData = []; // Store all phones data

const loadPhones = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allPhonesData = data.data;
            displayPhones(allPhonesData, defaultPhonesCount); // Display the default phones
        })
        .catch(error => console.log(error))
};

const displayPhones = (phones, count) => {
    //console.log(phones);
    const cardContainer = document.getElementById('card-container');
    //data reset
    cardContainer.innerHTML = '';
    //data show only 9
    const showAll = document.getElementById('show-all');
    if (allPhonesData.length > defaultPhonesCount) {
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //no found message
    const noFoundMeaasge = document.getElementById('no-found-message');
    if (allPhonesData.length === 0) {
        noFoundMeaasge.classList.remove('d-none')
    }
    else {
        noFoundMeaasge.classList.add('d-none')
    }

    for (let i = 0; i < count; i++) {
        if (phones[i]) {
            const phone = phones[i];
            const colDiv = document.createElement('div');
            colDiv.classList.add('col');
            colDiv.innerHTML = `
               <div class="card p-4">
                         <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional
                                content. This content is a little bit longer.</p>
                                <button onClick="getDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">Show Details</button>
                        </div>
                    </div>
        `;
            cardContainer.appendChild(colDiv);
        }
    }
    //stop spinner
    toggleSpinner(false);
};

// Function to handle "Show All" button click
const showAllPhones = () => {
    displayPhones(allPhonesData, allPhonesData.length);
};
//show-all-btn
document.getElementById('show-all-btn').addEventListener('click', showAllPhones);

//search items
const searchProducts = () => {
    const searchKeyword = document.getElementById('search-field').value.trim();
    if (searchKeyword !== '') {
        loadPhones(searchKeyword);
    }
    document.getElementById('search-field').value = '';
};
document.getElementById('search-btn').addEventListener('click', function () {
    //start spinner
    toggleSpinner(true);
    searchProducts();
});

//Function to handle Enter key press
const handleEnterKeyPress = (event) => {
    const searchBtn = document.getElementById('search-btn');
    if (event.key === 'Enter') {
        //Start spinner and load 9 items and add style
        toggleSpinner(true);
        searchProducts(9);
        searchBtn.style.border = '2px dotted green';
        searchBtn.style.backgroundColor = 'plum';
    }
    else {
        document.getElementById('search-field').addEventListener('click', function () {
            searchBtn.style.border = 'none';
            searchBtn.style.backgroundColor = 'gold';
        });
    }
};
// Add event listener for Enter key press on the search field
document.getElementById('search-field').addEventListener('keypress', handleEnterKeyPress);


//spinner
const toggleSpinner = isLoding => {
    const spinnerLoder = document.getElementById('spinner-loder');
    if (isLoding) {
        spinnerLoder.classList.remove('d-none');
    }
    else {
        spinnerLoder.classList.add('d-none');
    }
};

const getDetails = async (id) => {
    try {
        const idUrl = `https://openapi.programming-hero.com/api/phone/${id}`;
        const res = await fetch(idUrl);

        if (!res.ok) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const data = await res.json();
        phonesDetails(data.data);
    } catch (error) {
        console.error("An error occurred:", error);

        // You can also handle the error in other ways, such as showing a message to the user:
        alert("An error occurred while fetching phone details. Please try again later.");
    }
};

const phonesDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('detailsModalLabel');
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <p>Release Date : ${phone.releaseDate}</p>
    <p>displaySize : ${phone.mainFeatures.displaySize}</p>
    <p>Bluetooth : ${phone.others ? phone.others.Bluetooth : 'there is no Bluetooth device'}</p>
    `;
};
// Load default
// loadPhones('phone');


