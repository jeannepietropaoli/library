let books = [];
const CONTAINER = document.querySelector('.container');
const ADDBOOK = document.querySelector('.addBook');
const FORM_CONTAINER = document.querySelector('.formContainer');
const MASK = document.querySelector('.mask');
const SUBMIT_BUTN = document.querySelector('.submit');
const FORM_INPUTS = document.querySelectorAll('form input');
const REQUIREDINPUTS = document.querySelectorAll('input[required]');
const CANCEL_FORM = document.querySelector('.cancelForm');
const GITHUBLINK = document.querySelector('a');
const GITHUBBTN = document.querySelector('#githubLogo');
const SLIDER = document.querySelector('.slider');
const FORM_CHECKBOX = document.querySelector('.FormCheckbox');
FORM_CHECKBOX.value = 'read';
const STATUS_DISPLAY = document.querySelector('.statusDisplay');
const SLIDER_PIECE = document.querySelector('.slider>span');

function Book(bookTitle, bookAuthor, bookPages, bookStatus){
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.status = bookStatus;
}

function addBookToLibrary() {
    let titleInput =  document.querySelector('#title').value;
    let authorInput = document.querySelector('#author').value;
    let pagesInput = document.querySelector('#pages').value;
    let statusInput = FORM_CHECKBOX.value;
    books.push(new Book(titleInput, authorInput, pagesInput , statusInput));
}

Book.prototype.createBookCard = function() {
    const bookToDisplay = document.createElement('div');
    bookToDisplay.setAttribute('data-index', books.length-1);
    return bookToDisplay;
}

Book.prototype.titleInfos = function(){
    const titleDisplay = document.createElement('p');
    titleDisplay.textContent = (books[books.length-1].title).toUpperCase();
    return titleDisplay;
}

Book.prototype.authorInfos = function() {
    const authorDisplay = document.createElement('p');
    authorDisplay.textContent = `By : ${books[books.length-1].author}`;
    return authorDisplay;
}

Book.prototype.pagesInfos = function() {
    const pagesDisplay = document.createElement('p');
    pagesDisplay.textContent = `Number of pages : ${books[books.length-1].pages}`;
    return pagesDisplay;
}

Book.prototype.createDeleteBookBtn = function() {
    const deleteBook = document.createElement('span');
    deleteBook.textContent = 'x';
    deleteBook.style.cursor = 'pointer';
    deleteBook.classList.add('deleteBook');
    return deleteBook;   
}

Book.prototype.createCheckbox = function() {
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    return checkbox;
}

Book.prototype.createSlider = function() {
    const slider = document.createElement('div');
    slider.classList.add('slider');
    slider.style.backgroundColor = 'white';
    slider.setAttribute('data-index', books.length-1);
    return slider;
}

Book.prototype.statusInfos = function() {
    const statusDis = document.createElement('span');
    statusDis.classList.add('test');
    statusDis.textContent = books[books.length-1].status;
    return statusDis;
}

Book.prototype.appendBookElements = function (statusDisplay, checkbox, statusDis, deleteBook, titleDisplay, authorDisplay, pagesDisplay, bookToDisplay, slider, sliderPiece) {
    statusDisplay.append(checkbox, statusDis, slider);
    slider.appendChild(sliderPiece);
    bookToDisplay.append(deleteBook, titleDisplay, authorDisplay, pagesDisplay, statusDisplay);
    CONTAINER.appendChild(bookToDisplay);
}

Book.prototype.defineSliderColor = function(sliderPiece) {
    if (books[books.length-1].status === 'read'){
        sliderPiece.style.marginLeft = 0;
        sliderPiece.style.backgroundColor = '#E62100';
    } else {
        sliderPiece.style.marginLeft = '31px';
        sliderPiece.style.backgroundColor = '#15454C';
    } 
}

Book.prototype.deleteABook = function(deleteBook){
    deleteBook.addEventListener('click', (e) => {
        books.splice(e.target.parentElement.getAttribute('data-index'),1);
        CONTAINER.removeChild(e.target.parentElement);
    })
}

