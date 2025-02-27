document.getElementById("exploreBtn").addEventListener("click", function() {
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

function changeLanguage(lang) {
    if (lang === "english") {
        document.getElementById("home-link").textContent = "🏠 Home";
        document.getElementById("mandi-link").textContent = "💰 Mandi Prices";
        document.getElementById("weather-link").textContent = "🌦 Weather";
        document.getElementById("schemes-link").textContent = "🏛 Govt Schemes";
        document.getElementById("community-link").textContent = "👥 Community";
        document.getElementById("signup-link").textContent = "🔐 Sign Up";
    } else {
        document.getElementById("home-link").textContent = "🏠 होम";
        document.getElementById("mandi-link").textContent = "💰 मंडी भाव";
        document.getElementById("weather-link").textContent = "🌦 मौसम";
        document.getElementById("schemes-link").textContent = "🏛 सरकारी योजनाएँ";
        document.getElementById("community-link").textContent = "👥 समुदाय";
        document.getElementById("signup-link").textContent = "🔐 साइन अप";
    }
}
    alert("Welcome to Urava! Explore farming updates now.");
