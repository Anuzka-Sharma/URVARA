import { useState } from "react";

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
            setError("❌ सभी फ़ील्ड भरना ज़रूरी है!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ साइनअप सफल! 🎉");
                setError(""); // ❌ Error clear karna

                // ✅ Redirect to next page (change 'webpage.html' to actual file)
                window.location.href = "http://127.0.0.1:5500/frontend/features/webpage.html";

            } else {
                setMessage("");
                setError(`❌ साइनअप विफल: ${data.message || "अज्ञात त्रुटि"}`); // 🔥 Template literal ka error fix
            }

        } catch (error) {
            setMessage("");
            setError("❌ नेटवर्क समस्या! कृपया पुनः प्रयास करें।");
        }
    };

    return (
        <div>
            <h2>साइन अप</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="पूरा नाम"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="मोबाइल नंबर"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="पासवर्ड"
                    onChange={handleChange}
                    required
                />
                <button type="submit">साइन अप करें</button>



            </form >

    { message && <p style={{ color: "green" }}>{message}</p>}
{ error && <p style={{ color: "red" }}>{error}</p> }
        </div >
    );
};

export default Signup;