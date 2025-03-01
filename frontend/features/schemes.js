document.addEventListener("DOMContentLoaded", function () {
    // ✅ भाषा चयन और सेव करने की स्क्रिप्ट
    const languageSelect = document.getElementById("language");
    
    if (languageSelect) {
        const savedLang = localStorage.getItem("language") || "hindi";
        languageSelect.value = savedLang;
        changeLanguage(savedLang);

        languageSelect.addEventListener("change", function () {
            const selectedLang = languageSelect.value;
            localStorage.setItem("language", selectedLang);
            changeLanguage(selectedLang);
        });
    }

    

    // ✅ DOM Elements
    const schemesContainer = document.getElementById("schemesContainer");
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    if (schemesContainer && searchInput && searchBtn) {
        function displaySchemes(filteredSchemes) {
            schemesContainer.innerHTML = ""; // पहले साफ़ करें
            filteredSchemes.forEach(scheme => {
                let schemeElement = document.createElement("div");
                schemeElement.classList.add("scheme");
                schemeElement.innerHTML = `<h3>${scheme.name}</h3><p>${scheme.details}</p>`;
                schemesContainer.appendChild(schemeElement);
            });
        }

        searchBtn.addEventListener("click", function () {
            let searchValue = searchInput.value.toLowerCase();
            let filteredSchemes = schemes.filter(scheme =>
                scheme.name.toLowerCase().includes(searchValue)
            );
            displaySchemes(filteredSchemes);
        });

        displaySchemes(schemes); // Load all schemes initially
    }
});
