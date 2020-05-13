
var city = 'Seattle'

$('#searchBtn').on('click',function(){
  alert('testing')

 
})


var weatherApiKey = '7bb104f282f38f6d6a105af6428f8f9f'
var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +
'&appid=' + weatherApiKey



var weatherType = ''
var eventsApiKey = ''
var eventsQueryURL = 'https://api.predicthq.com/v1/places/?q='+ city
   
    

    
    function fetchDataWeather(){
    
        $.ajax({
            url: weatherQueryURL,
            method: "GET"
          })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
      
         
              displayWeather(response);
              fetchDataID();
              weatherFilter(response);
             

        });
    }

    fetchDataWeather();

    function displayWeather(response){
      
    
      var tempF = Math.round((response.main.temp -273.15) * 1.8 +32);


    $('#city-name').text(response.name);
    $('#temp').text( tempF + '°F');
    $('#precip').text(response.weather[0].description);
    $('#humid').text(response.main.humidity);
    $('#wind').text(response.wind.speed)

    }

  
        
        
    
        
     function fetchDataID(){
    
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
                  //console.log(eventsQueryURL);
          
                  // Log the resulting object
                //  console.log(response.results[0].id);


                
                  var cityID = response.results[0].id; 
                 // console.log(cityID)

              

                  fetchDataEvents(response);
                                    
    
            });
        }

      function fetchDataEvents(response){

       

     

         console.log('fetch data events' + response.results[0].id);
         var cityID = response.results[0].id

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
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response) {
            console.log(response);

            console.log(response.results[0].labels);

      
                       
            
            //var eventsQueryURL2 = 'https://api.predicthq.com/v1/events/?place.scope=' + cityID;
            //  function ajaxCall2
                              

      });
  }

  function weatherFilter(response){

    console.log('Weather Filter');
    var weatherCondition = response.weather[0].main;
    console.log(weatherCondition)
    


     if ( weatherCondition === 'Rain'){

      console.log('True');

      

    } 

    else{  
      console.log('False')
    }

  }







    

          
      
        

        // vSCi2VPEx4e_Ti-4yMMsxZ8bFF5I8vkSuk0IY5AtrlraTxnzMb4z-w
    