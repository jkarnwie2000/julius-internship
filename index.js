
let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

//**👇START OF BACKGROUND SHAPES👇**//
function moveBackground(event) {
    const shapes = document.querySelectorAll('.shape')
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;
    console.log(x, y)

    for (let i = 0; i < shapes.length; ++i) {
        const isOdd = i % 2 !== 0;
        const boolInt = isOdd ? -1 : 1;
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`        
    }
}
//**☝️END OF BACKGROUND SHAPES☝️**//


//**👇START OF DARK-THEME BLACK/WHITE TOGGLE EFFECT👇**//
function toggleContrast() {
    contrastToggle = !contrastToggle
    if (contrastToggle) {
    document.body.classList += " dark-theme"
}
else {
    document.body.classList.remove("dark-theme")
}
}
//**☝️END OF DARK-THEME BLACK/WHITE TOGGLE EFFECT☝️**//


//**👇START OF SLIDING OPEN AND CLOSED BOTH SIDES OF MODAL/CONTACT WINDOW👇**//
function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading');
    const success = document.querySelector('.modal__overlay--success');
    loading.classList += " modal__overlay--visible"
    emailjs
    .sendForm(
        'service_56y7j1g',
        'template_87bdkhg',
         event.target,
        '476QBa57rXxhABYJa'        
    ).then(() => {
    loading.classList.remove("modal__overlay--visible");
    success.classList += " modal__overlay--visible"
        }).catch(() => {
    loading.classList.remove("modal__overlay--visible")
    alert("The service is temporarily unavailable. Pleases contact me by email at richjuliusgold2000@yahoo.com")
    })
}
//**☝️END OF SLIDING OPEN AND CLOSED BOTH SIDES OF MODAL/CONTACT WINDOW☝️**//


//**👇START OF OPENING AND CLOSING ENTIRE MODAL/CONTACT WINDOW👇**//
function toggleModal() {
if (isModalOpen) {
    isModalOpen = false
    return document.body.classList.remove("modal--open")
}
isModalOpen = true
document.body.classList += " modal--open"
}
//**☝️START OF OPENING AND CLOSING ENTIRE MODAL/CONTACT WINDOW☝️**//

