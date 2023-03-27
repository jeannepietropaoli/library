class Book {
    constructor(bookTitle, bookAuthor, bookPages, bookStatus) {
        this.title = bookTitle;
        this.author = bookAuthor;
        this.pages = bookPages;
        this.status = bookStatus;
    }

    createBookCard() {
        const bookToDisplay = document.createElement('div');
        bookToDisplay.setAttribute('data-index', library.books.length-1);
        return bookToDisplay;
    }

    titleInfos() {
        const titleDisplay = document.createElement('p');
        titleDisplay.textContent = (library.books[library.books.length-1].title).toUpperCase();
        return titleDisplay;
    }

    authorInfos() {
        const authorDisplay = document.createElement('p');
    authorDisplay.textContent = `By : ${library.books[library.books.length-1].author}`;
    return authorDisplay;
    }

    pagesInfos() {
        const pagesDisplay = document.createElement('p');
        pagesDisplay.textContent = `Number of pages : ${library.books[library.books.length-1].pages}`;
        return pagesDisplay;
    }

    statusInfos() {
        const statusDis = document.createElement('span');
        statusDis.classList.add('test');
        statusDis.textContent = library.books[library.books.length-1].status;
        return statusDis;
    }

    createDeleteBookBtn() {
        const deleteBook = document.createElement('span');
        deleteBook.textContent = 'x';
        deleteBook.style.cursor = 'pointer';
        deleteBook.classList.add('deleteBook');
        return deleteBook;   
    }
    
    createCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        return checkbox;
    }
    
    createSlider() {
        const slider = document.createElement('div');
        slider.classList.add('slider');
        slider.style.backgroundColor = 'white';
        slider.setAttribute('data-index', library.books.length-1);
        return slider;
    }
    
    appendBookElements(statusDisplay, checkbox, statusDis, deleteBook, titleDisplay, authorDisplay, pagesDisplay, bookToDisplay, slider, sliderPiece) {
        statusDisplay.append(checkbox, statusDis, slider);
        slider.appendChild(sliderPiece);
        bookToDisplay.append(deleteBook, titleDisplay, authorDisplay, pagesDisplay, statusDisplay);
        library.CONTAINER.appendChild(bookToDisplay);
    }
    
    defineSliderColor(sliderPiece) {
        if (library.books[library.books.length-1].status === 'read'){
            sliderPiece.style.marginLeft = 0;
            sliderPiece.style.backgroundColor = '#E62100';
        } else {
            sliderPiece.style.marginLeft = '31px';
            sliderPiece.style.backgroundColor = '#15454C';
        } 
    }
    
    deleteABook(deleteBook){
        deleteBook.addEventListener('click', (e) => {
            library.books.splice(e.target.parentElement.getAttribute('data-index'),1);
            library.CONTAINER.removeChild(e.target.parentElement);
        })
    }
 
    switchStatus(slider, sliderPiece) {
        slider.addEventListener('click', ()=> {
            slider.previousElementSibling.textContent === 'read' ? slider.previousElementSibling.textContent = 'not read yet' :
                slider.previousElementSibling.textContent = 'read';
            library.books[slider.getAttribute('data-index')].status = slider.previousElementSibling.textContent;
            sliderPiece.style.marginLeft === '31px' ? sliderPiece.style.marginLeft = 0 : sliderPiece.style.marginLeft = '31px';
            sliderPiece.style.marginLeft === '31px' ? sliderPiece.style.backgroundColor = '#15454C' : sliderPiece.style.backgroundColor = '#E62100';
        })
    }
}

