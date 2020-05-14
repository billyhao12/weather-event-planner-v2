
//var city = 'Seattle'

$('#searchBtn').on('click',function(){
  //alert('testing')
  

  var city = $('#search-input').val();

  //console.log(city)
  
 fetchDataWeather(city);
 
})



   

    
    function fetchDataWeather(city){

     

      var weatherApiKey = '7bb104f282f38f6d6a105af6428f8f9f'

      var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +
        '&appid=' + weatherApiKey

        console.log(weatherQueryURL)
    
        $.ajax({
            url: weatherQueryURL,
            method: "GET"
          })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(weatherObject) {
      
         
              displayWeather(weatherObject);
            //  weatherFilter(response);
            
            //carrying through the city object through to the other ajax call
            fetchDataID(city,weatherObject)
             

        });
    }

 

    function displayWeather(weatherObject){
      
    
      var tempF = Math.round((weatherObject.main.temp -273.15) * 1.8 +32);


    $('#city-name').text(weatherObject.name);
    $('#temp').text( tempF + '°F');
    $('#precip').text(weatherObject.weather[0].description);
    $('#humid').text(weatherObject.main.humidity);
    $('#wind').text(weatherObject.wind.speed + ' mph')

    }

            
          
     function fetchDataID(city,weatherObject){
       
      console.log('city object carry throug' + weatherObject)
      console.log(weatherObject)
      var eventsQueryURL = 'https://api.predicthq.com/v1/places/?q='+ city
    
            $.ajax({


              
                url: eventsQueryURL,
                method: "GET",
                headers: {
                  Authorization: 'Bearer DeAzZ4-slL-IUgkFYreNMEuGaO3s4v-qraw1Ewx8'
                }
              })
                // We store all of the retrieved data inside of an object called "response"
                .then(function(IDObject) {
          
                  // Log the queryURL
                  //console.log(eventsQueryURL);
          
                  // Log the resulting object
                //  console.log(response.results[0].id);


                
                  var cityID = IDObject.results[0].id; 
                 // console.log(cityID)

              

                  fetchDataEvents(IDObject,weatherObject);
                                    
    
            });
        }

      function fetchDataEvents(IDObject, weatherObject){

          
         //console.log('fetch data events' + response.results[0].id);
         var cityID = IDObject.results[0].id

         var queryParams =$.param({
          'place.scope': cityID,
      });



      var eventsURL = 'https://api.predicthq.com/v1/events/?'+ queryParams;
      console.log(eventsURL)



        $.ajax({
            
          url: eventsURL,
          method: "GET",
          headers: {
            Authorization: 'Bearer DeAzZ4-slL-IUgkFYreNMEuGaO3s4v-qraw1Ewx8'
          }
        })
        
          .then(function(eventsObject) {

          console.log(eventsObject)  
          console.log(eventsObject.results[0].labels);
          weatherFilter(eventsObject, weatherObject)
                              
    

      });
  }

  
  function weatherFilter(eventsObject, weatherObject){

    console.log('weatherFilter')
    console.log(eventsObject);
    console.log(weatherObject)

    var weatherCondition = weatherObject.weather[0].main;
    console.log(weatherCondition)
    


     if ( weatherCondition === 'Rain'){

      console.log('True');

      

    } 

    else{  
      console.log('False')
    } 

  }
