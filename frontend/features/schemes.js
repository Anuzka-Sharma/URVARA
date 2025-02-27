document.addEventListener("DOMContentLoaded", function() {
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
    const schemes = [
        { name: "PM Kisan Samman Nidhi", details: "₹6000 annual income support for farmers." },
        { name: "Soil Health Card Scheme", details: "Provides soil health reports for better farming." },
        { name: "Kisan Credit Card", details: "Offers easy loans for agricultural expenses." },
        { name: "PM Fasal Bima Yojana", details: "Crop insurance against natural disasters." }
    ];

    const schemesContainer = document.getElementById("schemesContainer");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function displaySchemes(filteredSchemes) {
        schemesContainer.innerHTML = "";
        filteredSchemes.forEach(scheme => {
            let schemeElement = `<div class="scheme">
                <h3>${scheme.name}</h3>
                <p>${scheme.details}</p>
            </div>`;
            schemesContainer.innerHTML += schemeElement;
        });
    }

    searchBtn.addEventListener("click", function() {
        let searchValue = searchInput.value.toLowerCase();
        let filteredSchemes = schemes.filter(scheme => 
            scheme.name.toLowerCase().includes(searchValue)
        );
        displaySchemes(filteredSchemes);
    });

    displaySchemes(schemes); // Load all schemes initially
