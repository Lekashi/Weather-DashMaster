setInterval(function (){$('#currentTime').text(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));}, 1000);
var APIkey = "b3ffbfc2d2d5a7ba5ea274ccea458047";
let state;
let city;
let localLoc = JSON.parse(localStorage.getItem('location'))||[];
LocalStr(localLoc);

$(document).ready(function () {
    $("#searchButton").click(function () {
        searchInput = $("#searchInput").val();
        searchPosFunc(searchInput)
    });
});

function searchPosFunc(seachParam) {
    var searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${seachParam}&limit=1&appid=${APIkey}`
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => searchWeatherFunc(data));
}

function searchWeatherFunc(dataObj) {
    var lat = dataObj[0].lat;
    var lon = dataObj[0].lon;
    city = dataObj[0].name;
    state = dataObj[0].state;
    var storageArray = [
        ...localLoc,
        `${city}, ${state}`
    ]
    JSON.parse(localStorage.getItem('location'))||[];
    localStorage.setItem('location', JSON.stringify(storageArray));
    LocalStr(storageArray);
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
    fetch(url)
    .then(response => response.json())
    .then(data => WeatherRender(data))
}

function WeatherRender(dataObj) {
    console.log(dataObj);
    $('#place').text(`${city}, ${state}`)
    $('#todayTemp').text(`${dataObj.current.temp} °F`);
    $('#todayWind').text(`${dataObj.current.wind_speed} Mph`);
    $('#todayHumid').text(`${dataObj.current.humidity}%`);
    $('#todayUvi').text(dataObj.current.uvi);
    fiveDayForecast(dataObj);
}

function fiveDayForecast(dataObj) {
    for (let index = 1; index < 6; index++) {
        $(`#day${index}Ahead`).empty();
        $(`#day${index}Ahead`).append(`<h2>${moment().add(index, 'days').format('L')}</h2>`);
        $(`#day${index}Ahead`).append(`<p>Temperature: ${dataObj.daily[index].temp.day} °F</p>`);
        $(`#day${index}Ahead`).append(`<p>Wind: ${dataObj.daily[index].wind_speed} Mph</p>`);
        $(`#day${index}Ahead`).append(`<p>Humidity: ${dataObj.daily[index].humidity}%</p>`);
        $(`#day${index}Ahead`).append(`<p>UV Index: ${dataObj.daily[index].uvi}</p>`);
    }
}
function LocalStr(localLoc) {
    $('#recallCityList').empty();
    localLoc.forEach(remPlace => {
        $('#recallCityList').append($(`<li>${remPlace}</li>`));
    });
}