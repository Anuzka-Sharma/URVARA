document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("language");

    // भाषा बदलने पर कंटेंट अपडेट करें
    languageSelect.addEventListener("change", function() {
        if (languageSelect.value === "english") {
            document.getElementById("title").textContent = "Sign Up";
            document.getElementById("desc").textContent = "Please fill in your details below";
            document.getElementById("nameLabel").textContent = "Full Name:";
            document.getElementById("name").placeholder = "Enter your name";
            document.getElementById("phoneLabel").textContent = "Mobile Number:";
            document.getElementById("phone").placeholder = "Enter your mobile number";
            document.getElementById("passwordLabel").textContent = "Password:";
            document.getElementById("password").placeholder = "Choose a password";
            document.getElementById("signup-btn").textContent = "Sign Up";
            document.getElementById("login-text").innerHTML = "Already have an account? <a href='#'>Login</a>";
        } else {
            document.getElementById("title").textContent = "साइन अप";
            document.getElementById("desc").textContent = "कृपया नीचे अपना विवरण भरें";
            document.getElementById("nameLabel").textContent = "पूरा नाम:";
            document.getElementById("name").placeholder = "अपना नाम दर्ज करें";
            document.getElementById("phoneLabel").textContent = "मोबाइल नंबर:";
            document.getElementById("phone").placeholder = "अपना मोबाइल नंबर दर्ज करें";
            document.getElementById("passwordLabel").textContent = "पासवर्ड:";
            document.getElementById("password").placeholder = "पासवर्ड चुनें";
            document.getElementById("signup-btn").textContent = "साइन अप करें";
            document.getElementById("login-text").innerHTML = "पहले से खाता है? <a href='#'>लॉगिन करें</a>";
        }
    });
});
