const formData = document.querySelector('form');
const inputText = document.querySelector('input');
const paragraphTag = document.getElementById('result')
formData.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputvalue = inputText.value

    fetch('http://localhost:3000/weather?address=' + inputvalue).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                paragraphTag.innerHTML = data.error;
            } else {
                console.log(data.location);
                console.log(data.forecast);
                paragraphTag.innerHTML = data.location + "<br>" + data.forecast;

            }
        })
    });

})