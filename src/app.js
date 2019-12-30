const formData = document.querySelector('form');
const inputText = document.querySelector('input');
formData.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputvalue = inputText.value
    console.log(inputvalue);

})