const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    const queryString = 'http://localhost:3000/weather?address='+search.value;
    fetch(queryString).then((response) => {
        response.json().then((retData) => {
            if(retData.error) {
                return messageOne.textContent = retData.error;
            }

            messageOne.textContent = retData.placeName;
            messageTwo.textContent = retData.data;
        });
    });
});