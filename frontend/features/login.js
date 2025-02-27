document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("language");

    // पहले से सेलेक्ट की गई भाषा सेट करें
    const savedLang = localStorage.getItem("language") || "hindi";
    languageSelect.value = savedLang;
    changeLanguage(savedLang);

    // जब भाषा बदली जाए
    languageSelect.addEventListener("change", function() {
        const selectedLang = languageSelect.value;
        localStorage.setItem("language", selectedLang); // लोकल स्टोरेज में सेव करें
        changeLanguage(selectedLang);
    });
    window.location.href ='http://127.0.0.1:5500/webpage.html';
});


