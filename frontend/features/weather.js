document.addEventListener("DOMContentLoaded", function () {
    // ✅ Apply saved language on page load
    const savedLang = localStorage.getItem("language") || "english";
    document.getElementById("language").value = savedLang;
    changeLanguage(savedLang);

    // ✅ Change language when user selects a new one
    document.getElementById("language").addEventListener("change", function () {
        const selectedLang = this.value;
        localStorage.setItem("language", selectedLang);
        changeLanguage(selectedLang);
    });
});

// 🌍 Weather API Integration
document.getElementById("getWeatherBtn").addEventListener("click", function () {
    let city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    let apiKey = "7d219d7a843f1ef9da895e3c8c899e31"; // ❗ Replace with your OpenWeather API key
    let lang = localStorage.getItem("language") === "hindi" ? "hi" : "en"; // Set API language
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById("weatherResult").innerHTML = `
                    <p>🌤️ Weather in <b>${data.name}</b>: ${data.weather[0].description}</p>
                    <p>🌡️ Temperature: <b>${data.main.temp}°C</b></p>
                    <p>💨 Wind Speed: <b>${data.wind.speed} m/s</b></p>
                `;
            } else {
                document.getElementById("weatherResult").innerHTML = "❌ City not found!";
            }
        })
        .catch(error => {
            document.getElementById("weatherResult").innerHTML = "⚠️ Error fetching data!";
        });
});

// 🌐 Function to change text based on language
function changeLanguage(lang) {
    const translations = {
        hindi: {
            title: "मौसम अपडेट",
            desc: "बेहतर खेती के फैसलों के लिए रीयल-टाइम मौसम अपडेट प्राप्त करें",
            placeholder: "शहर का नाम दर्ज करें...",
            button: "मौसम प्राप्त करें",
            footer: "© 2025 उरावा। सर्वाधिकार सुरक्षित।"
        },
        english: {
            title: "Weather Updates",
            desc: "Get real-time weather alerts for better farming decisions",
            placeholder: "Enter city name...",
            button: "Get Weather",
            footer: "© 2025 Urava. All Rights Reserved."
        }
    };

    document.getElementById("title").textContent = translations[lang].title;
    document.getElementById("desc").textContent = translations[lang].desc;
    document.getElementById("cityInput").placeholder = translations[lang].placeholder;
    document.getElementById("getWeatherBtn").textContent = translations[lang].button;
    document.getElementById("footer-text").textContent = translations[lang].footer;
}
