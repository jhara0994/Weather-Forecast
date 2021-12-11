//set variables
var apiKey = "dbe8f36d7d126101002f4b2e1fce3a52";
var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var cities = [];
var cityFormEl = document.getElementById("city-search-form")
var citySearch = document.querySelector("#search-city")
var currentWeather = document.querySelector(".current-weather")
var searchResults = document.getElementById("city-results")
var choiceContainerEl = document.querySelector(".city-choice-container")



var formSubmitHandler = function(event){
    var city = citySearch.value.trim()

    if(city) {
        getCurrent(city)
        citySearch.value = ""
    }
    else {
        alert("Please enter a City:")
    }

    storeSearch()
}

var storeSearch = function(){
    console.log(city)
    localStorage.setItem("city", JSON.stringify(cities));
};

var getCurrent = function(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            displayWeather(data, city)
        })
    })
}

var displayWeather = function(weather, searchCity) {
    choiceContainerEl.textContent = searchCity
}

searchBtn.onclick = getCurrent() 
searchBtn.onclick = formSubmitHandler()






/*formSubmitHandler = function(event) {
    event.preventDefault();
    var city = citySearch.value.trim()

    if(city){
        getCurrent(city);
    } else {
        alert("Please enter a valid city:")
    }

    storeSearch()

}


// variable and function to save search data
var storeSearch = function() {
    console.log(pastSearch)
    // may need to add a stringify to JSON part here.
    localStorage.setItem("citySearch", citySearch.value)
}

// function to get current weather data by city
var getCurrent = function(city) {
    citySearch.value = ""
    var city = citySearch.value
    var apiKey = "dbe8f36d7d126101002f4b2e1fce3a52"
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

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

    // function to append the date to the current weather display
    var date = document.createElement("span")
    date.textContent = moment().format("M/D/YYYY")
    cityInput.append(date);

    // function to append icon 
    var icon = document.createElement("span")
    icon.setAttribute("src", "https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png")
    cityInput.append(icon);

    // function to show temperature
    var temp = $("#current-temp")
    temp.textContent = weather.main.temp 

    // function to show humidity
    var humidity = $("#current-humid")
    humidity.textContent = weather.main.humidity 

    // function to show wind speed
    var windSpeed = $("#current-wind")
    windSpeed.textContent = weather.wind.speed

    // variables to pull UV Index
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat, lon)
}

// function to pull the UV Index
var getUvIndex = function (lat, lon) {
    var apiKey = "dbe8f36d7d126101002f4b2e1fce3a52"
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?appid=${apiKey}&lat=${lat}&lon=${lon}`

    fetch(apiUrl)
    .then(function(response) {
        return response.json()
        .then(function(data) {
            displayUvIndex(data)
            console.log(data)
        })
    })
}

// function to display UV Index
var displayUvIndex = function(index) {
    var uvIndex = $("current-UV")

    uvIndex.textContent = index.current.uvi

    // conditional statement to change icon 
    if (index.current.uvi <= 2) {
        uvIndex.classList = "uv-favorable"
    } else if (index.current.uvi > 2 && index.value <= 8) {
        uvIndex.classList = "uv-moderate"
    } else if (index.current.uvi >= 8) {
        uvIndex.classList = "uv-severe"
    }
}

searchBtn.onclick = getCurrent() 


// need a function to show future data. May be able to tie in with function above. 
// add city to the search history

// Current data should display the City Name, date, icon representation of weather, temp, humidity, wind speed and UV Index. 

// UV Index should have a color that indicates whether conditions are favorable, moderate, or severe. 

// Future data display: 5-day forecast; date, icon of weather conditions, temp, wind speed, and humidity.

// Once city is saved in search bar, make sure it is selectable for quick viewing. 
/*
function citySearch() {
  $("#weather-choice").css("display", "block");
  var cityInput = $("#search-city").val();
  console.log(cityInput);
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
*/