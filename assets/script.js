var userSearches = ['Seattle']
console.log(userSearches[0]);

$('#searchBtn').on('click',function(){
  
  var userSearch = $('#search-input').val();
  userSearches.push(userSearch);
  localStorage.setItem(1, userSearch);
  var weatherApiKey = '7bb104f282f38f6d6a105af6428f8f9f';
  var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userSearch + '&appid=' + weatherApiKey;
  localStorage.setItem(2, weatherQueryURL);
  var firstEventURL = 'https://api.predicthq.com/v1/events/?q=' + userSearch;
  localStorage.setItem(3, firstEventURL);
  
  
  fetchDataWeather(weatherQueryURL);

});



var weatherType = '';


//https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=HP4F5ZAXIXSD6AW7AMEC&redirect_uri=YOUR_REDIRECT_URI



/* function getData ( {
    // from local storage
    
    })
    
    
    
    function renderDataWeather(){
    
    
    })
     */
        

    
// !Changed the function to accept and argument eqaul to 
// !the url for the ajax call inside of the function
function fetchDataWeather(URL){
    
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function(response) {
    // We store all of the retrieved data inside of an object called "response"
    
    // Log the resulting object
    console.log(response);

    displayWeather(response);
    fetchDataEvents()

  });
}

  

function displayWeather(response){
      
  // !Converting the response's value for temperature into Fehrinheit 
  // !and the value for wind speed into Miles per Hour
  var tempInFehrinheit = parseInt((response.main.temp - 273.5) * 9/5 + 32);
  var windSpeedMph = parseInt(response.wind.speed * 2.237);
  
  $('#city-name').text(response.name);
  $('#temp').text(tempInFehrinheit + '°F');
  $('#precip').text(response.weather[0].description);
  $('#humid').text(response.main.humidity);
  $('#wind').text(windSpeedMph + ' Mph');

}

var availableEvents = [];
        
// !Also gave this function the same argument as the weather api function 
function fetchDataEvents(someEventUrl){
    
  $.ajax({
    url: someEventUrl,
    method: "GET",
    headers: {
      Authorization: 'Bearer MWawfGb5SJteul4Khvx6yGQUzdrgvoQ9lNdd-LG-'
    }
  }).then(function(response) {
    
    // We store all of the retrieved data inside of an object called "response"
    console.log(response);
    // Log the resulting object
    
    var event1Id = response.results[0].id; 
    console.log(event1Id);

    //var eventsQueryURL2 = 'https://api.predicthq.com/v1/events/?place.scope=' + cityID;
    //  function ajaxCall2

    var eventsArray = response.results;
    checkEventsDate(eventsArray);

    function checkEventsDate(array){
      for(var i = 0; i < array.length; i++){
        var workingArray = array[i];
        if(moment(workingArray.start).isSame(moment(), 'day') == true){
          availableEvents.push(workingArray);
        }
      };
    };

  });
}
        
// vSCi2VPEx4e_Ti-4yMMsxZ8bFF5I8vkSuk0IY5AtrlraTxnzMb4z-w
    


