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
*/

window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".card__temperature__description"
  );
  let temperatureDegree = document.querySelector(".card__temperature__degree");
  let feelsLike = document.querySelector(".card__temperature__feelslike");
  let locationName = document.querySelector(".card__location__name");
  let weatherImage = document.querySelector(".card__location__weather-icon");
  let celsius = "°C";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position); /*log current position*/
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=c6d3b1d2efe6a958b08601d6f711ba70&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data); /* Logs data after it was fetched from API */
          const { name } = data; /* Location name related to GPS coordinates of the user */
          const { temp } = data.main; /* Actual temperature in Celsius */
          const { main } = data.weather[0]; /* Description of weather: sunny, clouds, rain etc */
          const { feels_like } = data.main; /* Feels like x Celsius */
          const { icon } = data.weather[0]; /* Weather icon provided by OpenWeather */

          console.log(name);
          console.log(temp); /* This prints temperature of the current location */
          console.log(main); /* This prints summary of the weather (sunny, cloudy, rain etc) */
          console.log(feels_like);

          //Set DOM elements from the API
          locationName.textContent = name;
          temperatureDegree.textContent = Math.round(temp) + celsius;
          feelsLike.textContent =
            "Feels like " + Math.round(feels_like) + celsius;
          temperatureDescription.textContent = main;
          weatherImage.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; /* Modifies .card__weather-icon src */
          weatherImage.alt = "Image describing the current weather, and it is the following: " + main;
        });
    });
  }

  // Gets current time for card__location__time
  function displayCurrentTime() {
    let currentTime = new Date();
    let today = currentTime.getDate();
    let month = currentTime.getMonth();

    today = addZero(today);
    month = addZero(month);

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds);

    let locationTime = document.querySelector(".card__location__time");

    let timeString = ` ${today}.${month}. ${hours}:${minutes}:${seconds} `;

    //Set DOM element
    locationTime.textContent = timeString;

    let timer = setTimeout(displayCurrentTime, 500);
  }

  //Adds 0 before single digit date and time
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  displayCurrentTime();

});

