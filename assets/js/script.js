var cityEl = document.getElementById('city-input');
var searchButton = document.getElementById('search-button');
var weatherContainer = document.getElementById('current-weather-container');
var  cityInputEl = document.getElementById('searched-city');


const API_KEY='4013d5a598e37410ac68e0a46250aead';

  // fetch request gets  weather
  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast";



  searchButton.addEventListener('click',showWeather);

  function showWeather(event){
      event.preventDefault();
      var city=cityEl.vlaue.trim();

      if(city){
        getWeather(city);
        get5dWeather(city);
        
      }

  }


  function getWeather(city) {
    var qurey= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
   // console.log(city, city.value,qurey);
    fetch(qurey)
    .then(function(response){
        response.json();
    })
    .then (function(data){
        displayWeather(data,city)
    });

  }

  function get5dWeather(city){
    var query5d = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    fetch(query5d)
    .then(function(response){
        response.json();
    })
    .then (function(data){
        display5dWeather(data,city)
    });
  }

  function displayWeather(data,city){

    weatherContainer.textContent ="";
    cityInputEl.textContent =city;

    var currDate = document.createElement("span");
    currDate.textContent =" (" + moment(data.dt.value).format("MMM D, YYYY") + ") ";
    cityInputEl.appendChild(currDate);

    var icon =document.createElement("img");
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.data[0].icon}@2x.png`);
    cityInputEl.appendChild(icon);

    var temp =document.createElement("span");
    temp.textContent ="Temperature: " + data.main.temp + "  °F";
    temp.classList="list-group-item"

    var humidity =document.createElement("span");
    humidity.textContent ="Humidity: " + data.main.humidity + "  %";
    humidity.classList="list-group-item"

    var speed =document.createElement("span");
    speed.textContent ="Wind Speed: " + data.main.speed + " MPH";
    speed.classList="list-group-item"

    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(speed);

    var longitude =data.coord.lon;
    var latitude = data.coord.lat;
  
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${API_KEY}&lat=${latitude}&lon=${longitude}`
    fetch(apiURL)
    .then(function(response){
        response.json();

       
    })
    .then(function(data){
      displayUvIndex(data)
    });
  
  
  }

  function displayUvIndex(data){
    var uv =document.createElement("div");
    uv.textContent=" UV Index: ";
    uv.classList ="list-group-item";

    value =document.createElement("span");
    value.textContent=data.value;

    if(data.value <=2){
      value.classList = "favorable"
    }else if(data.value >2 && data.value<=8){
      value.classList = "moderate "
    }
    else if(data.value >8){
      value.classList = "severe"
    }

    uv.appendChild(value);
    weatherContainer.appendChild(uv);
  }

  function display5dWeather(data,city){

  }