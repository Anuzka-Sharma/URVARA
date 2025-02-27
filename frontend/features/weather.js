document.getElementById("getWeatherBtn").addEventListener("click", function() {
    const languageSelect = document.getElementById("language");

    // ✅ पहले से सेव भाषा अप्लाई करें
    const savedLang = localStorage.getItem("language") || "hindi";
    languageSelect.value = savedLang;
    changeLanguage(savedLang);

    // ✅ जब हेडर में भाषा बदले, तो सेव करें
    languageSelect.addEventListener("change", function() {
        const selectedLang = languageSelect.value;
        localStorage.setItem("language", selectedLang);
        changeLanguage(selectedLang);
    });
});


    let city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    // Fetch weather data from OpenWeather API
    let apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById("weatherResult").innerHTML = `
                    🌤️ Weather in <b>${data.name}</b>: ${data.weather[0].description} <br>
                    🌡️ Temperature: <b>${data.main.temp}°C</b> <br>
                    💨 Wind Speed: <b>${data.wind.speed} m/s</b>
                `;
            } else {
                document.getElementById("weatherResult").innerHTML = "City not found! ❌";
            }
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML = "Error fetching data! ⚠️";
        });
