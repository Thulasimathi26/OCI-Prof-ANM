function fetchWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        document.getElementById("weather").innerText = "Please enter a city.";
        return;
    }

    const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&format=json`;

    fetch(geoApiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                document.getElementById("weather").innerText = "City not found.";
                return;
            }

            const lat = data.results[0].latitude;
            const lon = data.results[0].longitude;

            const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            return fetch(weatherApiUrl);
        })
        .then(response => response.json())
        .then(weatherData => {
            if (!weatherData || !weatherData.current_weather) {
                document.getElementById("weather").innerText = "Weather data not available.";
                return;
            }

            const temp = weatherData.current_weather.temperature;
            const windSpeed = weatherData.current_weather.windspeed;
            const condition = weatherData.current_weather.weathercode;

            document.getElementById("weather").innerText = `🌡 Temperature: ${temp}°C | 💨 Wind Speed: ${windSpeed} km/h`;
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            document.getElementById("weather").innerText = "Error fetching weather data.";
        });
}
