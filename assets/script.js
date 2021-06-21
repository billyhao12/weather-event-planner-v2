var elementsArray = [];

$("#searchBtn").on("click", function () {

  var city = $("#search-input").val();

  fetchDataWeather(city);
});

function fetchDataWeather(city) {
  var weatherApiKey = "08380159329a3e38fda792a63e0fc216";

  var weatherQueryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    weatherApiKey;

  $.ajax({
      url: weatherQueryURL,
      method: "GET",
    })
    // We store all of the retrieved data inside of an object called "weatherObject"
    .then(function (weatherObject) {
      displayWeather(weatherObject);

      // Carrying the city string and the weatherObject to the next ajax call
      fetchDataID(city, weatherObject);
    });
}

function displayWeather(weatherObject) {
  var tempF = Math.round((weatherObject.main.temp - 273.15) * 1.8 + 32);

  $("#city-name").text(weatherObject.name);
  $("#temp").text(tempF + " °F");
  $("#precip").text(weatherObject.weather[0].description);
  $("#humid").text(weatherObject.main.humidity + "%");
  $("#wind").text(weatherObject.wind.speed + " mph");
}

function fetchDataID(city, weatherObject) {
  var eventsQueryURL = "https://api.predicthq.com/v1/places/?q=" + city;

  $.ajax({
      url: eventsQueryURL,
      method: "GET",
      headers: {
        Authorization: "Bearer s1tCgPCTeVnJSaoCrsYbjgRkRl7WUUKyufiJvFV5",
      },
    })

    .then(function (IDObject) {

      fetchDataEvents(IDObject, weatherObject);
    });
}

function fetchDataEvents(IDObject, weatherObject) {
  var cityID = IDObject.results[0].id;

  var queryParams = $.param({
    "place.scope": cityID,
  });

  var eventsURL = "https://api.predicthq.com/v1/events/?" + queryParams;

  $.ajax({
      url: eventsURL,
      method: "GET",
      headers: {
        Authorization: "Bearer gc-FQ9BvRomz-HE74skJsAHWxexltw1LFkHvFWEx",
      },
    })
    .then(function (eventsObject) {
      weatherFilter(eventsObject, weatherObject);
    });
}

function weatherFilter(eventsObject, weatherObject) {


  var weatherCondition = weatherObject.weather[0].main;

  var eventsArray = eventsObject.results

  if (weatherCondition === "Clouds" || weatherCondition === "Rain") {
    var items = ["performing-arts", "conference", "gaming", "movie", "esports", "club", "concert"];
  } else {
    var items = ["outdoor", "mlb", "horse-racing", "golf", "bicycle", "concert"];
  }


  function validateItem(item) {


    for (var i = 0; i < items.length; i++) {

      if (item.labels.indexOf(items[i]) > -1)
        return true;
    }

  }

  function displayItem(item, i) {

    $('#event-' + (i + 1)).text(item.title);

  }

  eventsArray.filter(validateItem).forEach(displayItem);

}