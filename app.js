/* 
1. Get longitude & latitude from location
2. addEventListener to get the location after page loads 
3. Use navigator.geolocation to get current position of the user
4. If user allows app to use their location, get the
   longitude and latitude of their current location
5. Fetch the longitude and latitude data from API
6. Then, run the information only after API data has been
   fully fetched from the API server
7. Convert that fetched data by returning it as response.json
8. App uses that JSON
9. If there is a cross-origin error, it is because of trying to
   Access the API locally. Use cors-anywhere.herokuapp.com as a proxy.
     If you get this message from OpenWeatherMap: "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.",
     it might be that your API key has not been activated yet. As per the error 401 information, this might be the issue and you
     might have to wait for a while for it to activate.
10. No error after API key activated, do not need proxy.
11. Service now fetches API data, console log works.
*/

window.addEventListener("load", ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationName = document.querySelector(".location-name");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position); /*log current position*/
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=c6d3b1d2efe6a958b08601d6f711ba70`;

            fetch(api)
             .then(response => {
                 return response.json();
             })
             .then(data => {
                 console.log(data); /* Logs data after it was fetched from API */
                 const {temp} = data.main; /* Within brackets can define what part of data.main you want*/
                 const {main} = data.weather[0]; /* Within brackets can define what part of data.weather (first array) you want */
                 const {location} = data.name;

                 console.log(temp); /* This prints temperature of the current location */
                 console.log(main); /* This prints summary of the weather (sunny, cloudy, rain etc) */
                 console.log(location);

                 //Set DOM elements from the API
                 temperatureDescription.textContent = main;
                 temperatureDegree.textContent = temp;
                 locationName.textContent = location;
             });
        });
    }

});