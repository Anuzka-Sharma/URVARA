document.getElementById("exploreBtn").addEventListener("click", function() {
    alert("Welcome to Urava! Explore farming updates now.");

    const languageSelect = document.getElementById("language");

    // ✅ पहले से सेव भाषा अप्लाई करें
    if (languageSelect) {  // ✅ Ensure element exists before using
        const savedLang = localStorage.getItem("language") || "hindi";
        languageSelect.value = savedLang;
        changeLanguage(savedLang);

        // ✅ जब हेडर में भाषा बदले, तो केवल एक बार event listener add करें
        if (!languageSelect.dataset.listenerAdded) {
            languageSelect.addEventListener("change", function() {
                const selectedLang = languageSelect.value;
                localStorage.setItem("language", selectedLang);
                changeLanguage(selectedLang);
            });
            languageSelect.dataset.listenerAdded = "true"; // ✅ Prevent multiple event listeners
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

    const selectedTexts = textMap[lang] || textMap.hindi; // ✅ Default to Hindi if invalid lang
    Object.keys(selectedTexts).forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            element.textContent = selectedTexts[id];
        }
    });
}
