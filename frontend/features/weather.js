function getWeather() {
    const location = document.getElementById("locationInput").value;
    if (location === "") {
        alert("Please enter a location!");
        return;
    }

    // Example: Static Weather Data (Replace with API call)
    const weatherData = {
        temperature: "32°",
        condition: "Sunny ☀️",
        date: "Monday 27, July '20",
        humidity: "66%",
        cloudCover: "45%",
        visibility: "5 km"
    };

    // Update UI
    document.querySelector(".weather-card h2").innerText = weatherData.temperature;
    document.querySelector(".weather-card p:nth-child(2)").innerText = weatherData.condition;
    document.querySelector(".weather-card p:nth-child(3)").innerText = weatherData.date;
    document.querySelector(".weather-card p:nth-child(5)").innerText = `Humidity: ${weatherData.humidity}`;
    document.querySelector(".weather-card p:nth-child(6)").innerText = `Cloud Cover: ${weatherData.cloudCover}`;
    document.querySelector(".weather-card p:nth-child(7)").innerText = `Visibility: ${weatherData.visibility}`;
}
