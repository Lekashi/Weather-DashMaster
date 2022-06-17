var APIkey = "b3ffbfc2d2d5a7ba5ea274ccea458047";

$(document).ready(function() {
    $("#btnSubmit").click(function(){
        alert("button");
    }); 
});

searchPosFunc()
function searchPosFunc() {
    var searchUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${seachParam}&limit=1&appid=${APIkey}`
    fetch(searchUrl)
    .then(response => response.json())
    .then(data => searchWeatherFunc(data));
}

function searchWeatherFunc(dataObj) {
    console.log(dataObj)
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
}