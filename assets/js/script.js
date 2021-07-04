var cityEl = document.getElementById('city-input');
var searchButton = document.getElementById('search-button');
var weatherContainer = document.getElementById('current-weather-container');
var  cityValueEl = document.getElementById('search-city');
var forecastTitleEL = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fived-container");
var pastSearchButtonEl = document.querySelector("#past-search");
var cities= [];

const API_KEY='4013d5a598e37410ac68e0a46250aead';

  // fetch request gets  weather
  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast";



  searchButton.addEventListener('click',showWeather);

  function showWeather(event){
      event.preventDefault();
      var city=cityEl.value.trim();

      if(city){
        getWeather(city);
        get5dWeather(city);
        cities.unshift({city});
        cityEl.value ="";
        localStorage.setItem("cities", JSON.stringify(cities));
        pastSearch(city);
        
      }
      else{
        alert("Please enter a City");
      }
      

  }


  function getWeather(city) {
    var qurey= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
   // console.log(city, city.value,qurey);
    fetch(qurey)
    .then(function(response){
       return response.json();
    })
    .then (function(data){
        displayWeather(data,city)
    });

  }

  function get5dWeather(city){
    var query5d = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    fetch(query5d)
    .then(function(response){
        return response.json();
        //console.log(data,city);
        
    })
    .then (function(data){
      console.log(data,city);
        display5dWeather(data,city);
    });
  }

  function displayWeather(weather,city){

    weatherContainer.textContent ="";
    cityValueEl.textContent =city;
   // console.log(weather,city);

    var currDate = document.createElement("span");
    currDate.textContent =" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    cityValueEl.appendChild(currDate);
    
    console.log(`${weather.weather[0].icon}`);

    var icon =document.createElement("img");
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    cityValueEl.appendChild(icon);

    var temp =document.createElement("span");
    temp.textContent ="Temperature: " + weather.main.temp + "  °F";
    temp.classList="list-group-item"

    var humidity =document.createElement("span");
    humidity.textContent ="Humidity: " + weather.main.humidity + "  %";
    humidity.classList="list-group-item"

    var speed =document.createElement("span");
    speed.textContent ="Wind Speed: " + weather.wind.speed + " MPH";
    speed.classList="list-group-item"

    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(speed);

    var longitude =weather.coord.lon;
    var latitude = weather.coord.lat;
  
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${API_KEY}&lat=${latitude}&lon=${longitude}`
    fetch(apiURL)
    .then(function(response){
       return response.json();

       
    })
    .then(function(data){
      displayUvIndex(data)
    });
  
  
  }

  function displayUvIndex(uvData){
    var uv =document.createElement("div");
    uv.textContent=" UV Index: ";
    uv.classList ="list-group-item";

    value =document.createElement("span");
    value.textContent=uvData.value;

    if(uvData.value <=2){
      value.classList = "favorable"
    }else if(uvData.value >2 && uvData.value<=8){
      value.classList = "moderate "
    }
    else if(uvData.value >8){
      value.classList = "severe"
    }

    uv.appendChild(value);
    weatherContainer.appendChild(uv);
  }

  function display5dWeather(city){
    forecastContainerEl.textContent="";
    forecastTitleEL.textContent="5-Day Forecast:";

    var forecast=city.list;
   // console.log(forecast);
    // forecast.forEach(x => {
    //   console.log(x);
          
    //     });

      for(var i=5 ;i < forecast.length ; i=i+8) {

        var dailyForecast =forecast[i];

        var forecastEl = document.createElement("div");
        forecastEl.classList ="card bg-primary text-light m-2";

        var forcasteDate =document.createElement("h5");
        forcasteDate.textContent =moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forcasteDate.classList = "card-header text-center";
        forecastEl.appendChild(forcasteDate);


        var icon = document.createElement("img");
        icon.classList ="card-body text-center";
        icon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);


        forecastEl.appendChild(icon);

        var tempEl =document.createElement("span");
        tempEl.classList ="card-body text-center";
        tempEl.textContent =dailyForecast.main.temp + " °F";

        forecastEl.appendChild(tempEl);

        var humidityEl =document.createElement("span");
        humidityEl.classList ="card-body text-center";
        humidityEl.textContent =dailyForecast.main.humidity + " %";

        forecastEl.appendChild(humidityEl);

        forecastContainerEl.appendChild(forecastEl);
      }

  }

  pastSearchButtonEl.addEventListener("click", searchPastCity);


  function searchPastCity(event) {

    var pastCity =event.target.getAttribute("data-city");
    if(pastCity){
      getWeather(pastCity);
      get5dWeather(pastCity);
    }

  }

  function pastSearch(pastcity) {
     pastSearchEl =document.createElement("button");
     pastSearchEl.textContent =pastcity;
     pastSearchEl.classList ="d-flex w-100 btn-light border p-2";
     pastSearchEl.setAttribute("data-city",pastcity);
     pastSearchEl.setAttribute("type","submit");
     pastSearchButtonEl.prepend(pastSearchEl);
  }