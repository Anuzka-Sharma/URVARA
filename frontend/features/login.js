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
});

function changeLanguage(lang) {
    if (lang === "english") {
        document.getElementById("title").textContent = "Login";
        document.getElementById("desc").textContent = "Log in to your account";
        document.getElementById("phoneLabel").textContent = "Mobile Number:";
        document.getElementById("phone").placeholder = "Enter your mobile number";
        document.getElementById("passwordLabel").textContent = "Password:";
        document.getElementById("password").placeholder = "Enter your password";
        document.getElementById("login-btn").textContent = "Login";
        document.getElementById("signup-text").innerHTML = "New user? <a href='signup.html'>Sign Up</a>";
    } else {
        document.getElementById("title").textContent = "लॉगिन";
        document.getElementById("desc").textContent = "अपना खाता लॉगिन करें";
        document.getElementById("phoneLabel").textContent = "मोबाइल नंबर:";
        document.getElementById("phone").placeholder = "अपना मोबाइल नंबर दर्ज करें";
        document.getElementById("passwordLabel").textContent = "पासवर्ड:";
        document.getElementById("password").placeholder = "पासवर्ड दर्ज करें";
        document.getElementById("login-btn").textContent = "लॉगिन करें";
        document.getElementById("signup-text").innerHTML = "नया खाता बनाना है? <a href='signup.html'>साइन अप करें</a>";
    }
}
