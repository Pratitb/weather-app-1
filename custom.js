const api = {
    key: "1e000e131269ac10cfb2cb097aa24bd2",
    base: "https://api.openweathermap.org/data/2.5/"
}
//let's get the searchbox
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value)
        searchbox.value = '';
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather){
    //then we get the city
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#8451;</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML =weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `${weather.main.temp_min}<span>&#8451;</span> / ${weather.main.temp_max}<span>&#8451;</span>`;
}

function dateBuilder(d){
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day =  days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

//we have set up an event listener on the search box.when a key is pressed like enter key.once that code is run, we run a fetch request where we 1st get the base url then we add the weather and query which is from the searchbox.value and then we set the units to celsius and fahrenhite and then we set the appid that will be the api key
//then it will return the weather and then we convert it to json and then we pass the json to the displayResults function