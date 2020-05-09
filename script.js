
var city = 'Seattle'
var weatherApiKey = '7bb104f282f38f6d6a105af6428f8f9f'
var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +
'&appid=' + weatherApiKey



var weatherType = ''
var eventsApiKey = ''
var eventsQueryURL = 'https://api.predicthq.com/v1/events'


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
      

        });
    }

    fetchDataWeather();

    function displayWeather(){

    }

  
        
        
    
        
 /*        function fetchDataEvents(){
    
            $.ajax({
                url: eventsQueryURL,
                method: "GET",
                
                headers: { 'x-my-custom-header': 'some value' }
              })
                // We store all of the retrieved data inside of an object called "response"
                .then(function(response) {
          
                  // Log the queryURL
                  console.log(eventsQueryURL);
          
                  // Log the resulting object
                  console.log(response);

                       
    
            });
        }
        fetchDataEvents() */
    