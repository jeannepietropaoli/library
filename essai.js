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
    let statusInput = FORM_CHECKBOX.value;
    books.push(new Book(titleInput, authorInput, pagesInput , statusInput));
}

function displayNewBook(arrOfBooks){
    let bookToDisplay = document.createElement('div');
    bookToDisplay.setAttribute('data-index', arrOfBooks.length-1);
    
    let titleDisplay = document.createElement('p');
    titleDisplay.textContent = arrOfBooks[arrOfBooks.length-1].title;

    let authorDisplay = document.createElement('p');
    authorDisplay.textContent = `By : ${arrOfBooks[arrOfBooks.length-1].author}`;

    let pagesDisplay = document.createElement('p');
    pagesDisplay.textContent = `Number of pages : ${arrOfBooks[arrOfBooks.length-1].pages}`;

    let statusDisplay = document.createElement('div');
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    let slider = document.createElement('div');
    slider.classList.add('slider');
    slider.setAttribute('data-index', arrOfBooks.length-1);
    let statusDis = document.createElement('span');
    statusDis.classList.add('test');
    statusDis.textContent = arrOfBooks[arrOfBooks.length-1].status;
    
    let sliderPiece = document.createElement('span');
    statusDisplay.append(checkbox, slider, statusDis);
    slider.appendChild(sliderPiece);

    bookToDisplay.append(titleDisplay, authorDisplay, pagesDisplay, statusDisplay);
    CONTAINER.appendChild(bookToDisplay);

    slider.addEventListener('click', ()=> {
        console.log(slider.getAttribute('data-index'));
        slider.nextElementSibling.textContent === 'read' ? slider.nextElementSibling.textContent = 'not read yet' :
        slider.nextElementSibling.textContent = 'read';
        arrOfBooks[slider.getAttribute('data-index')].status = slider.nextElementSibling.textContent;
    })
}

function isOneInputInvalid(){
    return Array.from(FORM_INPUTS).some(input => input.checkValidity()===false);
}

ADDBOOK.addEventListener('click', function(){
    MASK.style.opacity = 0.5;
    MASK.classList.add('blur');
    FORM_CONTAINER.classList.toggle('formAppearance');
    FORM_CHECKBOX.value = 'read';
})

SUBMIT_BUTN.addEventListener('click', function() {
    if (!isOneInputInvalid()){
        MASK.style.opacity = 1;
        MASK.classList.remove('blur');
        FORM_CONTAINER.classList.toggle('formAppearance');
        addBookToLibrary();
        displayNewBook(books);
        FORM_CHECKBOX.value = 'on';
        STATUS_DISPLAY.textContent = 'Book status : read';
        FORM_INPUTS.forEach(input => input.value = "");
        REQUIREDINPUTS.forEach(requiredInput => requiredInput.setAttribute('placeholder', ' '));
        SLIDER_PIECE.style.marginLeft = 0;
}
})

REQUIREDINPUTS.forEach(requiredInput =>{
    requiredInput.addEventListener('click', function(){
        requiredInput.removeAttribute('placeholder');
    })
})

CANCEL_FORM.addEventListener('click', function(){
    MASK.style.opacity = 1;
    MASK.classList.remove('blur');
    FORM_CONTAINER.classList.toggle('formAppearance');
    FORM_INPUTS.forEach(input => input.value = "");
    FORM_CHECKBOX.value = 'on';
    STATUS_DISPLAY.textContent = 'Book status : read';
    REQUIREDINPUTS.forEach(requiredInput => requiredInput.setAttribute('placeholder', ' '));
    SLIDER_PIECE.style.marginLeft = 0;
} )

GITHUBLINK.addEventListener('mouseover', function(){
    GITHUBBTN.setAttribute('src', 'iconGitOrange.jpg');
})

GITHUBLINK.addEventListener('mouseout', function(){
    GITHUBBTN.setAttribute('src', 'iconGit.jpg');
})

SLIDER.addEventListener('click', () => {
    (STATUS_DISPLAY.textContent === 'Book status : read') ? STATUS_DISPLAY.textContent = 'Book status : not read yet' : 
    STATUS_DISPLAY.textContent = 'Book status : read';
    (FORM_CHECKBOX.value === 'read') ? FORM_CHECKBOX.value = 'not read yet' : FORM_CHECKBOX.value = 'read';
    SLIDER_PIECE.style.marginLeft === '31px' ? SLIDER_PIECE.style.marginLeft = 0 : SLIDER_PIECE.style.marginLeft = '31px';
    })


