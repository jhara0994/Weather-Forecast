//set variables
var apiKey = "dbe8f36d7d126101002f4b2e1fce3a52";
var cityInput = $("#city-input");
var searchBtn = $("#search-btn");
var cities = [];
var cityFormEl = $("#city-search-form")
var currentWeather = $("#current-weather")
var citySearch = $("#search-city")

// variable and function to save search data
var storeSearch = function() {
    console.log(cities)
    // may need to add a stringify to JSON part here.
    localStorage.setItem("cities")
}

// function to get current weather data by city
var getCurrent = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}"

    fetch(apiUrl)
    .then (function(response) {
        return response.json()
    .then (function(data) {
        console.log(data)
        displayWeather(data, city);
    })
    })
}    

// function to display the weather for the searched city. 
var displayWeather = function (weather, searchCity) {
    currentWeather.textContent="";
    cityInput.textContent=searchCity;

    console.log(weather);

    var date = document.createElement("span")
    date.textContent = moment().format("M/D/YYYY")
    cityInput.append(date);
}

// need a results container (empty div) in HTML for current data
// need a results container for future data

// need function to pull API data. Tied in with onclick.
// need function to show current data fom city search
// Justin's code - scratching Justin's code for now - check slack if needed

searchBtn.onclick = getCurrent() 


// need a function to show future data. May be able to tie in with function above. 
// add city to the search history

// Current data should display the City Name, date, icon representation of weather, temp, humidity, wind speed and UV Index. 

// UV Index should have a color that indicates whether conditions are favorable, moderate, or severe. 

// Future data display: 5-day forecast; date, icon of weather conditions, temp, wind speed, and humidity.

// Once city is saved in search bar, make sure it is selectable for quick viewing. 

function citySearch() {
  $("#weather-choice").css("display", "block");
  var cityinput = $("#search-city").val();
  console.log(cityinput);
  var value = $(this).data("name");
  var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + value + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response2) {
    console.log(response2);

    // Parameter Results go here.
    // Get values for search city section and append them to the display
    var selectCity = response2.list[0].name;
    var selectIcon = "https://openweathermap.org/img/w/" + response2.list[0].weather[0].icon + ".png";
    var selectTemp = response2.list[0].main.temp;
    var selectHumid = response2.list[0].main.humidity;
    var selectWind = response2.list[0].wind.speed;
    $("#select-area").text(selectCity);
    $("#select-icon").attr("src", selectIcon);
    $("#select-temp").text(selectTemp);
    $("#select-humid").text(selectHumid);
    $("#select-wind").text(selectWind);

   // Get values for search city 5 day forecast sections
   // Block 1
   var cityFiveDateOne = response2.list[1].dt_txt;
   var cityFiveIconOne = "https://openweathermap.org/img/w/" + response2.list[0].weather[0].icon + ".png";
   var cityFiveTempOne = response2.list[0].main.temp;
   var cityFiveHumidOne = response2.list[0].main.humidity;
   $("#city-five-icon-one").attr("src", cityFiveIconOne);
   $("#city-five-temp-one").text(cityFiveTempOne); 
   $("#city-five-humid-one").text(cityFiveHumidOne);

   // Block 2
   var cityFiveIconTwo = "https://openweathermap.org/img/w/" + response2.list[1].weather[0].icon + ".png";
   var cityFiveTempTwo = response2.list[1].main.temp;
   var cityFiveHumidTwo = response2.list[1].main.humidity;
   $("#city-five-icon-two").attr("src", cityFiveIconTwo);
   $("#city-five-temp-two").text(cityFiveTempTwo); 
   $("#city-five-humid-two").text(cityFiveHumidTwo);

   // Block 3
   var cityFiveIconThree = "https://openweathermap.org/img/w/" + response2.list[2].weather[0].icon + ".png";
   var cityFiveTempThree = response2.list[2].main.temp;
   var cityFiveHumidThree = response2.list[2].main.humidity;
   $("#city-five-icon-three").attr("src", cityFiveIconThree);
   $("#city-five-temp-three").text(cityFiveTempThree); 
   $("#city-five-humid-three").text(cityFiveHumidThree);

   // Block 4
   var cityFiveIconFour = "https://openweathermap.org/img/w/" + response2.list[3].weather[0].icon + ".png";
   var cityFiveTempFour = response2.list[3].main.temp;
   var cityFiveHumidFour = response2.list[3].main.humidity;
   $("#city-five-icon-four").attr("src", cityFiveIconFour);
   $("#city-five-temp-four").text(cityFiveTempFour); 
   $("#city-five-humid-four").text(cityFiveHumidFour);

   // Block 5
   var cityFiveIconFive = "https://openweathermap.org/img/w/" + response2.list[4].weather[0].icon + ".png";
   var cityFiveTempFive = response2.list[4].main.temp;
   var cityFiveHumidFive = response2.list[4].main.humidity;
   $("#city-five-icon-five").attr("src", cityFiveIconFive);
   $("#city-five-temp-five").text(cityFiveTempFive); 
   $("#city-five-humid-five").text(cityFiveHumidFive);

  });

}

