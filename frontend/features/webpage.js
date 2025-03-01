document.addEventListener("DOMContentLoaded", function () {
    // Explore Button Functionality
    document.querySelector(".explore-btn").addEventListener("click", function() {
        alert("Welcome to Urava! Explore farming updates now.");

        const languageSelect = document.getElementById("language");

        if (languageSelect) {  
            const savedLang = localStorage.getItem("language") || "hindi";
            languageSelect.value = savedLang;
            changeLanguage(savedLang);

            if (!languageSelect.dataset.listenerAdded) {
                languageSelect.addEventListener("change", function() {
                    const selectedLang = languageSelect.value;
                    localStorage.setItem("language", selectedLang);
                    changeLanguage(selectedLang);
                });
                languageSelect.dataset.listenerAdded = "true"; 
            }
        }
    });

    // ✅ Function to change language text
    function changeLanguage(lang) {
        const textMap = {
            english: {
                "home-link": "🏠 Home",
                "mandi-link": "💰 Mandi Prices",
                "weather-link": "🌦 Weather",
                "schemes-link": "🏛 Govt Schemes",
                "community-link": "👥 Community",
                "signup-link": "🔐 Sign Up"
            },
            hindi: {
                "home-link": "🏠 होम",
                "mandi-link": "💰 मंडी भाव",
                "weather-link": "🌦 मौसम",
                "schemes-link": "🏛 सरकारी योजनाएँ",
                "community-link": "👥 समुदाय",
                "signup-link": "🔐 साइन अप"
            }
        };

        const selectedTexts = textMap[lang] || textMap.hindi;
        Object.keys(selectedTexts).forEach(id => {
            let element = document.getElementById(id);
            if (element) {
                element.textContent = selectedTexts[id];
            }
        });
    }

    // ✅ Click Event for Feature Cards (Mandi Prices + Weather Alerts + Video Shorts)
    document.querySelectorAll(".feature-card").forEach(card => {
        let title = card.querySelector("h3").innerText.trim();  // Extract heading text
        console.log("Feature Card Found:", title); // Debugging

        if (title.includes("Real-Time Mandi Prices")) {
            card.style.cursor = "pointer";
            card.addEventListener("click", function () {
                console.log("Redirecting to Mandi Prices Page...");
                window.location.href = "http://127.0.0.1:5501/frontend/features/mandi.html";
            });
        }

        if (title.includes("Weather Alerts")) {
            card.style.cursor = "pointer";
            card.addEventListener("click", function () {
                console.log("Redirecting to Weather Page...");
                window.location.href = "http://127.0.0.1:5501/frontend/features/weather.html";
            });
        }

        if (title.includes("15-Second Video Shorts")) {
            card.style.cursor = "pointer";
            card.addEventListener("click", function () {
                console.log("Redirecting to Video Shorts Page...");
                window.location.href = "http://127.0.0.1:5501/frontend/features/community.html"; // ✅ Change the correct file name if needed
            });
        }
        if (title.includes("Government Schemes")) {
            card.style.cursor = "pointer";
            card.addEventListener("click", function () {
                console.log("Redirecting to Government Schemes Page...");
                window.location.href = "http://127.0.0.1:5501/frontend/features/schemes.html";  // ✅ Govt Schemes Page
            });
        }

    });
});
