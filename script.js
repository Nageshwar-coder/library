let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendBookList(book) {
    let {
        author,
        imageLink
    } = book;
    spinnerEl.classList.toggle('d-none');
    // creating container element to hold image, link and author
    let divEl = document.createElement('div');
    divEl.classList.add('book-container', 'col-12', 'col-md-6', 'col-lg-4', 'col-xl-3');
    searchResultsEl.appendChild(divEl);
    // creating image Element
    let imageEl = document.createElement('img');
    imageEl.src = imageLink;
    imageEl.classList.add('book-image');
    divEl.appendChild(imageEl);
    // creating paragraph Element for author
    let paraEl = document.createElement('p');
    paraEl.classList.add('author-name');
    paraEl.textContent = author;
    divEl.appendChild(paraEl);
}


function display(bookList) {
    spinnerEl.classList.toggle('d-none');
    let headingEl = document.createElement('h1');
    headingEl.textContent = 'Popular Books';
    headingEl.classList.add('bookList-heading', 'text-left', 'ml-3', 'mt-3', 'col-12');
    searchResultsEl.appendChild(headingEl);
    for (let book of bookList) {
        createAndAppendBookList(book);
    }
}


function fetchResults(searchInput) {
    spinnerEl.classList.toggle('d-none');
    let options = {
        method: 'GET',
    };
    let url = "https://apis.ccbp.in/book-store?title=" + searchInput;
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let bookList = jsonData.search_results;
            display(bookList);
        });
}



searchInputEl.addEventListener('keydown', function(event) {
    let searchInput = event.target.value;
    if (event.key === "Enter") {
        searchResultsEl.value = "";
        fetchResults(searchInput);
    }
});