document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const languageSelect = document.getElementById("language");

    // ✅ Load saved language
    const savedLang = localStorage.getItem("language") || "hindi";
    languageSelect.value = savedLang;
    applyLanguage(savedLang);

    // ✅ Language Change Event
    languageSelect.addEventListener("change", function () {
        const selectedLang = this.value;
        localStorage.setItem("language", selectedLang);
        applyLanguage(selectedLang);
    });

    // ✅ Signup Form Submit Event
    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!name || !phone || !password) {
            alert("❌ All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: name, mobile: phone, password }),
            });

            const responseData = await response.json();

            if (response.ok) {
                alert("✅ Signup successful!");
                window.location.href = "/auth/login"; // ✅ Redirect after success
            } else {
                alert(`❌ Signup failed: ${responseData.error || "Unknown error"}`);
            }
        } catch (error) {
            alert("❌ Network error. Please try again.");
            console.error("Network Error:", error);
        }
    });
});

// ✅ Language Change Function
function applyLanguage(lang) {
    const textContent = {
        hindi: {
            title: "साइन अप",
            desc: "कृपया नीचे अपना विवरण भरें",
            nameLabel: "पूरा नाम:",
            phoneLabel: "मोबाइल नंबर:",
            passwordLabel: "पासवर्ड:",
            signupBtn: "साइन अप करें",
            loginText: "पहले से खाता है? <a href='login.html'>लॉगिन करें</a>",
        },
        english: {
            title: "Sign Up",
            desc: "Please fill in your details below",
            nameLabel: "Full Name:",
            phoneLabel: "Mobile Number:",
            passwordLabel: "Password:",
            signupBtn: "Sign Up",
            loginText: "Already have an account? <a href='login.html'>Login</a>",
        },
    };

    document.getElementById("title").innerText = textContent[lang].title;
    document.getElementById("desc").innerText = textContent[lang].desc;
    document.getElementById("nameLabel").innerText = textContent[lang].nameLabel;
    document.getElementById("phoneLabel").innerText = textContent[lang].phoneLabel;
    document.getElementById("passwordLabel").innerText = textContent[lang].passwordLabel;
    document.getElementById("signup-btn").innerText = textContent[lang].signupBtn;
    document.getElementById("login-text").innerHTML = textContent[lang].loginText;
}


import { useState } from "react";
import { signup } from "../services/authService";

const Signup = () => {
    const [user, setUser] = useState({ username: "", mobile: "", password: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.username || !user.mobile || !user.password) {
            setError("❌ All fields are required!");
            return;
        }

        try {
            const res = await signup(user);
            setMessage("✅ Signup successful!");
            setError("");
            setTimeout(() => {
                window.location.href = "/auth/login"; // ✅ Redirect to login page
            }, 2000);
        } catch (error) {
            setMessage("");
            setError(`❌ Signup failed: ${error.error || "Unknown error"}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Full Name" onChange={handleChange} required />
                <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Signup;
