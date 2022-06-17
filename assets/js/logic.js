var APIkey = "b3ffbfc2d2d5a7ba5ea274ccea458047";
let state;
let city;
$(document).ready(function() {
    $("#searchButton").click(function(){
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
    console.log(dataObj)
    var lat = dataObj[0].lat;
    var lon = dataObj[0].lon;
    var city = dataObj[0].name;
    var state = dataObj[0].state;
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
}