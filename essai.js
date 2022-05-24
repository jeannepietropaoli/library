let books = [];
const CONTAINER = document.querySelector('.container');
const ADDBOOK = document.querySelector('.addBook');
const FORM_CONTAINER = document.querySelector('.formContainer');
const MASK = document.querySelector('.mask');
const SUBMIT_BUTN = document.querySelector('.submit');
const FORM_INPUTS = document.querySelectorAll('form input');
const REQUIREDINPUTS = document.querySelectorAll('input[required]');
const CANCEL_FORM = document.querySelector('.cancelForm');

function Book(bookTitle, bookAuthor, bookPages, bookStatus){
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.status = bookStatus;
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}.`;
}

Book.prototype.titleInfo = function(){
    bookToDisplay.appendChild(document.createElement('p')).textContent = `${this.title}`;
}

function addBookToLibrary() {
    let titleInput =  document.querySelector('#title').value;
    let authorInput = document.querySelector('#author').value;
    let pagesInput = document.querySelector('#pages').value;
    let statusInput = document.querySelector('#status').value;
    books.push(new Book(titleInput, authorInput, pagesInput , statusInput));
}

/* function displayNewBook(arrOfBooks){
    let bookToDisplay = document.createElement('div');
    CONTAINER.appendChild(bookToDisplay);
    let titleDisplay = document.createElement('p');
    titleDisplay.textContent = 'skjsksjksjk';
    bookToDisplay.appendChild(document.createElement('p'));
    bookToDisplay.textContent = `${arrOfBooks[arrOfBooks.length-1].info()}`;
} */

function displayNewBook(arrOfBooks){
    let bookToDisplay = document.createElement('div');
    let titleDisplay = document.createElement('p');
    titleDisplay.textContent = arrOfBooks[arrOfBooks.length-1].title;

    let authorDisplay = document.createElement('p');
    authorDisplay.textContent = `By : ${arrOfBooks[arrOfBooks.length-1].author}`;

    let pagesDisplay = document.createElement('p');
    pagesDisplay.textContent = `Number of pages : ${arrOfBooks[arrOfBooks.length-1].pages}`;

    let statusDisplay = document.createElement('button');
    statusDisplay.textContent = arrOfBooks[arrOfBooks.length-1].status;

    bookToDisplay.append(titleDisplay, authorDisplay, pagesDisplay, statusDisplay);
    CONTAINER.appendChild(bookToDisplay);
}

function isOneInputInvalid(){
    return Array.from(FORM_INPUTS).some(input => input.checkValidity()===false);
}

ADDBOOK.addEventListener('click', function(){
    MASK.style.opacity = 0.5;
    FORM_CONTAINER.classList.toggle('formAppearance');
})

SUBMIT_BUTN.addEventListener('click', function() {
    if (!isOneInputInvalid()){
        MASK.style.opacity = 1;
        FORM_CONTAINER.classList.toggle('formAppearance');
        addBookToLibrary();
        displayNewBook(books);
        FORM_INPUTS.forEach(input => input.value = "");
        REQUIREDINPUTS.forEach(requiredInput => requiredInput.setAttribute('placeholder', ' '))
    }
    
})

REQUIREDINPUTS.forEach(requiredInput =>{
    requiredInput.addEventListener('click', function(){
        requiredInput.removeAttribute('placeholder');
    })
})

CANCEL_FORM.addEventListener('click', function(){
    MASK.style.opacity = 1;
    FORM_CONTAINER.classList.toggle('formAppearance');
    FORM_INPUTS.forEach(input => input.value = "");
    REQUIREDINPUTS.forEach(requiredInput => requiredInput.setAttribute('placeholder', ' '))
} )