const library = (()=> {
    const CONTAINER = document.querySelector('.container');
    let books = [];
    const displayNewBook = () => {
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
    const addBookToLibrary = ()=> {
        let titleInput =  document.querySelector('#title').value;
        let authorInput = document.querySelector('#author').value;
        let pagesInput = document.querySelector('#pages').value;
        let statusInput = form.FORM_CHECKBOX.value;
        books.push(new Book(titleInput, authorInput, pagesInput , statusInput));
    }
    const ADDBOOK = document.querySelector('.addBook');
    ADDBOOK.addEventListener('click', function(){
        form.formAppearence();
        form.FORM_CHECKBOX.value = 'read';
    })
    return {
        books,
        addBookToLibrary,
        displayNewBook,
        CONTAINER
    }
})()

const form = (() => {
    const SLIDER_PIECE = document.querySelector('.slider>span');
    const SLIDER = document.querySelector('.slider');
    const STATUS_DISPLAY = document.querySelector('.statusDisplay');
    const FORM_CHECKBOX = document.querySelector('.FormCheckbox');
    FORM_CHECKBOX.value = 'read';
    const FORM_CONTAINER = document.querySelector('.formContainer');
    const MASK = document.querySelector('.mask');
    const SUBMIT_BUTN = document.querySelector('.submit');
    const FORM_INPUTS = document.querySelectorAll('form input');
    const REQUIREDINPUTS = document.querySelectorAll('input[required]');
    const CANCEL_FORM = document.querySelector('.cancelForm');
    const isOneInputInvalid = () => {
        return Array.from(FORM_INPUTS).some(input => input.checkValidity()===false);
    }
    const formAppearence = ()=> {
        MASK.style.opacity = 0.5; 
        MASK.classList.add('blur');
        FORM_CONTAINER.classList.add('formAppearance');
    }
    const formDisappearence = ()=> {
        MASK.style.opacity = 1; 
        MASK.classList.remove('blur');
        FORM_CONTAINER.classList.remove('formAppearance');
    }
    const resetFormValues = ()=> {
        FORM_CHECKBOX.value = 'on';
        STATUS_DISPLAY.textContent = 'Book status : read';
        FORM_INPUTS.forEach(input => input.value = "");
        REQUIREDINPUTS.forEach(requiredInput => requiredInput.setAttribute('placeholder', ' '));
        SLIDER_PIECE.style.marginLeft = 0;
    }
    REQUIREDINPUTS.forEach(requiredInput =>{
        requiredInput.addEventListener('click', function(){
            requiredInput.removeAttribute('placeholder');
        })
    })
    CANCEL_FORM.addEventListener('click', function(){
        formDisappearence();
        FORM_INPUTS.forEach(input => input.value = "");
        resetFormValues();
    })
    SUBMIT_BUTN.addEventListener('click', function() {
        if (! isOneInputInvalid()){
            formDisappearence();
            library.addBookToLibrary();
            library.displayNewBook();
            resetFormValues();
    }
        else{
            let invaliInputs = Array.from(form.FORM_INPUTS).filter(input => input.checkValidity()===false);
            invaliInputs.forEach(item => item.setAttribute('placeholder', 'enter a valid value'))
        }
    })
    SLIDER.addEventListener('click', () => {
        (STATUS_DISPLAY.textContent === 'Book status : read') ? STATUS_DISPLAY.textContent = 'Book status : not read yet' : 
            STATUS_DISPLAY.textContent = 'Book status : read';
        (FORM_CHECKBOX.value === 'read') ? FORM_CHECKBOX.value = 'not read yet' : FORM_CHECKBOX.value = 'read';
        SLIDER_PIECE.style.marginLeft === '31px' ? SLIDER_PIECE.style.marginLeft = 0 : SLIDER_PIECE.style.marginLeft = '31px';
        })
    return {
        FORM_CHECKBOX,
        formAppearence
    }
})()

const githubReference = (()=> {
    const GITHUBLINK = document.querySelector('a');
    const GITHUBBTN = document.querySelector('#githubLogo');
    GITHUBLINK.addEventListener('mouseover', () => GITHUBBTN.setAttribute('src', 'iconGitOrange.jpg'))
    GITHUBLINK.addEventListener('mouseout', () => GITHUBBTN.setAttribute('src', 'iconGit.jpg'))
})();

/* if we'd want to only use classes : (would also need other changes)

let books = [];
class Library {
    constructor() {
        if(! Library.instance){
            Library.instance = this;
        } 
        return Library.instance;
    }

    displayNewBook() {
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

    addBookToLibrary() {
        let titleInput =  document.querySelector('#title').value;
        let authorInput = document.querySelector('#author').value;
        let pagesInput = document.querySelector('#pages').value;
        let statusInput = FORM_CHECKBOX.value;
        books.push(new Book(titleInput, authorInput, pagesInput , statusInput));
    }
}

class Form {
    constructor() {
        if(! Form.instance) Form.instance = this;
        return Form.instance;
    }

    isOneInputInvalid() {
        return Array.from(FORM_INPUTS).some(input => input.checkValidity()===false);
    }

    formAppearence() {
        MASK.style.opacity = 0.5; 
        MASK.classList.add('blur');
        FORM_CONTAINER.classList.add('formAppearance');
    }

    formDisappearence() {
        MASK.style.opacity = 1; 
        MASK.classList.remove('blur');
        FORM_CONTAINER.classList.remove('formAppearance');
    }

    resetFormValues() {
        FORM_CHECKBOX.value = 'on';
        STATUS_DISPLAY.textContent = 'Book status : read';
        FORM_INPUTS.forEach(input => input.value = "");
        REQUIREDINPUTS.forEach(requiredInput => requiredInput.setAttribute('placeholder', ' '));
        SLIDER_PIECE.style.marginLeft = 0;
    }
}

let form = new Form();
let library = new Library();
*/


