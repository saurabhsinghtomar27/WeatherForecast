const timeE1 = document.querySelector('#time1');
const color = document.querySelector("#color");
// console.log(color);
const dateE1 = document.querySelector('#date');
const currentweatherItemsE1 = document.querySelector('#current-weather-items');
const timezone = document.querySelector('#time-zone');
const countryE1 = document.querySelector('#country');
const weatherForecastE1 = document.querySelector('#weather-forecast');
const currentTempE1 = document.querySelector('#current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];
const API_KEY = 'f6a02c6e0d082580a09bc75d5251683a';
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const seconds = time.getSeconds();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const minute = minutes <= 9 ? `0${minutes}` : minutes;
    const hoursIn12hrformat = hour >= 13 ? hour % 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    timeE1.innerHTML = hoursIn12hrformat + ':' + minute + `<span id="am-pm">${ampm}</span>`;
    dateE1.innerHTML = days[day] + "," + date + months[month];
}, 1000)
function getweatherdata() {
    navigator.geolocation.getCurrentPosition((sucess) => {

        let { latitude, longitude } = sucess.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(resolve => {
            return resolve.json();
        }).then(data => {
            console.log(data);
            showweather(data);
        })
    })

}

getweatherdata();
const showweather = (data) => {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
    d = `

<div class="weather-item">
                            <div>Humidity</div>
                            <div>${humidity}%</div>
                        </div>
                        <div class="weather-item">
                            <div>Pressure</div>
                            <div>${pressure}</div>
                        </div>
                        <div class="weather-item">
                            <div>Wind Speed</div>
                            <div>${wind_speed}</div>
                        </div>
                        <div class="weather-item">
                        <div>Sunrise</div>
                        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
                    </div>
                    <div class="weather-item">
                        <div>sunset</div>
                        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
                    </div>`;

    const other = document.querySelector('.others');

    other.innerHTML = d;

    let otherdaysforecast = '';
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempE1.innerHTML = `
<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
<div class="other">
    <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
    <div class="temp">Night-${day.temp.night}&#176; C</div>
    <div class="temp">Day-${day.temp.day}&#176; C</div>
</div>
`
        }
        else {
            otherdaysforecast += `
    <div class="weather-forecast" id="weather-forecast">
    <div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">

        <div class="temp">Night-${day.temp.night}&#176; C</div>
        <div class="temp">Day-${day.temp.day}&#176; C</div>
    </div>
</div>`;
        }
    })
    weatherForecastE1.innerHTML = otherdaysforecast;
    // currentTempE1.innerHTML = currentTempE;
}