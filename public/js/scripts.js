const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
const weaIcon = document.getElementById('weatherIcon');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    const queryString = '/weather?address='+search.value;
    fetch(queryString).then((response) => {
        response.json().then((retData) => {
            if(retData.error) {
                return messageOne.textContent = retData.error;
            }

            messageOne.textContent = retData.placeName;
            messageTwo.textContent = 'Over Cast: ' + retData.data.overCast + '. Currently temperature is ' + retData.data.currentTemp + '. But it feels like ' + retData.data.feelsLike + '. Has humidity of ' + retData.data.humidity;
            weaIcon.visible = true;
            weaIcon.src= 'http://openweathermap.org/img/wn/'+retData.data.weatherIcon+'.png';
        });
    });
});
