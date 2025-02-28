document.addEventListener("DOMContentLoaded", function () {
    const langSelect = document.getElementById("signup-language");

    // ✅ Pehle se saved language load karo
    const savedLang = localStorage.getItem("language") || "hindi";
    langSelect.value = savedLang;
    applyLanguage(savedLang);

    // ✅ Jab language change ho, to usse save karo
    langSelect.addEventListener("change", function () {
        const selectedLang = this.value;
        localStorage.setItem("language", selectedLang);
        applyLanguage(selectedLang);
    });
});

// ✅ Language change karne wala function
function applyLanguage(lang) {
    const textContent = {
        hindi: {
            title: "साइन अप",
            desc: "कृपया नीचे अपना विवरण भरें",
            nameLabel: "पूरा नाम:",
            phoneLabel: "मोबाइल नंबर:",
            passwordLabel: "पासवर्ड:",
            langLabel: "🌏 भाषा चुनें:",
            signupBtn: "साइन अप करें",
            loginText: "पहले से खाता है? <a href='login.html'>लॉगिन करें</a>",
        },
        english: {
            title: "Sign Up",
            desc: "Please fill in your details below",
            nameLabel: "Full Name:",
            phoneLabel: "Mobile Number:",
            passwordLabel: "Password:",
            langLabel: "🌏 Select Language:",
            signupBtn: "Sign Up",
            loginText: "Already have an account? <a href='login.html'>Login</a>",
        }
    };

    document.getElementById("title").innerText = textContent[lang].title;
    document.getElementById("desc").innerText = textContent[lang].desc;
    document.getElementById("nameLabel").innerText = textContent[lang].nameLabel;
    document.getElementById("phoneLabel").innerText = textContent[lang].phoneLabel;
    document.getElementById("passwordLabel").innerText = textContent[lang].passwordLabel;
    document.getElementById("langLabel").innerText = textContent[lang].langLabel;
    document.getElementById("signup-btn").innerText = textContent[lang].signupBtn;
    document.getElementById("login-text").innerHTML = textContent[lang].loginText;
}
