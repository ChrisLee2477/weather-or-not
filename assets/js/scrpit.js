mainCard = document.querySelector("weather-now")
userInput = document.querySelector("input2")
dayOfTheWeather = document.querySelector("card-title")
searchBtn = document.querySelector(".btn")

test = 0
currentDay = dayjs();
key ="6e257ea288fad7df7b8b1121b561847e"


function getApi(event){
    event.preventDefault();
var userCity = document.getElementById("input2").value

var locationUrl ="https://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&limit=5&appid=" + key;

fetch(locationUrl)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        console.log(data)
        lat = data[0].lat
        lon = data[0].lon
        var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&limit=5&APPID=' + key;
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&limit=5&APPID=' + key;
fetch(forecastUrl)
   .then(function(response){
       return response.json();
   })
   .then(function(data2){
      console.log(data2)

       for (i=1; i <= 5; i++){

        var todayId = "#weather" + i
        var dateId = "#date" + i
        currentDay = currentDay.add(1,'day')
        var formatDay = currentDay.format('MM/DD/YYYY')

        createImg = document.createElement('img')
        createPEl2 = document.createElement('p')
        createPEl3 = document.createElement('p')
        createPEl4 = document.createElement('p')
        $(dateId).text(formatDay)



        createImg = data2.list[i].weather[0].icon
        createPEl2.textContent = "Temp High: " + data2.list[i].main.temp_max +"°F"
       
        createPEl3.textContent = "Wind: " + data2.list[i].wind.speed + "MPH"
        createPEl4.textContent = "Humidity: " + data2.list[i].main.humidity + "%"

        
        $(createImg).appendTo(todayId)
        $(createPEl2).appendTo(todayId)
        $(createPEl3).appendTo(todayId)
        $(createPEl4).appendTo(todayId)
        test = test + 1
    }

    currentDay = dayjs();
    });
     fetch(weatherUrl)
    .then(function(rep){
        return rep.json();
    })
    .then(function(data3){
        console.log(data3)
        $('#today-weather').text(data3.name + " (" + currentDay.format("MM/DD/YYYY") + ") ")
        $('#today-temp').text("Temp High: " + data3.main.temp + "°F")
        $('#today-wind').text("Wind: " + data3.wind.speed + "MPH")
        $('#today-humid').text("Humidity: " + data3.main.humidity +"%")
    })
    })
    
 }


searchBtn.addEventListener("click" , getApi);