Book.prototype.switchStatus = function(slider, sliderPiece) {
    slider.addEventListener('click', ()=> {
        slider.previousElementSibling.textContent === 'read' ? slider.previousElementSibling.textContent = 'not read yet' :
            slider.previousElementSibling.textContent = 'read';
        books[slider.getAttribute('data-index')].status = slider.previousElementSibling.textContent;
        sliderPiece.style.marginLeft === '31px' ? sliderPiece.style.marginLeft = 0 : sliderPiece.style.marginLeft = '31px';
        sliderPiece.style.marginLeft === '31px' ? sliderPiece.style.backgroundColor = '#15454C' : sliderPiece.style.backgroundColor = '#E62100';
    })
}

function displayNewBook(){
    const bookToDisplay = books[books.length-1].createBookCard();
    const titleDisplay = books[books.length-1].titleInfos();
    const authorDisplay = books[books.length-1].authorInfos();
    const pagesDisplay = books[books.length-1].pagesInfos();
    const deleteBook = books[books.length-1].createDeleteBookBtn();

    const statusDisplay = document.createElement('div');
    const checkbox = books[books.length-1].createCheckbox();
    const slider = books[books.length-1].createSlider();
    const statusDis = books[books.length-1].statusInfos();
    const sliderPiece = document.createElement('span');

    books[books.length-1].appendBookElements(statusDisplay, checkbox, statusDis, deleteBook, titleDisplay, authorDisplay, pagesDisplay, bookToDisplay, slider, sliderPiece);
    books[books.length-1].defineSliderColor(sliderPiece);
    
    books[books.length-1].deleteABook(deleteBook);
    books[books.length-1].switchStatus(slider, sliderPiece);
}

function isOneInputInvalid(){
    return Array.from(FORM_INPUTS).some(input => input.checkValidity()===false);
}

function formAppearence() {
    MASK.style.opacity = 0.5; 
    MASK.classList.add('blur');
    FORM_CONTAINER.classList.add('formAppearance')
}

function formDisappearence() {
    MASK.style.opacity = 1; 
    MASK.classList.remove('blur');
    FORM_CONTAINER.classList.remove('formAppearance');
}

function resetFormValues() {
    FORM_CHECKBOX.value = 'on';
    STATUS_DISPLAY.textContent = 'Book status : read';
    FORM_INPUTS.forEach(input => input.value = "");
    REQUIREDINPUTS.forEach(requiredInput => requiredInput.setAttribute('placeholder', ' '));
    SLIDER_PIECE.style.marginLeft = 0;
}

ADDBOOK.addEventListener('click', function(){
    formAppearence();
    FORM_CHECKBOX.value = 'read';
})

SUBMIT_BUTN.addEventListener('click', function() {
    if (!isOneInputInvalid()){
        formDisappearence();
        addBookToLibrary();
        displayNewBook(books);
        resetFormValues();
}
    else{
        let invaliInputs = Array.from(FORM_INPUTS).filter(input => input.checkValidity()===false);
        invaliInputs.forEach(item => item.setAttribute('placeholder', 'enter a valid value'))
    }
})

REQUIREDINPUTS.forEach(requiredInput =>{
    requiredInput.addEventListener('click', function(){
        requiredInput.removeAttribute('placeholder');
    })
})

CANCEL_FORM.addEventListener('click', function(){
    formDisappearence();
    FORM_INPUTS.forEach(input => input.value = "");
    resetFormValues();
} )

GITHUBLINK.addEventListener('mouseover', () => GITHUBBTN.setAttribute('src', 'iconGitOrange.jpg'))

GITHUBLINK.addEventListener('mouseout', () => GITHUBBTN.setAttribute('src', 'iconGit.jpg'))

SLIDER.addEventListener('click', () => {
    (STATUS_DISPLAY.textContent === 'Book status : read') ? STATUS_DISPLAY.textContent = 'Book status : not read yet' : 
        STATUS_DISPLAY.textContent = 'Book status : read';
    (FORM_CHECKBOX.value === 'read') ? FORM_CHECKBOX.value = 'not read yet' : FORM_CHECKBOX.value = 'read';
    SLIDER_PIECE.style.marginLeft === '31px' ? SLIDER_PIECE.style.marginLeft = 0 : SLIDER_PIECE.style.marginLeft = '31px';
    })


