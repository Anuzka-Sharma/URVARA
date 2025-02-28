document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("language");

    if (languageSelect) {
        // पहले से सेलेक्ट की गई भाषा सेट करें
        const savedLang = localStorage.getItem("language") || "hindi";
        languageSelect.value = savedLang;
        changeLanguage(savedLang);

        // जब भाषा बदली जाए
        languageSelect.addEventListener("change", function () {
            const selectedLang = languageSelect.value;
            localStorage.setItem("language", selectedLang); // लोकल स्टोरेज में सेव करें
            changeLanguage(selectedLang);
        });
    }

    document.getElementById("login-btn").addEventListener("click", loginUser);
});




async function loginUser() {
    const mobile = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!mobile || !password) {
        alert("❌ कृपया सभी फ़ील्ड भरें!");
        return;
    }

    const userData = { mobile, password };

    console.log("📤 Sending login request:", userData);

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log("✅ Server Response:", result);

        if (response.ok) {
            alert("🎉 लॉगिन सफल!");
            localStorage.setItem("token", result.token); // Token Store
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert("❌ लॉगिन विफल: " + result.error);
        }
    } catch (error) {
        console.error("❌ Fetch error:", error);
        alert("❌ सर्वर से कनेक्ट नहीं हो सका!");
    }
}
