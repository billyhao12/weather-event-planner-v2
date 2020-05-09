
var city = 'Seattle'

$('#searchBtn').on('click',function(){

 
})


var weatherApiKey = '7bb104f282f38f6d6a105af6428f8f9f'
var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +
'&appid=' + weatherApiKey



var weatherType = ''
var eventsApiKey = ''
var eventsQueryURL = 'https://api.predicthq.com/v1/places/?q='+ city






//https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=HP4F5ZAXIXSD6AW7AMEC&redirect_uri=YOUR_REDIRECT_URI



console.log(weatherQueryURL)


/* function getData ( {
    // from local storage
    
    })
    
    
    
    function renderDataWeather(){
    
    
    })
     */
    
    

    
    function fetchDataWeather(){
    
        $.ajax({
            url: weatherQueryURL,
            method: "GET"
          })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
      
              // Log the queryURL
              console.log(weatherQueryURL);
      
              // Log the resulting object
              console.log(response);

              displayWeather(response);
              fetchDataEvents()

        });
    }

    fetchDataWeather();

    function displayWeather(response){
      
      console.log(response);

    $('#city-name').text(response.name);
    $('#temp').text('Temperature: ' + response.main.temp);
    $('#precip').text('Current conditions: ' + response.weather[0].description);
    $('#humid').text('Current humdity: ' + response.main.humidity);
    $('#wind').text( 'Wind Speed: ' + response.wind.speed)

    }

  
        
        
    
        
     function fetchDataEvents(){
    
            $.ajax({


              
                url: eventsQueryURL,
                method: "GET",
                headers: {
                  Authorization: 'Bearer DeAzZ4-slL-IUgkFYreNMEuGaO3s4v-qraw1Ewx8'
                }
              })
                // We store all of the retrieved data inside of an object called "response"
                .then(function(response) {
          
                  // Log the queryURL
                  console.log(eventsQueryURL);
          
                  // Log the resulting object
                //  console.log(response.results[0].id);

                  var cityID = response.results[0].id; 
                  console.log(cityID)




                  //var eventsQueryURL2 = 'https://api.predicthq.com/v1/events/?place.scope=' + cityID;
                  //  function ajaxCall2
                                    
    
            });
        }

          
      
        

        // vSCi2VPEx4e_Ti-4yMMsxZ8bFF5I8vkSuk0IY5AtrlraTxnzMb4z-w
    