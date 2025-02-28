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


import { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
    const [user, setUser] = useState({ mobile: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(user);
            setMessage("Login successful! Token: " + res.token);
            localStorage.setItem("token", res.token);  // Token store karna
        } catch (error) {
            setMessage(error.error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
