document.addEventListener('DOMContentLoaded', () => {
    // Parse query parameters to get latitude and longitude
    const urlParams = new URLSearchParams(window.location.search);
    const latitude = urlParams.get('lat');
    const longitude = urlParams.get('long');
    const timezone = urlParams.get('timezone');

    const latDiv=document.getElementById("lat");
    latDiv.innerText=`Lat:${latitude}`;
    const longDiv=document.getElementById("long");
    longDiv.innerText=`Long:${longitude}`;
    
    // Display map
    displayMap(latitude, longitude);
    fetchWeatherDetails(latitude, longitude);

});

function displayMap(latitude, longitude) {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = `<iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed" width="100%" height="783" frameborder="0" style="border:0"></iframe>
    `;
}

function fetchWeatherDetails(latitude, longitude) {
    const apiKey = '2bdebea2d5e9398777874698272e6a85';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    // Make a request to the OpenWeatherMap API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display weather details in the console
            console.log('Weather Details:', data);

            // Display weather details on the page
           const location=document.getElementById("location");
           location.innerText=` Location: ${data.name}`;
           const speed=document.getElementById("speed");
           speed.innerText=` Wind Speed: ${data.wind.speed}`;
           const humidity=document.getElementById("humidity");
           humidity.innerText=` Humidity: ${data.main.humidity}`;
           const pressure=document.getElementById("pressure");
           pressure.innerText=` Pressure: ${data.main.pressure}`;
           const direction=document.getElementById("direction");
           direction.innerText=` Wind Direction: ${calculateWindDirection(data.wind.deg)}`;
           const time=document.getElementById("timezone");
           time.innerText=`Time Zone: ${data.timezone}`;
           const uv=document.getElementById("uv");
           uv.innerText=` UV Index: ${data.visibility}`;
           const feels=document.getElementById("feels");
           feels.innerText=` Feels Like: ${data.main.feels_like}º`;
        })
        .catch(error => {
            console.error('Error fetching weather details:', error);
        });
}


function calculateWindDirection(degree) {
    // Define compass directions and their degree ranges
    const directions = [
        "North", "NNorth East", "North East", "ENorth East",
        "East", "ESouth East", "South East", "SSouth East",
        "South", "SSouth West", "South West", "WSouth West",
        "West", "WNorth West", "North West", "NNoth West"
    ];

    // Calculate the index in the directions array based on the degree
    const index = Math.round(degree / 22.5) % 16;

    // Return the corresponding direction
    return directions[index];
}


