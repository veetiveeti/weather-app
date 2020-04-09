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
*/

window.addEventListener("load", ()=> {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position); /*log current position*/
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/` /*used as a proxy to prevent cross-origin error*/
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={c6d3b1d2efe6a958b08601d6f711ba70}`;

            fetch(api)
             .then(response => {
                 return response.json();
             })
             .then(data => {
                 console.log(data);
             });
        });
    }

});