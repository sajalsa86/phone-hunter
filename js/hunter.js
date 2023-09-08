
const loadPhones = async (searchText, dataLimit) => {
    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    }
    catch (error) {
        console.log(error);
    }
};

const displayPhones = (phones, dataLimit) => {
    //console.log(phones);
    const cardContainer = document.getElementById('card-container');
    //data reset
    cardContainer.innerHTML = '';
    //data show only 9
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //no found message
    const noFoundMeaasge = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noFoundMeaasge.classList.remove('d-none')
    }
    else {
        noFoundMeaasge.classList.add('d-none')
    }

    phones.forEach(phone => {
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
    });
    //stop spinner
    toggleSpinner(false);
};
//search items
const searchProducts = (dataLimit) => {
    const searchKeyword = document.getElementById('search-field').value.trim();
    if (searchKeyword !== '') {
        loadPhones(searchKeyword, dataLimit);
    }
    //document.getElementById('search-field').value = '';
};
document.getElementById('search-btn').addEventListener('click', function () {
    //start spinner
    toggleSpinner(true);
    searchProducts(9);
});
//Function to handle Enter key press
//style on search btn when press enter 
document.getElementById('search-field').addEventListener('keypress', function (event) {
    const searchBtn = document.getElementById('search-btn');
    if (event.key === 'Enter') {
        //Start spinner and load 9 items
        toggleSpinner(true);
        searchProducts(9);
        searchBtn.style.border = '2px dotted green';
    }
    else {
        document.getElementById('search-field').addEventListener('click', function () {
            searchBtn.style.border = 'none';
        });
    }
});

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
//not ther better way
document.getElementById('show-all-btn').addEventListener('click', function () {
    searchProducts();

});

// show details
const getDetails = async id => {
    const idUrls = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(idUrls);
    const data = await res.json();
    phonesDetails(data.data);
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
// loadPhones('oppo');
